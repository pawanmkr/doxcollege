import { Routes, Route } from 'react-router-dom';
import Documents from "../components/Documents";
import Error from '../components/Error';
import Upload from '../components/Upload';
import Login from '../components/Login';
import DocumentDetails from '../components/DocumentDetails'; 



const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' exact element={<Documents />} />
            <Route path='/upload' exact element={<Upload />} />
            <Route path='/login' exact element={<Login />} />
            <Route path="/document/:id" element={<DocumentDetails />} />
            <Route path='*' element={<Error />} />
        </Routes>
    );
}

export default AppRoutes;
