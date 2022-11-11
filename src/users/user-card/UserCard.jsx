import { useState } from "react";
import UserForm from "../user-form/UserForm";

export function UserCard({ user, onDelete, onEdit }) {
  const [backgrnd, setBackground] = useState('');

  const onDeleteClicked = async () => {
    setBackground('#FFA500');
    await onDelete(user.id);
    setBackground('');
  }
  const userId = user.id;
  return (
    <tr style={{ background: backgrnd }}>
      <td>{user.firstName} {user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.phoneN}</td>
      <td>
        <UserForm userId={userId} />{" "}
        <button className="btn btn-danger" onClick={onDeleteClicked}>Delete</button>
      </td>
    </tr>
  );
}