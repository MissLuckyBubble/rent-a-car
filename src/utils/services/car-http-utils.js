import axios from 'axios'; 

const apiUrl = 'http://localhost:3005/cars';


export function getCars(){
  
    return axios.get(apiUrl);
}

export function deleteCar(id){
    return axios.delete(`${apiUrl}/${id}`);
}

export function getCarById(id){
    return axios.get(`${apiUrl}/${id}`);
}

export function saveCar(carObj){
    
    if(!carObj.picture){
        carObj.picture = "https://thumbs.dreamstime.com/b/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg";
    }
    
    if(carObj.id){
        return axios.put(`${apiUrl}/${carObj.id}`, carObj);
    }
    return axios.post(apiUrl, carObj);
}