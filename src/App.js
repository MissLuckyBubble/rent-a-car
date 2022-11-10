import './App.scss';
import { Layout } from './components/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { CarsList } from './cars/cars-list/CarsList';
import { CreateCar } from './cars/create-car/CarForm';

function App() {
  return(
    <div className='App'>
      <Routes>
      <Route path ="/" element = {<Layout/>} >
          <Route path="cars" element= {<CarsList/>}/>
          <Route path="cars/create" element= {<CreateCar/>}/>
          <Route path="cars/edit/:id" element={<CreateCar />} />
      </Route>
      </Routes>
    </div>
  );
}

export default App;
