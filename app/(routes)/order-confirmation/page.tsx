// OrderConfirmationPage.js
import { Navbar } from "@/components/Shared/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl">¡Muchas gracias por confiar en nosotros!</h1>
          <p>Tu pago se ha confirmado con éxito y pronto recibirás toda la información por correo electrónico.</p>
          <Link href="/">
            <Button>Volver a ver los productos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
