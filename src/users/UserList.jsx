import { useEffect } from "react";
import { getAllUsers } from "../services/user-requests";
import { UserCard  } from "UserCard";

export function UsersList(){
    useEffect(()=>{
        getAllUsers().then();
    },[]);

    return(
        <div >
            <UserCard/>
        </div>
    );
}