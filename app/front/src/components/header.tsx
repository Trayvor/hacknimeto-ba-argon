import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export function Header() {
    const buildings = [
        { id: '1', name: 'Building 1' },
        { id: '2', name: 'Sky Tower' },
        { id: '3', name: 'Riverfront Plaza' },
        { id: '4', name: 'Central Park' }
    ];

    const [selectedBuilding, setSelectedBuilding] = useState(buildings[0].id);

    return (
        <header className='bg-background border-b border-muted-foreground'>
            <div className='container mx-auto flex justify-between items-center py-4 px-6 my-0'>
                <div className='flex items-center gap-4'>
                    <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                        <SelectTrigger className='w-[235px] h-12 text-lg font-bold'>
                            <SelectValue placeholder='Select building' />
                        </SelectTrigger>
                        <SelectContent className='text-lg font-bold'>
                            {buildings.map((building) => (
                                <SelectItem key={building.id} value={building.id} className='text-lg font-bold h-12'>
                                    {building.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex items-center gap-4'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className='h-10 w-10 cursor-pointer'>
                                <AvatarImage src='https://github.com/shadcn.png' />
                                <AvatarFallback>PH</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer'>Settings</DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer text-red-500'>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
