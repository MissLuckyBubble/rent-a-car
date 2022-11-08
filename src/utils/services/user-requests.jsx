import axios from 'axios';

const apiURL = 'http://localhost:3005/users';

export function getAllUsers(){
    return axios.get(apiURL);
}