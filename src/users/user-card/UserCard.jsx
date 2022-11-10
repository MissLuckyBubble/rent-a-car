import { useState } from "react";

export function UserCard({user, onDelete}) {
    const [backgrnd, setBackground] = useState('');

      const onDeleteClicked = async () => {
        setBackground('#FFA500');
        await onDelete(user.id);
        setBackground('');
      }
    return (
        <tr style={{background:backgrnd}}>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.phoneN}</td>
            <td>
                <button className="btn btn-primary" data-toggle="modal">Edit</button>{" "}
                <button className="btn btn-danger" onClick={onDeleteClicked}>Delete</button>
            </td>
        </tr>
    );
}