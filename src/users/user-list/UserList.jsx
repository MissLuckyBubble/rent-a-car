import { useEffect, useState } from "react";
import { getAllUsers } from "../../utils/services/user-http-utils";
import Table from 'react-bootstrap/Table';
import { UserCard } from "../user-card/UserCard";
export function UsersList() {

    const[users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then((response)=>{
            setUsers(response.data);
        });
    }, []);



    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone №</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>
              {users.map(user=><UserCard key={user.id} user={user} />)}
            </tbody>
        </Table>

    );
}