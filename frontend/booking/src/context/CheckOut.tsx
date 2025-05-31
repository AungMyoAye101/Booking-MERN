// import { CheckoutProvider } from "@stripe/react-stripe-js"
// import { loadStripe } from "@stripe/stripe-js"
// import React from "react";


// const stripePromise = loadStripe('pk_test_51RU7Rj4IoUt5SngPavN1tkSN31ZQp1s3TpDPDo60m7qUkiD8yij1IWvx8nkx1vfHHjGCMUn7WiKlc9knkU1GwNfg00zrPsE12I')

// const CheckOut = ({ children }: { children: React.ReactNode }) => {
//     const fetchClientSecret = () => {
//         return fetch('/create-checkout-session', { method: 'POST' })
//             .then((response) => response.json())
//             .then((json) => json.checkoutSessionClientSecret)
//     };
//     return (
//         <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
//             {children}
//         </CheckoutProvider>)
// }

// export default CheckOut