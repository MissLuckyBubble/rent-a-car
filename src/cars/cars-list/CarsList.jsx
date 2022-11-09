import './CarsList.scss';
import { useEffect, useState } from "react";
//import { useResolvedPath } from "react-router-dom";
import { deleteCar, getCars } from "../../utils/services/car-http-utils";
import { CarCard } from "../car-card/CarCard";
import React from 'react';
import { confirm } from 'react-bootstrap-confirmation';

export function CarsList() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        getCars().then((response) => {
            setCars(response.data);
        })
    }, []);

    const onDelete = async (id) => {
        const result = await confirm('Are you sure you want to delete it?', { okText: 'Delete', cancelText: 'Cancel', title: 'Delete the chosen car', okButtonStyle: 'danger' });
        console.log('True if confirmed, false otherwise:', result);
        if (result === true) {
            deleteCar(id).then(() => {
                setCars((prevState) => {
                    return prevState.filter(car => car.id !== id);
                });
            });
        }

    }
    return (

        <div className="cars-list">
            {cars.map(car => <CarCard key={car.id} car={car} onDelete={onDelete} />)}
        </div>
    );
}