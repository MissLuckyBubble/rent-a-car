import './App.scss';
import { Layout } from './components/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { CarsList } from './cars/cars-list/CarsList';
import { CreateCar } from './cars/create-car/CarForm';
import { UsersList } from './users/user-list/UserList';
import { UserForm } from './users/user-form/UserForm';

function App() {
  return(
    <div className='App'>
      <Routes>
      <Route path ="/" element = {<Layout/>} >
          <Route path="cars" element= {<CarsList/>}/>
          <Route path="cars/create" element= {<CreateCar/>}/>
          <Route path="cars/edit/:id" element={<CreateCar />} />
          <Route path="users" element={<UsersList />} />
      </Route>
      </Routes>
    </div>
  );
}

export default App;
