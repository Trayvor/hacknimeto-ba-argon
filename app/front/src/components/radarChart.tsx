import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip } from 'recharts';
import { Skeleton } from './ui/skeleton';

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

interface RadarDataChartProps {
    data: Array<{ label: string; value: number; fullMark: number }> | null;
}

export function RadarDataChart({ data }: RadarDataChartProps) {
    const normalizeData = (data: Array<{ label: string; value: number; fullMark: number }>) =>
        data.map((item) => ({
            ...item,
            value: item.fullMark > 0 ? item.value / item.fullMark : 0,
        }));

    const normalizedData = data ? normalizeData(data) : null;

    if (normalizedData == null) return <RadarDataChartSkeleton />;
    return (
        <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[350px]'>
            <RadarChart cx='50%' cy='50%' outerRadius='72%' width={600} height={600} data={normalizedData}>
                <PolarGrid />
                <PolarAngleAxis dataKey='label' />
                <Radar name='Room Conditions' dataKey='value' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
                <Tooltip />
            </RadarChart>
        </ChartContainer>
    );
}

const generateSkeletonCircles = (count: number) => {
    const circles = [];
    for (let i = 0; i < count; i++) {
        const radius = 72 - i * 12;
        circles.push(
            <div
                key={i}
                className='absolute rounded-full border border-gray-300 opacity-40'
                style={{
                    width: `${radius * 2}%`,
                    height: `${radius * 2}%`,
                    top: `50%`,
                    left: `50%`,
                    transform: 'translate(-50%, -50%)',
                }}
            />
        );
    }
    return circles;
};

function RadarDataChartSkeleton() {
    return (
        <div className='mx-auto aspect-square max-h-[350px] relative'>
            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                {generateSkeletonCircles(5)}
            </div>

            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                <div className='absolute top-0 left-0 w-full h-full flex justify-center'>
                    <Skeleton className='w-1/2 h-1 rounded-full' style={{ position: 'absolute', top: '0%' }} />
                    <Skeleton className='w-1/2 h-1 rounded-full' style={{ position: 'absolute', bottom: '0%' }} />
                    <Skeleton
                        className='w-1/2 h-1 rounded-full rotate-45'
                        style={{ position: 'absolute', left: '50%', top: '50%' }}
                    />
                    <Skeleton
                        className='w-1/2 h-1 rounded-full rotate-135'
                        style={{ position: 'absolute', left: '50%', top: '50%' }}
                    />
                </div>
            </div>

            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                <Skeleton className='w-1/4 h-1/4 rounded-full bg-gray-300 opacity-50' />
            </div>
        </div>
    );
}
