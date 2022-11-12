import './CarCard.scss';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';
import { useState } from "react";


export function CarCard({ car, onDelete }) {

  const [backgrnd, setBackground] = useState('');
  const navigate = useNavigate();
  const navigateToUpdate = () => {
    navigate(`/cars/edit/${car.id}`);
  }
  const navigateToRent = () => {
    navigate(`/rentals/new/${car.id}`)
  }

  const onDeleteClicked = async () => {
    setBackground('red');
    await onDelete(car.id);
    setBackground('');
  }

  const renderActionButtons = () => {

    if (onDelete) {
      return <>
        <Card.Body>
          <Card.Link onClick={navigateToRent}>Rent</Card.Link>
          <Card.Link onClick={navigateToUpdate}>Edit</Card.Link>
          <Card.Link onClick={onDeleteClicked}>Delete</Card.Link>
        </Card.Body>
      </>
    }
  }

  return (
    <Card className="card" style={{ margin: '5px', borderColor: backgrnd }}>
      <Card.Img variant="top" src={car.picture} />
      <Card.Body style={{ background: backgrnd }}>
        <Card.Title>{car.brand} {car.model}</Card.Title>
        <Card.Text>
          Fuel type: {car.fuel}
          <br />
          Construction year: {car.year}
          <br />
          Number of seats: {car.seats}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Type: {car.type}</ListGroup.Item>
        <ListGroup.Item>Price per day: {car.price}$ </ListGroup.Item>
        <ListGroup.Item>Number of avaailable vehicles: {car.count}</ListGroup.Item>
      </ListGroup>
      {renderActionButtons()}
    </Card>
  );

}