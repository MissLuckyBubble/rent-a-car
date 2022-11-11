import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, saveUser } from "../../utils/services/user-http-utils";
import { Table, Button } from 'react-bootstrap';
import { UserCard } from "../user-card/UserCard";
import { confirm } from 'react-bootstrap-confirmation';
import UserForm from "../user-form/UserForm";
export function UsersList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((response) => {
            setUsers(response.data);
        });
    }, []);

    const onDelete = async (id) => {
        const result = await confirm('Are you sure you want to delete it?', { okText: 'Delete', cancelText: 'Cancel', title: 'Delete the chosen user', okButtonStyle: 'danger' });
        if (result === true) {
            deleteUser(id).then(() => {
                setUsers((prevState) => {
                    return prevState.filter(car => car.id !== id);
                });
            });
        }

    }
    const onEdit = (user) => {
        <UserForm handleShow></UserForm>
    }

    return (
        <Table striped bordered hover>

            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone №</th>
                    <th>
                        <UserForm />
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <UserCard key={user.id} user={user} onDelete={onDelete} />)}
            </tbody>
        </Table>

    );
}