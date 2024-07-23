<script>
import axios from 'axios';

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
        };
    },
    methods: {
        validateForm() {
    this.errors = {};

    // Validazione dei campi del modulo...

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
        const cart = JSON.parse(cartString);

        // Verifica che 'totalPrice' sia presente in 'cart'
        if (!cart || !cart.totalPrice) {
            console.error('totalPrice non trovato nel carrello:', cart);
            return;
        }

        // Costruisci l'oggetto 'order' con 'total_price' da 'cart'
        const order = {
            name: this.firstName,
            lastname: this.lastName,
            phone_number: this.phone,
            email: this.email,
            address: this.address,
            total_price: cart.totalPrice,
        };

        // Stampa i valori dell'ordine per il debug
        console.log(cartString);
        console.log(order);

        // Esegui la chiamata API per inviare l'ordine
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
                dishes: cart  // Assumendo che 'items' sia ciò che vuoi inviare
            };

            console.log(params);

            // Esegui la chiamata API per inviare i dettagli del piatto
            axios.post('http://127.0.0.1:8000/api/dishorders', params, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error('Errore nella chiamata API dishorders:', error);
            });

        })
        .catch(error => {
            console.error('Errore nella chiamata API orders:', error);
        });
    }
},

        // Funzione per validare l'email
        validEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        // Funzione per validare il numero della carta di credito (senza spazi)
        validCardNumber(cardNumber) {
            const cleaned = cardNumber.replace(/\s+/g, ''); // Rimuove tutti gli spazi
            const re = /^\d{16}$/;
            return re.test(cleaned);
        },

        // Funzione per validare la data di scadenza della carta di credito (MM/AA)
        validExpirationDate(expirationDate) {
            const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
            return re.test(expirationDate);
        },
    },
};
</script>

<template>
    <div class="container ms_container">
        <h2 class="mb-5">Procedi al checkout</h2>
        <form @submit.prevent="validateForm">
            <!-- Dettagli Utente -->
            <div class="form-group">
                <h3>Dettagli Utente</h3>
            </div>
            <div class="form-row">

                <!-- Nome Utente -->
                <div class="form-group col-md-6">
                    <label for="firstName">Nome <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="firstName" v-model="firstName"
                        placeholder="Inserisci il nome" required>
                    <div v-if="errors.firstName" class="text-danger">{{ errors.firstName }}</div>
                </div>

                <!-- Cognome Utente -->
                <div class="form-group col-md-6">
                    <label for="lastName">Cognome <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="lastName" v-model="lastName"
                        placeholder="Inserisci il cognome" required>
                    <div v-if="errors.lastName" class="text-danger">{{ errors.lastName }}</div>
                </div>
            </div>

            <!-- Indirizzo Utente -->
            <div class="form-group">
                <label for="address">Indirizzo <span class="asterisco">*</span></label>
                <input type="text" class="form-control" id="address" v-model="address"
                    placeholder="Inserisci l'indirizzo" required>
                <div v-if="errors.address" class="text-danger">{{ errors.address }}</div>
            </div>

            <!-- Numero di Telefono Utente -->
            <div class="form-group">
                <label for="phone">Numero di Telefono <span class="asterisco">*</span></label>
                <input type="text" class="form-control" id="phone" v-model="phone"
                    placeholder="Inserisci il numero di telefono" required>
                <div v-if="errors.phone" class="text-danger">{{ errors.phone }}</div>
            </div>

            <!-- Email Utente -->
            <div class="form-group">
                <label for="email">Email <span class="asterisco">*</span></label>
                <input type="email" class="form-control" id="email" v-model="email" placeholder="Inserisci l'email"
                    required>
                <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
            </div>

            <!-- Dettagli Carta -->
            <div class="form-group">
                <h3>Dettagli della Carta</h3>
            </div>

            <!-- Numero Carta -->
            <div class="form-group">
                <label for="cardNumber">Numero della Carta <span class="asterisco">*</span></label>
                <input type="text" class="form-control" id="cardNumber" v-model="cardNumber"
                    placeholder="Inserisci il numero della carta" required>
                <div v-if="errors.cardNumber" class="text-danger">{{ errors.cardNumber }}</div>
            </div>

            <!-- Scadenza Carta -->
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="expirationDate">Scadenza <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="expirationDate" v-model="expirationDate"
                        placeholder="MM/AA" required>
                    <div v-if="errors.expirationDate" class="text-danger">{{ errors.expirationDate }}</div>
                </div>
            </div>

            <p class="mb-3">I campi contrassegnati con <span class="asterisco">*</span> sono obbligatori.</p>
            <button type="submit" class="btn btn-primary">Procedi al pagamento</button>
        </form>
    </div>
</template>

<style scoped lang="scss">
.ms_container {
    min-height: 80vh;
    margin-top: 150px;
    margin-bottom: 50px;
}

.asterisco {
    color: red;
}

.text-danger {
    font-size: 0.9rem;
}
</style>