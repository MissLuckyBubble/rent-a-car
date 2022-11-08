import './CarCard.scss';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';

export function CarCard({ car, onDelete }) {
  
  const navigate = useNavigate();

  const onDeleteClicked = () =>{
    onDelete(car.id)
  }
    return (
      <Card className="card" style={{ width: '18rem', marginleft: '10px'}}>
        <Card.Img variant="top" src={car.picture} />
        <Card.Body>
          <Card.Title>{car.brand} {car.model}</Card.Title>
          <Card.Text>
            Fuel type: {car.fuel}
            <br/>
            Construction year: {car.year}
            <br/>
            Number of seats: {car.seats}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Type: {car.type}</ListGroup.Item>
          <ListGroup.Item>Price per day: {car.price}$ </ListGroup.Item>
          <ListGroup.Item>Number of avaailable vehicles: {car.count}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link>Rent</Card.Link>
          <Card.Link>Edit</Card.Link>
          <Card.Link onClick = {onDeleteClicked}>Delete</Card.Link>
        </Card.Body>
      </Card>
    );
}