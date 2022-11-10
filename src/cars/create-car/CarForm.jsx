import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router'
import { saveCar, getCarById } from '../../utils/services/car-http-utils';
import Badge from 'react-bootstrap/Badge';
import './CarForm.scss';


export function CreateCar() {

  const navigate = useNavigate();
  const params = useParams();
  const today = new Date();
  const year = today.getFullYear();
  const emptyCar = {
    type: 'economy',
    brand: '',
    model: '',
    year: '',
    fuel: 'petrol',
    seats: '',
    picture: '',
    price: '',
    count: '',
  };
  const [currentCar, setCurrentCar] = useState(emptyCar);
  const [currentTitle, setCurrentTitle] = useState("Create ");

  useEffect(() => {
    if (params.id) {
      getCarById(params.id).then((response) => {
        setCurrentCar(response.data);
        setCurrentTitle("Update ");
      })
    } else {
      setCurrentCar(emptyCar);
      setCurrentTitle("Create ");
    }
  }, [params.id]);

  const onFormControlChange = (event) => {
    setCurrentCar((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (currentCar.type == '') {
      currentCar.type = 'economy'
    }
    if (currentCar.fuel == '') {
      currentCar.fuel = 'petrol'
    }
    saveCar(currentCar).then(() => {
      navigate('/cars')
    });
  }
  const onReset = (event) =>{
    event.preventDefault();
    if (params.id) {
      navigate('/cars');
    } 
    else{
      setCurrentCar(emptyCar);
    }
  }

  return (
    <Form onSubmit={onSubmit} onReset={onReset} >
      <h1 className='title'>
        {currentTitle} <Badge bg="success">Car</Badge>
      </h1>
      <Row className='mb-3' style={{ margin: '0px 200px 0px 200px' }}>
        <Form.Group as={Col} controlid="brand">
          <Form.Label>Brand</Form.Label>
          <Form.Control type="text" name="brand" placeholder="Brand of the car" onChange={onFormControlChange} value={currentCar.brand} required />
        </Form.Group>

        <Form.Group as={Col} controlid="model">
          <Form.Label>Model</Form.Label>
          <Form.Control type="text" name="model" placeholder="Model of the car" onChange={onFormControlChange} value={currentCar.model} required />
        </Form.Group>
      </Row>
      <Row className='mb-3' style={{ margin: '0px 200px 0px 200px' }}>
        <Form.Group as={Col} className="mb-3" controlid="year">
          <Form.Label>Construction Year</Form.Label>
          <Form.Control type="number" min="2000" max={year} name="year" placeholder={year} onChange={onFormControlChange} value={currentCar.year} required />
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlid="seats">
          <Form.Label>Number of seats</Form.Label>
          <Form.Control type="number" min="1" max="22" name="seats" placeholder="5" onChange={onFormControlChange} value={currentCar.seats} required />
        </Form.Group>
        <Form.Group as={Col} className="mb-1" controlid="count">
          <Form.Label>Number of available vehicles</Form.Label>
          <Form.Control type="number" min="0" name="count" placeholder="Count" onChange={onFormControlChange} value={currentCar.count} required />
        </Form.Group>
      </Row>

      <Row className='mb-3' style={{ margin: '0px 200px 0px 200px' }}>
        <Form.Group as={Col} className="mb-1" controlid="price">
          <Form.Label>Price per day</Form.Label>
          <Form.Control type="number" min="1" name="price" placeholder="Price $" onChange={onFormControlChange} value={currentCar.price} required />
        </Form.Group>

        <Form.Group as={Col} className="mb-1" controlid="price">
          <Form.Label>Vehicle Type</Form.Label>
          <Form.Select controlid="type" name="type" value={currentCar.type} onChange={onFormControlChange}>
            <option value="economy">economy</option>
            <option value="estate">estate</option>
            <option value="luxury">luxury</option>
            <option value="SUV">SUV</option>
            <option value="cargo">cargo</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} className="mb-1" controlid="price">
          <Form.Label>Fuel Type</Form.Label>
          <Form.Select controlid="fuel" name="fuel" value={currentCar.fuel} onChange={onFormControlChange} selected>
            <option value="petrol">petrol</option>
            <option value="disel">disel</option>
            <option value="hybrid">hybrid</option>
            <option value="electric">electric</option>
          </Form.Select>
        </Form.Group>
      </Row>


      <Form.Group style={{ margin: '0px 210px 0px 210px' }} className="mb-3" controlid="picture">
        <Form.Label>Picture Link</Form.Label>
        <Form.Control type="text" name="picture" placeholder="picture.com" onChange={onFormControlChange} value={currentCar.picture} />
      </Form.Group>

<div className='buttons'>
      <Button style={{ margin: '0px 0px 20px 950px' }} variant="outline-success" type="submit">
        Submit
      </Button>
      
      <Button style={{ margin: '0px 20px 20px 20px' }} variant="outline-primary" type='reset' >
      Cancel 
      </Button>
      </div>
    </Form>
  );

}