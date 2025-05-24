import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UtilityHistoryEntry } from '@/api';

const chartConfig = {
    heating: {
        label: 'Heating',
        color: 'hsl(24, 100%, 50%)' // Orange
    },
    electricity: {
        label: 'Electricity',
        color: 'hsl(346.8, 77.2%, 70%)' // Rose
    },
    water: {
        label: 'Water',
        color: 'hsl(221.2, 83.2%, 53.3%)' // Blue
    }
} satisfies ChartConfig;

export function UtilityChart({ data }: { data: UtilityHistoryEntry[] }) {
    const [selectedYear, setSelectedYear] = useState('2025');

    const yearlyData = {
        '2025': [...data]
    };

    const chartData = yearlyData[selectedYear as keyof typeof yearlyData] || yearlyData['2025'];

    return (
        <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
                <div>
                    <CardTitle>Utility Consumption</CardTitle>
                    <CardDescription>Showing data for {selectedYear} (in EUR)</CardDescription>
                </div>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className='w-[120px]'>
                        <SelectValue placeholder='Year' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='2025'>2025</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey='month'
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar dataKey='heating' stackId='a' fill={chartConfig.heating.color} radius={[0, 0, 4, 4]} />
                            <Bar dataKey='electricity' stackId='a' fill={chartConfig.electricity.color} />
                            <Bar dataKey='water' stackId='a' fill={chartConfig.water.color} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ChartContainer>
                </ResponsiveContainer>
            </CardContent>
            <CardFooter className='flex-col items-start gap-2 text-sm'>
                <div className='flex gap-2 font-medium leading-none'>
                    Seasonal trends detected <TrendingUp className='h-4 w-4' />
                </div>
                <div className='leading-none text-muted-foreground'>
                    Comparing to previous year: {selectedYear !== '2023' ? '5% increase' : 'baseline year'}
                </div>
            </CardFooter>
        </Card>
    );
}
