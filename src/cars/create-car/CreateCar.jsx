import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate, useParams} from 'react-router'
import { saveCar } from '../../utils/services/car-http-utils';

export function CreateCar(){

    const navigate = useNavigate();
    const params = useParams();
    const today = new Date();
    const year = today.getFullYear();

    const [currentCar, setCurrentCar] = useState({
        type: "economy",
        brand: "",
        model: "",
        year: "",
        fuel: "petrol",
        seats: "",
        picture: "",
        price: "",
        count: "",
      });

      const onFormControlChange = (event) => {
        setCurrentCar((prevState)=>{
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        saveCar(currentCar).then(()=>{
            navigate('/cars')
        });
    }

    return (
        <Form onSubmit={onSubmit}>

          <Form.Group className="mb-3" controlid="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control type="text" name="brand" placeholder="Brand of the car" onChange={onFormControlChange} value={currentCar.brand} required />
          </Form.Group>

          <Form.Group className="mb-3" controlid="model">
            <Form.Label>Model</Form.Label>
            <Form.Control type="text" name="model" placeholder="Model of the car" onChange={onFormControlChange} value={currentCar.model} required />
          </Form.Group>

          <Form.Group className="mb-3" controlid="year">
            <Form.Label>Construction Year</Form.Label>
            <Form.Control type="number" min="2000" max={year} name="year" placeholder={year} onChange={onFormControlChange} value={currentCar.year} required />
          </Form.Group>

          <Form.Group className="mb-3" controlid="seats">
            <Form.Label>Number of seats</Form.Label>
            <Form.Control type="number" min="1" max="22" name="seats" placeholder="5" onChange={onFormControlChange} value={currentCar.seats} required />
          </Form.Group>

          <Form.Group className="mb-1" controlid="price">
            <Form.Label>Price per day</Form.Label>
            <Form.Control type="number"  name="price" placeholder="Price $" onChange={onFormControlChange} value={currentCar.price} required />
          </Form.Group>

          <Form.Label>Vehicle Type</Form.Label>
          <Form.Select controlid="type" name="type" value={currentCar.type} onChange={onFormControlChange}>
            <option value="economy">economy</option>
            <option value="estate">estate</option>
            <option value="luxury">luxury</option>
            <option value="SUV">SUV</option>
            <option value="cargo">cargo</option>
         </Form.Select>

         <Form.Label>Fuel Type</Form.Label>
         <Form.Select controlid="fuel" name="fuel" value={currentCar.fuel} onChange={onFormControlChange} selected>
            <option value="petrol">petrol</option>
            <option value="disel">disel</option>
            <option value="hybrid">hybrid</option>
            <option value="electric">electric</option>
         </Form.Select>

         <Form.Group className="mb-1" controlid="picture">
            <Form.Label>Picture Link</Form.Label>
            <Form.Control type="text"  name="picture" placeholder="picture.com" onChange={onFormControlChange} value={currentCar.picture}/>
          </Form.Group>

          <Form.Group className="mb-1" controlid="count">
            <Form.Label>Number of available vehicles</Form.Label>
            <Form.Control type="number"  name="count" placeholder="Count" onChange={onFormControlChange} value={currentCar.count} required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    
}