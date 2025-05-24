import { Cloud, Droplet, Lightbulb, RotateCw, Settings, Thermometer, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';

interface RaspberryCardProps {
    variant: 'light' | 'environment';
    title: string;
    isPiOn: boolean;
    onEditConfig: () => void;
    onReload: () => void;
}

export function RaspberryCard({ variant, title, isPiOn, onEditConfig, onReload }: RaspberryCardProps) {
    return (
        <Card className='max-w-sm w-full hover:shadow-lg transition-shadow flex flex-col'>
            <CardHeader>
                <div className='flex justify-between'>
                    <CardTitle className='flex items-center gap-2'>{title}</CardTitle>
                    <Switch checked={isPiOn} disabled />
                </div>
            </CardHeader>
            <CardContent className='space-y-3 flex-1'>
                {variant === 'light' ? (
                    <>
                        <div className='flex items-center text-sm text-gray-600'>
                            <Lightbulb size={16} className='mr-2 text-yellow-500' />
                            <span>Light Sensor</span>
                        </div>
                        <div className='flex items-center text-sm text-gray-600'>
                            <Volume2 size={16} className='mr-2 text-blue-500' />
                            <span>Noise Sensor</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex items-center text-sm text-gray-600'>
                            <Thermometer size={16} className='mr-2 text-red-500' />
                            <span>Temperature Sensor</span>
                        </div>
                        <div className='flex items-center text-sm text-gray-600'>
                            <Droplet size={16} className='mr-2 text-blue-500' />
                            <span>Humidity Sensor</span>
                        </div>
                        <div className='flex items-center text-sm text-gray-600'>
                            <Cloud size={16} className='mr-2 text-green-500' />
                            <span>CO₂ Sensor</span>
                        </div>
                    </>
                )}
            </CardContent>
            <CardFooter className='flex justify-end mt-auto'>
                <div className='flex gap-2'>
                    <Button variant='outline' size='sm' onClick={onEditConfig} className='flex items-center gap-2'>
                        <Settings size={16} />
                        Edit Configuration
                    </Button>
                    <Button variant='outline' size='sm' onClick={onReload} className='flex items-center gap-2'>
                        <RotateCw size={16} />
                        Reload
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
