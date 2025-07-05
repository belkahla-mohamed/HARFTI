import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) return;

        try {
            // Step 1: Request clientSecret from backend
            const response = await fetch("https://harftibackend-production.up.railway.app/payment/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: 10, currency: "usd" }), // Adjust amount
            });

            const { clientSecret } = await response.json();

            // Step 2: Confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                alert("Payment Successful!");
            }
        } catch (err) {
            setError("Payment failed. Try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex flex-col pt-32 items-center select-none">
            <div className="w-md mx-auto p-6 bg-[#333333] rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold text-orange-500 mb-4">Complete Payment</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="p-4 border bg-white border-gray-300 rounded-lg shadow-sm">
                        <CardElement className="p-2" />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={!stripe || loading}
                        className={`w-full px-4 py-2 rounded-lg font-medium text-white transition ${loading ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700"
                            }`}
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CheckoutForm;
