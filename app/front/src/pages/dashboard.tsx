import { getCurrentData, getHistoryData, getInsightsData } from '@/api';
import { UtilityChart } from '@/components/monthChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Bolt, Droplets, Flame } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { BsCloudFog2 } from 'react-icons/bs';
import { RiSoundModuleFill } from 'react-icons/ri';
import { WiHumidity, WiThermometer } from 'react-icons/wi';
import { useParams } from 'react-router-dom';

interface RoomData {
    co2: string;
    humidity: string;
    light: string;
    name: string;
    noise: string;
    temperature: string;
    conditionsData: Array<{ label: string; value: number; fullMark: number }>;
    progressData: Array<{
        id: string;
        label: string;
        value: number;
        timeData: Array<{ label: string; value: string }>;
    }>;
}

export function Dashboard() {
    // const { name: roomName } = useParams();
    const { data: currentData, isLoading } = useQuery({
        queryFn: getCurrentData,
        queryKey: ['current']
    });
    const { data: insightsData } = useQuery({
        queryFn: getInsightsData,
        queryKey: ['insights']
    });
    const { data: historyData } = useQuery({
        queryFn: getHistoryData,
        queryKey: ['history']
    });

    // const [data, setData] = useState<RoomData | null>(null);
    // const [dateRange, setDateRange] = useState<DateRange | undefined>({
    //     from: new Date(new Date().setDate(new Date().getDate() - 2)),
    //     to: new Date()
    // });

    // useEffect(() => {
    //     if (dateRange == null) return;

    //     const formatDate = (date: Date | undefined) => {
    //         if (!date) return '';
    //         return date.toISOString().split('.')[0] + 'Z';
    //     };

    //     setIsLoading(true);

    //     // Mock data
    //     const mockRoomData: RoomData = {
    //         name: roomName || 'Caprica',
    //         co2: '800 ppm',
    //         humidity: '45%',
    //         light: '300 lux',
    //         noise: '42 dB',
    //         temperature: '22°C',
    //         conditionsData: [
    //             { label: 'Temperature', value: 75, fullMark: 100 },
    //             { label: 'CO2', value: 40, fullMark: 100 },
    //             { label: 'Light', value: 85, fullMark: 100 },
    //             { label: 'Noise', value: 30, fullMark: 100 },
    //             { label: 'Humidity', value: 60, fullMark: 100 }
    //         ],
    //         progressData: [
    //             {
    //                 id: '1',
    //                 label: 'Temperature',
    //                 value: 22,
    //                 timeData: [
    //                     { label: '9:00', value: '20°C' },
    //                     { label: '12:00', value: '22°C' },
    //                     { label: '15:00', value: '24°C' },
    //                     { label: '18:00', value: '21°C' }
    //                 ]
    //             },
    //             {
    //                 id: '2',
    //                 label: 'Humidity',
    //                 value: 45,
    //                 timeData: [
    //                     { label: '9:00', value: '40%' },
    //                     { label: '12:00', value: '42%' },
    //                     { label: '15:00', value: '48%' },
    //                     { label: '18:00', value: '45%' }
    //                 ]
    //             }
    //         ]
    //     };

    //     // Simulate API delay
    //     const timer = setTimeout(() => {
    //         const formattedRange = `${dateRange.from ? format(dateRange.from, 'dd.MM.yyyy') : ''} to ${
    //             dateRange.to ? format(dateRange.to, 'dd.MM.yyyy') : ''
    //         }`;

    //         setData(mockRoomData);
    //         setIsLoading(false);
    //     }, 800);

    //     return () => clearTimeout(timer);
    // }, [dateRange, roomName]);

    return (
        <div className='pr-6 w-full'>
            <div className='space-y-4 pt-6'>
                <UtilityChart data={historyData ?? []} />

                <Card>
                    <CardHeader>
                        <CardTitle>Energy Saving Suggestions</CardTitle>
                        <CardDescription>Based on your current consumption patterns</CardDescription>
                    </CardHeader>

                    <CardContent className='grid gap-4'>
                        {insightsData?.map((item) => (
                            <div className='flex items-center gap-4'>
                                <div className='flex-1'>
                                    <p className='font-medium'>Heating Optimization</p>
                                    <p className='text-sm text-muted-foreground'>{item}</p>
                                </div>
                                <Button variant='outline' size='sm'>
                                    View Details
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                {/* <div className='flex justify-between items-center mb-4'>
                    <div className='flex items-center gap-4'>
                        <div className='text-sm font-medium text-muted-foreground'>Select Time Period:</div>
                        <DatePickerWithRange
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                            placeholder='Select a date range'
                            className='my-4'
                        />
                    </div>
                    <Button className='px-6' onClick={handleExport}>
                        Export
                    </Button>
                </div> */}
                <div className='space-y-6'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-xl'>Live Data</CardTitle>
                            <CardDescription>Current environmental metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                                {currentData && !isLoading ? (
                                    <>
                                        <ElectricityCard value={currentData.electricity} label='Electricity' />
                                        <WaterCard value={currentData.water} label='Water' />
                                        <HeatingCard value={currentData.heating} label='Heating' />
                                    </>
                                ) : (
                                    Array(4)
                                        .fill(0)
                                        .map((_, i) => (
                                            <Card key={i}>
                                                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                                                    <Skeleton className='h-4 w-[100px]' />
                                                    <Skeleton className='h-6 w-6 rounded-full' />
                                                </CardHeader>
                                                <CardContent>
                                                    <Skeleton className='h-8 w-[80px] mb-1' />
                                                    <Skeleton className='h-3 w-[120px]' />
                                                </CardContent>
                                            </Card>
                                        ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

const ElectricityCard = ({ value, label }: { value: number; label: string }) => {
    let statusColor = 'text-green-500';
    let statusText = 'Normal usage';

    if (value > 400) statusColor = 'text-orange-500';
    if (value > 600) statusColor = 'text-red-500';
    if (value < 100) statusColor = 'text-blue-500';

    if (value > 600) statusText = 'High consumption';
    else if (value > 400) statusText = 'Moderate consumption';
    else if (value < 100) statusText = 'Low consumption';

    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{label}</CardTitle>
                <Bolt className='h-5 w-5 text-yellow-500' />
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${statusColor}`}>{value} kWh</div>
                <p className='text-xs text-muted-foreground'>{statusText}</p>
            </CardContent>
        </Card>
    );
};

// Component for Water Card
const WaterCard = ({ value, label }: { value: number; label: string }) => {
    let statusColor = 'text-green-500';
    let statusText = 'Normal usage';

    if (value > 1000) statusColor = 'text-orange-500';
    if (value > 1500) statusColor = 'text-red-500';
    if (value < 300) statusColor = 'text-blue-500';

    if (value > 1500) statusText = 'High consumption';
    else if (value > 1000) statusText = 'Moderate consumption';
    else if (value < 300) statusText = 'Low consumption';

    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{label}</CardTitle>
                <Droplets className='h-5 w-5 text-blue-500' />
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${statusColor}`}>{value} L</div>
                <p className='text-xs text-muted-foreground'>{statusText}</p>
            </CardContent>
        </Card>
    );
};

// Component for Heating Card
const HeatingCard = ({ value, label }: { value: number; label: string }) => {
    let statusColor = 'text-green-500';
    let statusText = 'Normal usage';

    if (value > 300) statusColor = 'text-orange-500';
    if (value > 500) statusColor = 'text-red-500';
    if (value < 100) statusColor = 'text-blue-500';

    if (value > 500) statusText = 'High consumption';
    else if (value > 300) statusText = 'Moderate consumption';
    else if (value < 100) statusText = 'Low consumption';

    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{label}</CardTitle>
                <Flame className='h-5 w-5 text-orange-500' />
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${statusColor}`}>{value} kWh</div>
                <p className='text-xs text-muted-foreground'>{statusText}</p>
            </CardContent>
        </Card>
    );
};
