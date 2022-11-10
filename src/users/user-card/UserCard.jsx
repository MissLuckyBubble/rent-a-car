import { useState } from "react";

export function UserCard({user, onDelete}) {
    const [backgrnd, setBackground] = useState('');


    return (
        <tr style={{background:backgrnd}}>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phoneN}</td>
            <td>
                <button className="btn btn-primary" data-toggle="modal" >Edit</button>{" "}
                <button className="btn btn-danger" >Delete</button>
            </td>
        </tr>
    );
}