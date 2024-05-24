import Root from './Root';
import App from '../App';
import PageError from './Errors/PageError';
import { createBrowserRouter, redirectDocument } from 'react-router-dom';
import Course from '../components/Navbar';

export default createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <PageError />,
        children: [
            {
                element: <App />,
                index: true
            },
            {
                path: '/courses/:courseId',
                element: <Course />
            }
        ]
    }
]);