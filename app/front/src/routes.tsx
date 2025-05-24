import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Layout } from './components/providers/layout';
import { Dashboard } from './pages/dashboard';
import { Invoices } from './pages/invoices';
import { Devices } from './pages/devices';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path='/invoices' element={<Invoices />} />
                <Route path='/devices' element={<Devices />} />
            </Route>
        </>
    )
);
