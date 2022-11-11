import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router'
import { useEffect } from "react";
import { getAllUsers, getUserById, saveUser } from "../../utils/services/user-http-utils";
import Alert from 'react-bootstrap/Alert';

export function UserForm({ userId }) {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [alert, setAlert] = useState([]);
    const handleClose = () => {
        setShow(false)
        reload();
    };
    const handleShow = () => setShow(true);
    var foundEmail = false;
    const params = useParams();
    const reload = () => window.location.reload();
    const navigate = useNavigate();

    const emptyUser = {
        firstName: '',
        lastName: '',
        email: '',
        phoneN: '',
    }
    const [currentUser, setCurrentUser] = useState(emptyUser);
    const [currentTitle, setCurrentTitle] = useState({ title: "Add Customer ", btn: "" });

    const onFormControlChange = (event) => {
        setCurrentUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === currentUser.email) {
                {
                    if (currentUser.id != undefined) {
                        if (users[i].id != currentUser.id) {
                            foundEmail = true;
                        }
                    } else foundEmail = true;
                }
            }
        }
        if (!foundEmail) {
            await saveUser(currentUser);
            handleClose();
        } else {
            setAlert(<Alert variant="danger">
                <Alert.Heading>Unique Emails!</Alert.Heading>
                <p>
                    You must enter unique emails for every Customer,
                    couse the rent is by emails
                </p>
            </Alert>);
        }
    }

    useEffect(() => {
        getAllUsers().then((response) => {
            setUsers(response.data);
        });
        if (userId) {
            getUserById(userId).then((response) => {
                setCurrentUser(response.data);
                setCurrentTitle({ title: "Update ", btn: "Edit" });
            })
        } else {
            setCurrentUser(emptyUser);
            setCurrentTitle({ title: "Create ", btn: "+ Add new Customer" });
        }
    }, [params.id])
    return (
        <>
            <Button variant="success" onClick={handleShow}>
                {currentTitle.btn}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{currentTitle.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alert}
                    <Form id='my-form' onSubmit={onSubmit} className="justify-content-md-center">
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={3}>First Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" name="firstName" placeholder="Customer First Name" onChange={onFormControlChange} value={currentUser.firstName} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Last Name</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" name="lastName" placeholder="Customer Last Name" onChange={onFormControlChange} value={currentUser.lastName} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="email" name="email" placeholder="Email" onChange={onFormControlChange} value={currentUser.email} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3}>Phone Number</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="phone" name="phoneN" placeholder="Customer Phone №" onChange={onFormControlChange} value={currentUser.phoneN} required />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button form="my-form" type="submit">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default UserForm;