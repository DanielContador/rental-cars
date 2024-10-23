import { Navbar } from "@/components/Shared/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <Navbar/>
        <div className="p-6 mx-auto max-w-7xl">
            <div className="felx flex-col items-center justify-center gap-4 text-center">
                <h1 className="text-2xl">
                    ¡OPS! Hubo un error intente mas tarde, o contacte con nosotros!
                </h1>
                <Link href="/">
                    <br></br>
                    <Button>Volver a ver los autos</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}
