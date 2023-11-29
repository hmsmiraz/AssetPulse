import { loadStripe } from "@stripe/stripe-js";
import SharedTitle from "../../Shared/SharedTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

// add publishable key in " " from stripe website create an account
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_STRIPE);
const Payment = () => {
  const location = useLocation();
  
  const priceOfPackage = location.state?.priceOfPackage || 0;
  // console.log(priceOfPackage);
  return (
    <div>
      <SharedTitle heading={"Payment of package"}></SharedTitle>
      <div className="max-w-4xl mx-auto my-5">
        <Elements stripe={stripePromise}>
          <CheckoutForm priceOfPackage={priceOfPackage}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
