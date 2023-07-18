import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation} from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import "../styles/Stripe.css"

const stripePromise = loadStripe("pk_test_51NTISASEPtzdVlqBkwglW9fKYdTnP4JU9Mlb2ge3zaRB8UpMVHLdDqPnNV9TKXAAfWseG26ZSGieu4FPbeS8VyUd00Osljr61n");

export default function StripeChckout() {
    const location = useLocation();
    

  const [clientSecret, setClientSecret] = useState("");
  const currentOrder={
    _id:"1245",
    grandtotal: location.state,
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount:currentOrder.grandtotal }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    
    <div className="Stripe" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "rgb(255, 200, 10)", height: '100vh' }}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
   
  );
}