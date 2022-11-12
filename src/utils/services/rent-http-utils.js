import axios from 'axios';

const apiURL = 'http://localhost:3005/rentals';

export function getAllRentals(){
    return axios.get(apiURL);
}

export function saveRent(rent){
    if(rent.id){
        return axios.put(`${apiURL}/${rent.id}`,rent);
    }
    else{
        return axios.post(apiURL,rent);
    }
}

