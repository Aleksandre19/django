
/* Getting stripe puplic and client secret keys */
let stripe_puplic_key = $('#id_stripe_public_key').text().slice(1, -1);
let client_secret = $('#id_client_secret').text().slice(1, -1);

let stripe = Stripe(stripe_puplic_key);
let elements = stripe.elements();

var style = {
    base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        }
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#dc3545'
    }
};

let card = elements.create('card', { style : style });
card.mount('#card-element');