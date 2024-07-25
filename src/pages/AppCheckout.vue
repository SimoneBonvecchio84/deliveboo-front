<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            email: '',
            cardNumber: '',
            expirationDate: '',
            order_id: 0,
            errors: {},
            paymentDetails: {
                card_number: '',
                card_expire_date: '',
                payment_method_nonce: 'fake-valid-nonce',
            },
            slug: "pippo",
            cartPrice: 0,
            cart: '',
            isSuccess: false,
            isLoading: false,
        };
    },
    created() {
        // Memorizza il valore della cronologia di navigazione
        this.$root.historyCount = window.history.length;
        this.cartPrice = JSON.parse(localStorage.getItem('cart'));
        console.log(this.cartPrice.totalPrice);
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },

        async getToken() {
            this.isLoading = true;
            try {
                // Prima chiamata per ottenere il token
                await axios.get('http://127.0.0.1:8000/api/generatetoken').then((resp) => {
                    console.log(resp);

                    const token = resp.data.result;
                    console.log(token);
                })

                // Seconda chiamata per effettuare il pagamento
                await axios.post('http://127.0.0.1:8000/api/makepayment',
                    { ...this.paymentDetails,
                        amount: this.cart.totalPrice //Nostro valore prezzo carrello
                    },
                    { headers: { 'Content-type': 'multipart/form-data' } }).
                    then(response => {
                        console.log(response.data.success);

                        this.saveOrder();
                    })
                    .catch(({ error, response }) => {

                        console.error(error);
                        console.log(response.data.errors);
                    })
            } catch (error) {
                console.error('Si è verificato un errore nelle chiamate axios.post():', error);
            }
        },

        saveOrder() {

            // Rimuove tutti gli spazi dai campi prima di salvare
            const cleanedFirstName = this.firstName.replace(/\s+/g, '');
            const cleanedLastName = this.lastName.replace(/\s+/g, '');
            const cleanedAddress = this.address.replace(/\s+/g, '');
            const cleanedPhone = this.phone.replace(/\s+/g, '');

            // Costruisce l'oggetto 'order' con 'total_price' da 'cart'
            const order = {
                name: cleanedFirstName,
                lastname: cleanedLastName,
                phone_number: cleanedPhone,
                email: this.email,
                address: cleanedAddress,
                total_price: this.cart.totalPrice,
            };

            // Stampa i valori dell'ordine per il debug
            console.log(order);

            // Esegue la chiamata API per inviare l'ordine
            axios.post('http://127.0.0.1:8000/api/orders', order, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data.result);
                    this.order_id = response.data.result;

                    // Invia i dettagli del carrello insieme all'ID dell'ordine
                    const params = {
                        order_id: this.order_id,
                        dishes: this.cart  // Assumendo che 'items' sia ciò che vuoi inviare
                    };

                    console.log(params);

                    // Esegue la chiamata API per inviare i dettagli del piatto
                    axios.post('http://127.0.0.1:8000/api/dishorders', params, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            console.log(response);
                            this.isLoading = false;
                            this.clearCart();
                        })
                        .catch(error => {
                            console.error('Errore nella chiamata API dishorders:', error);
                        });

                })
                .catch(error => {
                    console.error('Errore nella chiamata API orders:', error);
                });

        },

        validateForm() {
            this.errors = {};

            // Funzione per ottenere il numero di caratteri alfanumerici effettivi
            const getAlphanumericLength = (str) => {
                return str.replace(/\s+/g, '').length; // Rimuove tutti gli spazi e calcola la lunghezza
            };

            // Verifica che il campo nome non sia vuoto e abbia almeno 3 caratteri alfanumerici
            const firstNameAlphanumericLength = getAlphanumericLength(this.firstName);
            if (firstNameAlphanumericLength === 0) {
                this.errors.firstName = 'Il nome è obbligatorio.';
            } else if (firstNameAlphanumericLength < 3) {
                this.errors.firstName = 'Il nome deve contenere almeno 3 caratteri.';
            }

            // Verifica che il campo cognome non sia vuoto e abbia almeno 3 caratteri alfanumerici
            const lastNameAlphanumericLength = getAlphanumericLength(this.lastName);
            if (lastNameAlphanumericLength === 0) {
                this.errors.lastName = 'Il cognome è obbligatorio.';
            } else if (lastNameAlphanumericLength < 3) {
                this.errors.lastName = 'Il cognome deve contenere almeno 3 caratteri.';
            }

            // Verifica che il campo indirizzo non sia vuoto e abbia almeno 5 caratteri alfanumerici
            const addressAlphanumericLength = getAlphanumericLength(this.address);
            if (addressAlphanumericLength === 0) {
                this.errors.address = 'L\'indirizzo è obbligatorio.';
            } else if (addressAlphanumericLength < 5) {
                this.errors.address = 'L\'indirizzo deve contenere almeno 5 caratteri.';
            }

            // Verifica che il campo numero di telefono non sia vuoto e rispetti il formato
            if (!this.phone) {
                this.errors.phone = 'Il numero di telefono è obbligatorio.';
            } else {
                // Rimuove tutti gli spazi dal numero di telefono
                const cleanedPhone = this.phone.replace(/\s+/g, '');

                // Verifica che il numero di telefono contenga esattamente 10 cifre
                if (!/^\d{10}$/.test(cleanedPhone)) {
                    this.errors.phone = 'Il numero di telefono deve essere di 10 cifre.';
                }
            }

            // Verifica che il campo email non sia vuoto e rispetti il formato
            if (!this.email) {
                this.errors.email = 'L\'email è obbligatoria.';
            } else if (!this.validEmail(this.email)) {
                this.errors.email = 'L\'email non è valida.';
            }

            // Verifica che il campo numero della carta non sia vuoto e rispetti il formato
            if (!this.paymentDetails.card_number) {
                this.errors.card_number = 'Il numero della carta è obbligatorio.';
            } else if (!this.validCardNumber(this.paymentDetails.card_number)) {
                this.errors.card_number = 'Il numero della carta non è valido.';
            }

            // Verifica che il campo data di scadenza della carta non sia vuoto e rispetti il formato
            if (!this.paymentDetails.card_expire_date) {
                this.errors.card_expire_date = 'La data di scadenza è obbligatoria.';
            } else if (!this.validExpirationDate(this.paymentDetails.card_expire_date)) {
                this.errors.card_expire_date = 'La data di scadenza non è valida.';
            }

            // Se non ci sono errori, procedi con l'invio del form
            if (Object.keys(this.errors).length === 0) {
                // Recupera 'cart' dal localStorage
                const cartString = localStorage.getItem('cart');

                // Controlla se 'cart' è presente nel localStorage
                if (!cartString) {
                    console.error('Nessun carrello trovato nel localStorage');
                    return;
                }

                // Converti 'cart' da stringa a oggetto JavaScript
                this.cart = JSON.parse(cartString);

                // Verifica che 'totalPrice' sia presente in 'cart'
                if (!this.cart || !this.cart.totalPrice) {
                    console.error('totalPrice non trovato nel carrello:', this.cart);
                    return;
                }

                this.getToken();
            }
        },

        // Funzione per validare l'email
        validEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        // Funzione per validare il numero della carta di credito (accetta anche spazi e trattini)
        validCardNumber(cardNumber) {
            const cleaned = cardNumber.replace(/\s+/g, '').replace(/-/g, ''); // Rimuove tutti gli spazi e i trattini
            const re = /^\d{16}$/;
            return re.test(cleaned);
        },

        // Funzione per validare la data di scadenza della carta di credito (MM/AA)
        validExpirationDate(expirationDate) {
            // Verifica che il formato sia corretto (MM/AA)
            const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!re.test(expirationDate)) {
                return false;
            }

            // Estrai mese e anno dalla data di scadenza
            const [month, year] = expirationDate.split('/').map(Number);

            // Calcola l'anno completo (es. '23' diventa 2023)
            const fullYear = 2000 + year;

            // Ottieni il mese e l'anno attuali
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // I mesi in JavaScript sono indicizzati da 0
            const currentYear = now.getFullYear();

            // Verifica che la data di scadenza non sia passata
            if (fullYear < currentYear || (fullYear === currentYear && month < currentMonth)) {
                return false;
            }

            return true;
        },

        clearCart() {
            // Svuota tutti gli oggetti dal carrello
            this.cart.items = {};
            // Reimposta la quantità totale
            this.cart.totalQuantity = 0;
            // Reimposta il prezzo totale
            this.cart.totalPrice = 0;

            // Salva il carrello aggiornato in localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));
            localStorage.removeItem('restaurant_id');
            localStorage.removeItem('slug');
            console.log('Carrello svuotato.');
            this.isSuccess = true;
            window.scrollTo(0, 0);
            setTimeout(() => {
                this.$router.push('/');
            }, 5000); //
        },
    },
};
</script>

<template>
    <div v-if="isSuccess === false" class="container ms_container">
        <div class="d-flex justify-content-center align-items-center mb-5 gap-2">
            <span @click="goBack()" class="btn bg-primary rounded-circle">
                <i class="fa-solid fa-arrow-left text-white"></i>
            </span>
            <h2 class="text-center">Procedi al checkout</h2>
        </div>
        <form id="checkoutform">
            <!-- Dettagli Utente -->
            <div class="form-group">
                <h3>Dettagli Utente</h3>
            </div>
            <div class="form-row">
                <!-- Nome Utente -->
                <div class="form-group col-md-6">
                    <label for="firstName">Nome <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="firstName" v-model="firstName"
                        placeholder="Inserisci il nome" required minlength="3">
                    <div v-if="errors.firstName" class="text-danger">{{ errors.firstName }}</div>
                </div>
                <!-- Cognome Utente -->
                <div class="form-group col-md-6">
                    <label for="lastName">Cognome <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="lastName" v-model="lastName"
                        placeholder="Inserisci il cognome" required minlength="3">
                    <div v-if="errors.lastName" class="text-danger">{{ errors.lastName }}</div>
                </div>
            </div>
            <div class="form-row">
                <!-- Indirizzo Utente -->
                <div class="form-group col-md-6">
                    <label for="address">Indirizzo <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="address" v-model="address"
                        placeholder="Inserisci l'indirizzo" required minlength="5">
                    <div v-if="errors.address" class="text-danger">{{ errors.address }}</div>
                </div>
                <!-- Numero di Telefono Utente -->
                <div class="form-group col-md-6">
                    <label for="phone">Numero di Telefono <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="phone" v-model="phone"
                        placeholder="Inserisci il numero di telefono" required>
                    <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
                </div>
            </div>
            <!-- Email Utente -->
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="email">Email <span class="asterisco">*</span></label>
                    <input type="email" class="form-control" id="email" v-model="email" placeholder="Inserisci l'email"
                        required>
                    <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
                </div>
            </div>
            <!-- Dettagli Carta -->
            <div class="form-group">
                <h3>Dettagli della Carta</h3>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="card-number">Numero Carta <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="card-number" v-model="paymentDetails.card_number"
                        required>
                    <div v-if="errors.card_number" class="text-danger">{{ errors.card_number }}</div>
                </div>
                <div class="form-group col-md-6">
                    <label for="card-expire">Data scadenza <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="card-expire" v-model="paymentDetails.card_expire_date"
                        required>
                    <div v-if="errors.card_expire_date" class="text-danger">{{ errors.card_expire_date }}</div>
                </div>
            </div>
            <p class="mb-3">I campi contrassegnati con <span class="asterisco">*</span> sono obbligatori.</p>
            <div class="d-flex align-items-center gap-2">
                <button type="submit" class="btn btn-primary d-flex justify-content-center align-items-center gap-2"
                    @click.prevent="validateForm()">
                    <span>Procedi al pagamento</span>
                    <span :class="isLoading === true ? 'spinner-border' : ''"></span>
                </button>
                <span class="fw-bold ms-2">Totale Carrello: {{ cartPrice.totalPrice }} €</span>
            </div>
        </form>
    </div>
    <div v-else class="ms_container page_success">
        <div class="ms_message d-flex flex-column gap-4 justify-content-center align-items-center">
            <div class="d-flex flex-column justify-content-center align-items-center img-success mb-5">
                <img src="../assets/img/success.png" alt="">
                <routerLink :to="{ name: 'home' }">
                    <a class="btn btn-primary">Home</a>
                </routerLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../sass/colorpalette.scss" as *;

.ms_container {
    min-height: 80vh;
    margin-top: 150px;
    margin-bottom: 50px;
    width: 100%;
}

.page_success {
    width: 100%;
    background-color: $white;
    min-height: 100vh;
    margin: 0;
}

.ms_message {
    height: 100vh;
}

.img-success {
    margin-top: 100px;
    width: 40%;
}

@media (max-width: 1024px) {
    .img-success {
        width: 80%;
    }
}

.asterisco {
    color: $red;
}

.text-danger {
    font-size: 0.9rem;
}
</style>