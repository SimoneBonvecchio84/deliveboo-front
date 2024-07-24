<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
// import { json } from 'express';

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
            cartPrice: 0,
            cart:'',
            isSuccess: false,
            isLoading: false,
        };
    },
    created() {
        this.cartPrice = JSON.parse(localStorage.getItem('cart'));
        console.log(this.cartPrice.totalPrice);
    },
    methods: {
        async getToken() {
            this.isLoading = true;
            try {
                //FIRST CALL TO GET TOKEN
                await axios.get('http://127.0.0.1:8000/api/generatetoken').then((resp) => {
                    console.log(resp);

                    const token = resp.data.result;
                    console.log(token);
                })


                //SECOND CALL TO MAKE PAYMENT
                await axios.post('http://127.0.0.1:8000/api/makepayment',
                    { ...this.paymentDetails },
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
            // Costruisci l'oggetto 'order' con 'total_price' da 'cart'
            const order = {
                name: this.firstName,
                lastname: this.lastName,
                phone_number: this.phone,
                email: this.email,
                address: this.address,
                total_price: this.cart.totalPrice,
            };

            // Stampa i valori dell'ordine per il debug
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
                        dishes: this.cart  // Assumendo che 'items' sia ciò che vuoi inviare
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
                            this.isLoading=false;
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

        clearCart() {
            // Empty all items from the cart
            this.cart.items = {};
            // Reset the total quantity
            this.cart.totalQuantity = 0;
            // Reset the total price
            this.cart.totalPrice = 0;

            // Save the updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));
            localStorage.removeItem('restaurant_id');
            localStorage.removeItem('slug');
            console.log('Carrello svuotato.');
            this.isSuccess = true;
            setTimeout(() => {
                this.$router.push('/');
            }, 5000); //
            // clicco su pagamento form scompare compare una rotellina che gira nel button il tempo delle chiamate
        },
    },
};
</script>

<template>

    <div v-if="isSuccess === false" class="container ms_container">
        <h2 class="mb-5 text-center">Procedi al checkout</h2>
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

            
            <div class="form-row">
                <!-- Indirizzo Utente -->
                <div class="form-group col-md-6">
                    <label for="address">Indirizzo <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="address" v-model="address"
                    placeholder="Inserisci l'indirizzo" required>
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
                    <input type="text" class="form-control" id="card-number" v-model="paymentDetails.card_number" required>
                </div>
    
                <div class="form-group col-md-6">
                    <label for="card-expire">Data scadenza <span class="asterisco">*</span></label>
                    <input type="text" class="form-control" id="card-expire" v-model="paymentDetails.card_expire_date"
                        required>
                </div>
            </div>

            <p class="mb-3">I campi contrassegnati con <span class="asterisco">*</span> sono obbligatori.</p>
            <div class="d-flex align-items-center gap-2">
                <button type="submit" class="btn btn-primary d-flex justify-content-center align-items-center gap-2" @click.prevent="validateForm()">
                    <span>Procedi al pagamento</span>
                    <span :class="isLoading === true ? 'spinner-border' : ''"></span>
                </button>
                <span class="fw-bold ms-2">Totale Carrello: {{ cartPrice.totalPrice }} €</span>
            </div>
        </form>
    </div>
    <div v-else class="ms_container page_success" >
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

.page_success{
    width: 100%;
    background-color: $white;
    min-height: 100vh;
    margin: 0;
}

.ms_message{
    height: 100vh;
}

.img-success{
    margin-top: 100px;
    width: 40%;
}
@media (max-width: 1024px) {
    .img-success{
        width: 80%;
    }
}



.asterisco {
    color:$red;
}

.text-danger {
    font-size: 0.9rem;
}
</style>