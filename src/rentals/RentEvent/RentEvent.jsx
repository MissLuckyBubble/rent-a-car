import { useNavigate, useParams } from 'react-router'
import { getCarById, saveCar } from './../../utils/services/car-http-utils';
import { useState, useEffect, useRef } from 'react';
import { CarCard } from './../../cars/car-card/CarCard';
import { Col, Form, FormGroup, FormLabel, Row, Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { getAllUsers } from './../../utils/services/user-http-utils';
import { getAllRentals, saveRent } from './../../utils/services/rent-http-utils'
import Alert from 'react-bootstrap/Alert';
import moment from 'moment';
import './RentEvent.scss'
export function RentEvent() {
    const today = moment().format('DD-MM-YYYY HH:mm');
    const inputMinDate = moment().format('YYYY-MM-DDTHH:MM');
    const refOne = useRef(null);
    const navigate = useNavigate();
    const emptyCar = {
        type: 'economy',
        brand: '',
        model: '',
        year: '',
        fuel: 'petrol',
        seats: '',
        picture: '',
        price: '',
        count: 0,
    };
    const emptyUser = {
        firstName: '',
        lastName: '',
        email: '',
        phoneN: '',
    }
    const [currentCar, setCurrentCar] = useState(emptyCar);
    const [currentUser, setCurrentUser] = useState(emptyUser);
    const [users, setUsers] = useState([]);
    const [rentals, setRentals] = useState([]);
    const params = useParams();
    useEffect(() => {
        document.addEventListener("click", onClickOutside, true)
        getCarById(params.carId).then((response) => {
            setCurrentCar(response.data);
        })
        getAllUsers().then((response) => {
            setUsers(response.data);
        });
        getAllRentals().then((response) => {
            setRentals(response.data);
        })
    }, [params.carId]);
    const emptyRent = {
        "startDate": today,
        "numberOfDays": 0,
        "endDate": today,
        "totalPrice": 0,
        "carId": 0,
        "userId": 0
    }
    const [currentRent, setCurrentRent] = useState(emptyRent);
    const emptyPricing = {
        'forAllDays': 0,
        'discounts': 0,
        'vip': 0,
        '%Off': 0,
        'total': 0
    }
    const [pricing, setPricing] = useState(emptyPricing);
    const emptyInfo = {
        "startDate": today,
        "endDate": today,
        "numberOfDays": 1,
        "email": ""
    }
    const [currentInfo, setCurrentInfo] = useState(emptyInfo);
    const [suggestions, setSuggestions] = useState([]);
    const onFormControlChange = (event) => {
        let matches = [];
        setCurrentInfo((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
        if (event.target.name === "email") {
            if (event.target.value) {
                matches = users.filter(u => {
                    const regex = new RegExp(`${event.target.value}`, "gi");
                    return u.email.match(regex);
                })
            }
            setSuggestions(matches);
        } else {
            let date;
            if (event.target.name === "startDate") {
                date = moment(event.target.value).format('DD-MM-YYYY HH:mm');
                setCurrentInfo((prevState) => ({
                    ...prevState,
                    [event.target.name]: date
                }));
                setCurrentInfo((prevState) => ({
                    ...prevState,
                    'endDate': moment(date, 'DD-MM-YYYY HH:mm').add(currentInfo.numberOfDays, 'd').format('DD-MM-YYYY HH:mm')
                }))

            } else {
                if (event.target.name === "numberOfDays") {
                    const days = parseInt(event.target.value);
                    let disc = 0;
                    date = moment(currentInfo.startDate, 'DD-MM-YYYY HH:mm').add(days, 'd').format('DD-MM-YYYY HH:mm');
                    if (pricing.vip >= 15) disc = 15
                    else {
                        if (days >= 3) disc = 5;
                        if (days >= 5) disc = 7;
                        if (days >= 10) disc = 10;
                    }
                    countThePrice(disc, days)
                    setCurrentInfo((prevState) => ({
                        ...prevState,
                        'endDate': date
                    }))
                }
            }
        }
    }
    const onClickOutside = (e) => {
        if (!refOne.current.contains(e.target)) {
            setSuggestions([]);
        }
    }
    const onSuggestClick = (suggest) => {
        setCurrentInfo((prevState) => ({
            ...prevState,
            "email": suggest
        }));
        let u = users.filter(u => u.email == suggest);
        setCurrentUser(u[0]);
        setPricing(emptyPricing);
        setAlert([]);
        checkIfUserIsVIP(u[0].id);
        setSuggestions([]);
    }
    const [customAlert, setAlert] = useState([]);
    const checkIfUserIsVIP = (id) => {
        let date = moment(today).add(-60, 'days').format('DD-MM-YYYY HH:mm');
        let days = parseInt(currentInfo.numberOfDays);
        let disc = 0;
        let rentalsForThisUser = rentals.filter(r => r.userId == id);
        let rentalsIn60days = rentalsForThisUser.filter(r =>
            moment(r.startDate).format('DD-MM-YYYY HH:mm') > moment(date).format('DD-MM-YYYY HH:mm'));
        if (rentalsIn60days.length >= 3) {
            setAlert(<Alert key='success' variant='success'>
                This Customer is VIP! You get 15% OFF
            </Alert>);
            disc = 15;
        } else {
            if (days >= 3) disc = 5;
            if (days >= 5) disc = 7;
            if (days >= 10) disc = 10;
        }
        countThePrice(disc, days)
    }
    const countThePrice = (disc, days) => {
        setPricing((prevState) => ({
            ...prevState,
            'vip': disc,
            '%Off': disc,
            'forAllDays': currentCar.price * days,
            'discounts': (currentCar.price * days) * disc / 100,
            'total': ((currentCar.price * days) - (currentCar.price * days * disc / 100))
        }))
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (!currentUser.email) {
            setAlert(<Alert key='danger' variant='danger'>
                Please choose customer!
            </Alert>);
            return;
        }
        else {
            setCurrentRent({
                "startDate": moment(currentInfo.startDate).format('DD-MM-YYYY HH:mm'),
                "numberOfDays": parseInt(currentInfo.numberOfDays),
                "endDate": moment(currentInfo.endDate).format('DD-MM-YYYY HH:mm'),
                "totalPrice": parseInt(pricing.total),
                "carId": currentCar.id,
                "userId": currentUser.id
            });
            if (currentCar.count <= 0) {
                alert("This car cannot be rented! It doesn't have enough number of available vehicles!");
                return;
            }
            saveRent(currentRent).then(() => {
                saveCar({
                    type: currentCar.type,
                    brand: currentCar.brand,
                    model: currentCar.model,
                    year: currentCar.year,
                    fuel: currentCar.fuel,
                    seats: currentCar.seats,
                    picture: currentCar.picture,
                    price: currentCar.price,
                    count: currentCar.count - 1,
                    id: currentCar.id
                }).then(() => {
                    navigate('/cars')
                });
            });

        }
    }


    return (
        <Form id='rent-form' onSubmit={onSubmit}>
            <div>
                <Row>
                    <h1 >
                        Rent a car
                    </h1>
                </Row>
                <Row>
                    <Col sm={3} style={{ marginLeft: '10px' }}>
                        <Row style={{ paddingBottom: '30px' }}>
                            <Col>
                                <h1></h1>
                                <FormGroup>
                                    <FormLabel>Start Date</FormLabel>
                                    <Form.Control type="datetime-local" name="startDate" min={moment(inputMinDate).format('YYYY-MM-DDTHH:MM')} onChange={onFormControlChange} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <FormLabel>Days Rent</FormLabel>
                                    <Form.Control type="number" name="numberOfDays" min='1' max='60' onChange={onFormControlChange} value={currentInfo.numberOfDays} />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter number beetween 1 and 60!
                                    </Form.Control.Feedback>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row style={{ paddingBottom: '30px' }}>
                            <FormGroup ref={refOne}>
                                <FormLabel>Customer email</FormLabel>
                                <Form.Control type="email" name="email"
                                    onChange={onFormControlChange}
                                    value={currentInfo.email} />
                                {suggestions && suggestions.map((suggestion, i) =>
                                    <div className='suggestions' key={i} onClick={() => onSuggestClick(suggestion.email)}>{suggestion.email}</div>
                                )}
                            </FormGroup>
                        </Row>
                    </Col>
                    <Col sm={3} style={{ display: 'grid', justifyContent: 'center' }}>
                        <CarCard key={currentCar.id} car={currentCar} />
                    </Col>
                    <Col style={{ marginRight: '10px' }}>
                        <Card className="text-center">
                            <Card.Header>Rent Information</Card.Header>
                            <Card.Body>
                                <Card.Title>Customer </Card.Title>
                                <Card.Text>
                                    Full name: {currentUser.firstName} {currentUser.lastName}
                                    <br />
                                    Email : {currentUser.email}
                                    {customAlert}
                                </Card.Text>
                                <hr />
                                <Card.Title> Car </Card.Title>
                                <Card.Text>
                                    Full name: {currentCar.brand} {currentCar.model}
                                    <br />
                                    Type : {currentCar.type}, Price Per Day: {currentCar.price}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Start Date: {currentInfo.startDate.toString()}</ListGroup.Item>
                                <ListGroup.Item>End Date: {currentInfo.endDate.toString()} (Days: {currentInfo.numberOfDays}) <Badge bg="success">{pricing['%Off']}% OFF</Badge></ListGroup.Item>
                            </ListGroup>
                            <ListGroup className="list-group-flush">
                                <div className='pricing'>
                                    Price for {currentInfo.numberOfDays} days: {pricing.forAllDays}$
                                    <div className='red'>Discount: {pricing.discounts}$</div>
                                    <div className='total'> Total: {pricing.total}$</div>
                                </div>
                            </ListGroup>
                            <Card.Footer className="text-muted"></Card.Footer>
                        </Card>
                        <Button form='rent-form' style={{ float: 'right', marginTop: '10px', marginBottom: '10px' }} type='submit' variant="primary">Rent</Button>
                    </Col>
                </Row>
            </div>
        </Form>
    );
}