import React from 'react';
import { FUNDING, PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

interface PayPalButtonProps {
    amount: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (details: any) => void;
}

export default function PayPalButton({ amount, onSuccess }: PayPalButtonProps) {
    return (
        <PayPalScriptProvider options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
            currency: 'USD'
        }}>
            <PayPalButtons
                fundingSource={FUNDING.PAYPAL}
                createOrder={(data, actions) => {
                    if (!actions?.order) {
                        console.error("actions.order is undefined");
                        return Promise.reject("Order creation failed");
                    }
                    return actions.order.create({
                        //@ts-ignore
                        purchase_units: [{ amount: { value: amount } }]
                    });
                }}
                onApprove={(data, actions) => {
                    if (!actions?.order) {
                        console.error("actions.order is undefined");
                        return Promise.reject("Order capture failed");
                    }
                    return actions.order.capture().then((details) => {
                        onSuccess(details);
                    });
                }}
                onError={(error) => console.error('Payment error:', error)}
            />
        </PayPalScriptProvider>
    );
}
