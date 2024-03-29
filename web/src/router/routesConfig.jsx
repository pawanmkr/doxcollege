import { Routes, Route } from 'react-router-dom';
import Documents from "../components/Documents";
import Error from '../components/Error';
import Upload from '../components/Upload';
import Login from '../components/Login';
import DocumentDetails from '../components/DocumentDetails'; 
import Profile from '../components/Profile';
import Signup from '../components/Signup';
import EditDocument from '../components/EditDocument';



const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' exact element={<Documents />} />
            <Route path='/upload' exact element={<Upload />} />
            <Route path='/profile' exact element={<Profile />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/signup' exact element={<Signup />} />
            <Route path="/document/:id" element={<DocumentDetails />} />
            <Route path="/edit-document/:id" element={<EditDocument />} />
            <Route path='*' element={<Error />} />
        </Routes>
    );
}

export default AppRoutes;
