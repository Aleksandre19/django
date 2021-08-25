
// Storing a stripe client secret ID
let client_secret = $('#id_client_secret').text().slice(1, -1);

// Storing a stripe public key
let stripe_puplic_key = $('#id_stripe_public_key').text().slice(1, -1);

// Get Customer's email address
let customer_email_address = $('#customer_email_address').text().slice(1, -1);

// Initiating a stripe
let stripe = Stripe(stripe_puplic_key);

// Creating a stripe element
let elements = stripe.elements();

// Styling stripe card's input
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
        color: '#dc3545',
        iconColor: '#dc3545'
    }
};

// Creating a stripe card
let card = elements.create('card', { style : style });

// Mounting the stripe card to the checkout form
card.mount('#card-element');


// Handle realtime validation errors on the card element
card.addEventListener('change', function(event) {
    var errorDiv = document.getElementById('card-errors');
    if (event.error) {
        var html = `
            <span class="icon" role="alert">
                <i class="fas fa-times"></i>
            </span>
            <span>${event.error.message}</span>
        `;
        $(errorDiv).html(html);
    } else {
        errorDiv.textContent = '';
    }
});


// Getting a form element
let form = document.getElementById('checkout-form')

// Attaching a submit event the the checkout form element
form.addEventListener('submit', function(event){
    event.preventDefault();

    // After submitting disabling stripe card and
    // submit button to avoid multiple submition
    card.update({ 'disabled': true});
    $('#submit-button').attr('disabled', true);

    // Creating a stripe Token
    stripe.createToken(card).then(function(result){

        // Checking errors
        if( result.error ){
            
            let errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;

            // Enabling stirpe card and submition button
            card.update({ 'disabled': false});
            $('#submit-button').attr('disabled', false);

        } else {

            // Creating a stripe payment method
            stripe.createPaymentMethod({

                type: 'card',
                card: card,
                billing_details: {
                    email: customer_email_address,
                }, 
               
                // Geting a payment method's result
            }).then(function(payment_method_result){

                // Checking errors
                if( payment_method_result.error ) {

                    let errorElement = document.getElementById('card-errors');
                    errorElement.textContent = payment_method_result.error.message;

                    // Enabling stirpe card and submition button
                    card.update({ 'disabled': false});
                    $('#submit-button').attr('disabled', false);

                } else {
                    // console.log(payment_method_result)
                    // Creating input element
                    let form = document.getElementById('checkout-form');
                    let hiddenImput = document.createElement( 'input' );

                    // Setting a attributes to the input element
                    hiddenImput.setAttribute( 'type' , 'hidden' );
                    hiddenImput.setAttribute( 'name' , 'payment_method_id' );

                    // Storing stripe meyment method's ID
                    hiddenImput.setAttribute( 'value' , 
                                               payment_method_result.paymentMethod.id );

                    // Appending a input element to the checkout form
                    form.appendChild(hiddenImput);

                    // Submitting form
                    form.submit();

                }
            })
        }
    
    });
});



// function card(stripe_puplic_key, email_address) {
//     document.addEventListener('DOMContentLoaded', function(event){
//         /* Getting stripe puplic and client secret keys */
        
//         // let client_secret = $('#id_client_secret').text().slice(1, -1);
//         // let stripe_puplic_key = $('#id_stripe_public_key').text().slice(1, -1);
//         let stripe = Stripe(stripe_puplic_key);
//         let elements = stripe.elements();

//         var style = {
//             base: {
//                 color: '#32325d',
//                 fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//                 fontSmoothing: 'antialiased',
//                 fontSize: '16px',
//                 '::placeholder': {
//                     color: '#aab7c4'
//                 }
//             },
//             invalid: {
//                 color: '#dc3545',
//                 iconColor: '#dc3545'
//             }
//         };

//         let card = elements.create('card', { style : style });
//         card.mount('#card-element');


//         // Handle realtime validation errors on the card element
//         card.addEventListener('change', function(event) {
//             var errorDiv = document.getElementById('card-errors');
//             if (event.error) {
//                 var html = `
//                     <span class="icon" role="alert">
//                         <i class="fas fa-times"></i>
//                     </span>
//                     <span>${event.error.message}</span>
//                 `;
//                 $(errorDiv).html(html);
//             } else {
//                 errorDiv.textContent = '';
//             }
//         });

//         let form = document.getElementById('checkout-form')
//         form.addEventListener('submit', function(event){
//             event.preventDefault();

//             stripe.createToken(card).then(function(result){
//                 if( result.error ){
//                     let errorElement = document.getElementById('card-errors');
//                     errorElement.textContent = result.error.message;
//                 } else {
//                     // errorElement.textContent = '';
//                     console.log("mushaobs")
//                     stripe.createPaymentMethod({

//                         type: 'card',
//                         card: card,
//                         billing_details: {
//                             email: email_address,
//                         }, 

//                     }).then(function(payment_method_result){
//                         if( payment_method_result.error ) {

//                             let errorElement = document.getElementById('card-errors');
//                             errorElement.textContent = payment_method_result.error.message;

//                         } else {
//                             let form = document.getElementById('checkout-form');
//                             let hiddenImput = document.createElement( 'input' );

//                             hiddenImput.setAttribute( 'type' , 'hiden' );
//                             hiddenImput.setAttribute( 'name' , 'payment_method_id' );
//                             hiddenImput.setAttribute( 'value' , payment_method_result.paymentMethod.id );

//                             form.appendChild(hiddenImput);

//                             form.submit();

//                         }
//                     })
//                 }
            
//             });
//         });

//     });
// }
