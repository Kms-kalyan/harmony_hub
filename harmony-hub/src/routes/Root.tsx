import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';

export default () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet/>
        </>
    );
}