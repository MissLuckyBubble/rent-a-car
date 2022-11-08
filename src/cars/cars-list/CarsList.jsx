import './CarsList.scss';
import { useEffect, useState } from "react";
//import { useResolvedPath } from "react-router-dom";
import { deleteCar, getCars } from "../../utils/services/car-http-utils";
import { CarCard } from "../car-card/CarCard";


export function CarsList(){
    const [cars, setCars] = useState([]);

    useEffect(()=>{
        getCars().then((response)=>{
            setCars(response.data);
        })
    },[]);

    const onDelete = (id) =>{
        deleteCar(id).then(()=>{
          setCars((prevState)=>{
            return prevState.filter(car => car.id !== id);
          });
        });
    }

    return(

        <div className="cars-list">
            
            {cars.map(car=><CarCard key={car.id} car={car} onDelete={onDelete}/>)}
        </div>
    );
}