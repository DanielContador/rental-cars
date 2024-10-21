"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Change import
import { Navbar } from "@/components/Shared/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams(); // Get search parameters

  useEffect(() => {
    const capturePayment = async () => {
      const token = searchParams.get('token'); // Access token
      const payerId = searchParams.get('PayerID'); // Access PayerID

      if (token && payerId) {
        const response = await fetch('/api/capture-payments', { // Adjusted endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, payerId }),
        });
        
        const data = await response.json();

        if (data.success) {
          // Handle successful payment
          console.log('Payment successful:', data);
        } else {
          // Handle payment failure
          console.error('Payment failed:', data);
        }
      }
    };

    capturePayment();
  }, [searchParams]); // Listen to searchParams changes

  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl">¡Muchas gracias por confiar en nosotros!</h1>
          <p>
            En breves momentos recibirás toda la información a través de tu
            correo electrónico.
          </p>
          <p>
            Puedes visualizar todas tus reservas dentro de tu Área de cliente.
          </p>
          <Link href="/">
            <Button>Volver a ver los productos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
