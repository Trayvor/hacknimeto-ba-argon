import { Header } from '@/components/header';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sidebar';

const Layout = () => {
    return (
        <div className='flex flex-col h-screen py-2'>
            <Header />
            <div className='flex gap-6'>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};

export { Layout };
