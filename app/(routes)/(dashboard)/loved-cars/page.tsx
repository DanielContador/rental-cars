import { auth } from "@clerk/nextjs/server";
import { ListLovedCars } from "./components/ListLovedCars";
import { redirect } from "next/navigation";

export default function pageLovedCard() {
  const {userId} = auth()

  if(!userId) {
    return redirect("/")
  }
  return (
    <div>
      <h1 className="text-2xl">Coches que me gustan</h1>

      <ListLovedCars/>
    </div>
  )
}
