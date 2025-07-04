import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("your_stripe_public_key_here");

function StripePayment() {
    return (

            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
     
    );
}

export default StripePayment;
