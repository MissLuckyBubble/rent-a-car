import axios from 'axios';

const apiURL = 'http://localhost:3005/users';

export function getAllUsers(){
    return axios.get(apiURL);
}

export function deleteUser(id){
    return axios.delete(`${apiURL}/${id}`);
}

export function saveUser(user){
    if(user.id){
        return axios.put(`${apiURL}/${user.id}`,user);
    }
    else {
       return axios.post(apiURL,user);
    }
}

export function getUserById(id){
    return axios.get(`${apiURL}/${id}`);
}