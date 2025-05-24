import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, Cpu, Server, Settings, TriangleAlert } from 'lucide-react';

interface BackendServerCardProps {
    title: string;
    onEditConfig: () => void;
}

export function BackendServerCard({ title, onEditConfig }: BackendServerCardProps) {
    return (
        <Card className='max-w-sm w-full hover:shadow-lg transition-shadow flex flex-col'>
            <CardHeader>
                <div className='flex justify-between'>
                    <CardTitle className='flex items-center gap-2'>{title}</CardTitle>
                    <Switch checked disabled />
                </div>
            </CardHeader>
            <CardContent className='space-y-3 flex-1'>
                <div className='flex items-center text-sm text-gray-600'>
                    <CheckCircle size={16} className='mr-2 text-green-500' />
                    <span>Server Status: Running</span>
                </div>
                <div className='flex items-center text-sm text-gray-600'>
                    <Cpu size={16} className='mr-2 text-blue-500' />
                    <span>Database Service: Active</span>
                </div>
                <div className='flex items-center text-sm text-gray-600'>
                    <Server size={16} className='mr-2 text-orange-500' />
                    <span>Web Service: Active</span>
                </div>
                <div className='flex items-center text-sm text-gray-600'>
                    <TriangleAlert size={16} className='mr-2 text-red-500' />
                    <span>Cache Service: Inactive</span>
                </div>
            </CardContent>
            <CardFooter className='flex justify-end mt-auto'>
                <Button variant='outline' size='sm' onClick={onEditConfig} className='flex items-center gap-2'>
                    <Settings size={16} />
                    Edit Configuration
                </Button>
            </CardFooter>
        </Card>
    );
}
