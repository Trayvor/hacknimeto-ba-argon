import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import ProgressBar from 'react-customizable-progressbar';
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from '../components/ui/select'
import { set } from 'date-fns';
import OfficeTable from '@/components/officeTable';

export function Devices() {
const buildings = [
        { id: '1', name: 'Flor 0' },    
        { id: '2', name: 'Flor 1' },
        { id: '3', name: 'Flor 2' },
        { id: '4', name: 'Flor 3' },
        { id: '5', name: 'Flor 4' }
    ];
    const offices = [
        { id: '1', name: 'Office A' },    
        { id: '2', name: 'Office B' },
        { id: '3', name: 'Office C' },
        { id: '4', name: 'Office D' },
        { id: '5', name: 'Office E' }
    ];
  const [closeOpen, setCloseOpen] = useState("Close");
    const [selectedOffices, setSelectedOffices] = useState(offices[0].id);
    const [selectedBuilding, setSelectedBuilding] = useState(buildings[0].id);
    const [isOpen, setIsOpen] = useState(false);
  const [grad, setGrad] = useState(25); // <== теперь grad — это состояние
const handleCloseOpen = () => {
    setCloseOpen(prev => prev == "Close" ? "Open" : "Close");
  };

  const handlePlusClick = () => {
    setGrad(prev => prev < 100 ? prev + 1 : 0);
  };

  const handleMinusClick = () => {
    setGrad(prev => prev > 0 ? prev - 1 : 0);
  };

  return (
    <div className='gap-4 flex flex-col pt-4'>
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
        <Select value={selectedOffices} onValueChange={setSelectedOffices}>
            <SelectTrigger className='w-[235px] h-12 text-lg font-bold'>
                <SelectValue placeholder='Select building' />
            </SelectTrigger>
            <SelectContent className='text-lg font-bold'>
                {offices.map((office) => (
                    <SelectItem key={office.id} value={office.id} className='text-lg font-bold h-12'>
                        {office.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={() => setIsOpen(prev => !prev)}>
            Show table
        </Button>

        {isOpen ? 
            <div
  className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  onClick={() => setIsOpen(false)} // закрытие по клику вне
>
  <div
    className="bg-white p-6 rounded-lg shadow-lg relative min-w-[300px] max-h-[80vh] overflow-y-auto"
    onClick={(e) => e.stopPropagation()} // блокируем всплытие клика
  >
    <button
      className="absolute top-2 right-2 text-gray-500 hover:text-black"
      onClick={() => setIsOpen(false)}
    >
      ✕
    </button>
    <OfficeTable />
  </div>
</div>

         : null }
        
        </div>
        <div className='flex gap-4'>
        <div 
  style={{
    position: 'relative',
    width: '200px',
    height: '300px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px'
  }}
>
    Heating Control
  <ProgressBar
    progress={grad}
    radius={75}
    strokeColor="green"
    steps={0}
    cut={120}
    rotate={150}
    counterClockwise={true}
  >
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <p className="text-sm text-gray-500" style={{ marginBottom: '4px' }}>Target</p>
      <div
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#555',
          marginBottom: '4px'
        }}
      >
        {grad}°
      </div>
    </div>
  </ProgressBar>

  <div className="flex gap-[10px]"
  style={{
    position: 'absolute',
        top: '65%',
        
  }}>
    <Button variant="outline" size="sm" onClick={handleMinusClick}>
      <Minus />
    </Button>
    <Button variant="outline" size="sm" onClick={handlePlusClick}>
      <Plus />
    </Button>
  </div>
  <div
        style={{
          fontSize: '12px',
          color: '#444',
        }}
      >
        THR316 TH Origin
    </div>
    <div
        style={{
          fontSize: '12px',
          color: 'green',
        }}
      >
        Active
    </div>
</div>
<div
  style={{
    position: 'relative',
    width: '200px',
    height: '300px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px'
  }}
>
    <span style={{
    position: 'absolute',
        top: '2%',
        
  }}>Temp & Humidity</span>
  
<span  style={{
    position: 'absolute',
        top: '45%',
        color: 'Orange',
        fontSize: '20px',
        fontWeight: 'bold'
  }}>22.5°/55%</span>
  <div style={{
    top: '83%',
    position: 'absolute',
    textAlign: 'center',
  }}>
  <div
        style={{
          fontSize: '12px',
          color: '#444',
          marginBottom: '10px'
        }}
      >
        Sonoff SNZB-02D
    </div>
    <div
        style={{
          fontSize: '12px',
          color: 'orange',
        }}
      >
        Warning
    </div>
    </div>
</div>
<div
  style={{
    position: 'relative',
    width: '200px',
    height: '300px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px'
  }}
>
    <span style={{
    position: 'absolute',
        top: '2%',
        
  }}>Air Quality</span>
  
<span  style={{
    position: 'absolute',
        top: '45%',
        color: 'Orange',
        fontSize: '20px',
        fontWeight: 'bold'
  }}
  >PM2.5: 35 μg/m³</span>
  <div style={{
    top: '83%',
    position: 'absolute',
    textAlign: 'center',
  }}>
  <div
        style={{
          fontSize: '12px',
          color: '#444',
          marginBottom: '10px'
        }}
      >
        TUYA PM25
    </div>
    <div
        style={{
          fontSize: '12px',
          color: 'orange',
        }}
      >
        Warning
    </div>
    </div>
</div>
<div
  style={{
    position: 'relative',
    width: '200px',
    height: '300px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px'
  }}
>
    <span style={{
    position: 'absolute',
        top: '2%',
        
  }}>Window Opener</span>
  
<span  style={{
    position: 'absolute',
        top: '35%',
        fontSize: '20px',
        fontWeight: 'bold'
  }}>{closeOpen}</span>
  <div style={{
    top: '80%',
    position: 'absolute',
    textAlign: 'center',
  }}>
    <div
  style={{
    position: 'absolute',
    bottom: '150%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }}>
    <Button variant="outline" size="sm" onClick={handleCloseOpen}>
      Open/Close
    </Button>
    </div>

  <div
        style={{
            
          fontSize: '12px',
          color: '#444',
          marginBottom: '10px'
        }}
      >
        ZBMINI Switch
    </div>
    <div
        style={{
          fontSize: '12px',
          color: 'green',
        }}
      >
        Active
    </div>
    </div>
</div>

</div>
    </div>
    
  );
}
