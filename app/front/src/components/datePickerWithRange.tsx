import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface DatePickerWithRangeProps {
    dateRange: DateRange | undefined;
    setDateRange: (date: DateRange | undefined) => void;
    placeholder?: string;
    buttonClassName?: string;
    calendarClassName?: string;
    className?: string;
}

export function DatePickerWithRange({
    dateRange,
    setDateRange,
    className,
    placeholder = 'Pick a date',
    buttonClassName,
    calendarClassName,
}: DatePickerWithRangeProps) {
    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id='date'
                        variant={'outline'}
                        className={cn(
                            'w-[300px] justify-start text-left font-normal',
                            !dateRange && 'text-muted-foreground',
                            buttonClassName
                        )}
                    >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {dateRange?.from ? (
                            dateRange.to ? (
                                <>
                                    {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(dateRange.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={cn('w-auto p-0', calendarClassName)} align='start'>
                    <Calendar
                        initialFocus
                        mode='range'
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
