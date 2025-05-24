import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ChevronRight } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from './ui/button';

const chartConfig = {
    value: {
        label: 'Room Metric',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

interface RoomCardProps {
    roomName: string;
    chartData: { time: string; value: number }[];
    percentageChange: string;
    onClick?: () => void;
}

export function RoomCard({ roomName, chartData, percentageChange, onClick }: RoomCardProps) {
    return (
        <Card className='bg-white shadow-lg rounded-lg max-w-md w-full'>
            <CardHeader>
                <CardTitle className='text-xl font-semibold'>{roomName}</CardTitle>

                <div className='flex w-full justify-between gap-1 text-sm pt-2'>
                    <div className='flex gap-2'>
                        <div className={`px-3 py-1 rounded-sm font-semibold text-indigo-500 bg-indigo-500/20`}>
                            {percentageChange}
                        </div>
                        <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                            For last 3 hours
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='p-0 w-full'>
                <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width='100%' height={200}>
                        <AreaChart data={chartData} margin={{ top: 10, bottom: 10 }}>
                            <CartesianGrid vertical={false} strokeDasharray='3 3' />
                            <XAxis
                                dataKey='time'
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value}
                                tick={{ textAnchor: 'end' }}
                            />
                            <YAxis hide />
                            <Tooltip content={<ChartTooltipContent indicator='line' />} />
                            <Area
                                dataKey='value'
                                type='monotone'
                                fill='rgb(99 102 241)'
                                fillOpacity={0.4}
                                stroke='rgb(99 102 241)'
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <Button className='w-full' onClick={onClick}>
                    See all stats
                    <ChevronRight />
                </Button>
            </CardFooter>
        </Card>
    );
}
