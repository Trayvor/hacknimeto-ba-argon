import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Computer, FileText, LayoutDashboard } from 'lucide-react';

export function Sidebar() {
    const location = useLocation();

    const tabs = [
        {
            name: 'Dashboard',
            href: '/',
            icon: <LayoutDashboard className='h-5 w-5' />
        },
        {
            name: 'Cost',
            href: '/invoices',
            icon: <FileText className='h-5 w-5' />
        },
        {
            name: 'Devices',
            href: '/devices',
            icon: <Computer className='h-5 w-5' />
        }
    ];

    return (
        <div className='hidden border-r bg-muted/40 md:block w-80'>
            <div className='flex h-full max-h-screen flex-col gap-2'>
                <div className='flex-1'>
                    <nav className='grid items-start text-lg px-2 font-medium lg:px-4 pt-4'>
                        {tabs.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-3 transition-all hover:text-primary',
                                    location.pathname === tab.href
                                        ? 'bg-muted text-primary'
                                        : 'text-muted-foreground hover:bg-muted/50'
                                )}
                            >
                                {tab.icon}
                                {tab.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
