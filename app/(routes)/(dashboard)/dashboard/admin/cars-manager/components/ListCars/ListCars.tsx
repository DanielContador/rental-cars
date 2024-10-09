import { CardCar } from "./CardCar";
import { ListCarsProps } from "./ListCars.types";

export  function ListCars(props: ListCarsProps) {
  const {autos} = props

  return (
  <div className="grid grid-cols-2 gap-6 my-4 lg:grid-cols-4">
    {autos.map((auto) => (
        <CardCar auto={auto} key={auto.id}/>
    ))}
  </div>
  );
}
