import { StripePayment } from "./stripe";

export function PaymentFactroy(paymentMethod:string) {
    //currently stripe is the only supported mode of payment;
    let paymentMode:StripePayment;
    switch (paymentMethod) {
        case 'Stripe':  
           paymentMode =  new StripePayment(process.env.ORIGIN) 
            break;
    
        default:
            break;
    }
    return paymentMode;
}