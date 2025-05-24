import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface OverviewProps {
    data: Array<{
        id: string;
        label: string;
        value: number;
        timeData: Array<{ label: string; value: string }>;
    }> | null;
}

export function Overview({ data }: OverviewProps) {
    const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
    const [currentTimeData, setCurrentTimeData] = useState<{ label: string; value: string }[]>([]);

    const handleBarClick = (id: string) => {
        setSelectedDayId(id);
        const dayData = data?.find((item) => item.id === id)?.timeData || [];
        setCurrentTimeData(dayData);
    };

    function CustomSkeletonLineChart() {
        const randomHeights = Array.from({ length: 14 }, () => Math.floor(Math.random() * 300) + 50);

        return (
            <div className='w-full h-[350px] flex gap-2 px-16 items-end'>
                {randomHeights.map((height, index) => (
                    <Skeleton key={index} className='w-10' style={{ height: `${height}px` }} />
                ))}
            </div>
        );
    }

    if (!data) {
        return <CustomSkeletonLineChart />;
    }

    return (
        <ResponsiveContainer width='100%' height={350}>
            {selectedDayId ? (
                <LineChart data={currentTimeData} onClick={() => setSelectedDayId(null)}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='label' stroke='#888888' fontSize={12} tickLine={false} />
                    <YAxis stroke='#888888' fontSize={12} tickLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip
                        formatter={(value) => `${value}`}
                        labelFormatter={(label) => `Time: ${label}`}
                        contentStyle={{ fontSize: '12px', color: '#000' }}
                    />
                    <Line type='monotone' dataKey='value' stroke='#8884d8' />
                </LineChart>
            ) : (
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='label' stroke='#888888' fontSize={12} tickLine={false} />
                    <YAxis stroke='#888888' fontSize={12} tickLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip
                        formatter={(value) => `${value}/100`}
                        labelFormatter={(label) => `Day: ${label}`}
                        contentStyle={{ fontSize: '12px', color: '#000' }}
                    />
                    <Bar
                        dataKey='value'
                        fill='#8884d8'
                        radius={[4, 4, 0, 0]}
                        className='fill-primary'
                        onClick={(data) => handleBarClick(data.id)}
                    />
                </BarChart>
            )}
        </ResponsiveContainer>
    );
}
