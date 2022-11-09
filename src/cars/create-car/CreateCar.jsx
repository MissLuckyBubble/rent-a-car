import { useState } from 'react';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useNavigate} from 'react-router'
import { saveCar } from '../../utils/services/car-http-utils';

export function CreateCar() {

  const navigate = useNavigate();
  //const params = useParams();
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
    setCurrentCar((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    saveCar(currentCar).then(() => {
      navigate('/cars')
    });
  }

  return (
    <Form onSubmit={onSubmit}>

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
        <Form.Group as={Col}className="mb-1" controlid="count">
        <Form.Label>Number of available vehicles</Form.Label>
        <Form.Control type="number" min="0"  name="count" placeholder="Count" onChange={onFormControlChange} value={currentCar.count} required />
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


      <Button style={{ margin: '10px 0px 20px 1020px' }} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );

}