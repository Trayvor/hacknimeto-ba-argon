import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ConfigurationDialogProps {
    open: boolean;
    setOpen: (state: boolean) => void;
    onWifiSubmit: (config: { ssid: string; password: string }) => Promise<void>;
    onMqttSubmit: (config: {
        client_id: string;
        server: string;
        port: string;
        username: string;
        password: string;
    }) => Promise<void>;
}

export function ConfigurationDialog(props: ConfigurationDialogProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [mqttConfig, setMqttConfig] = useState({
        client_id: '',
        server: '',
        port: '',
        username: '',
        password: '',
    });

    const [wifiConfig, setWifiConfig] = useState({
        ssid: '',
        password: '',
    });

    const handleMqttChange = (field: string, value: string) => {
        setMqttConfig((prevConfig) => ({ ...prevConfig, [field]: value }));
    };

    const handleWifiChange = (field: string, value: string) => {
        setWifiConfig((prevConfig) => ({ ...prevConfig, [field]: value }));
    };

    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogContent>
                <DialogTitle>Configuration</DialogTitle>
                <DialogDescription>Configure your WiFi and MQTT settings below.</DialogDescription>
                <Tabs orientation='vertical' defaultValue='mqtt'>
                    <TabsList className='w-full'>
                        <TabsTrigger value='mqtt' className='w-full'>
                            MQTT
                        </TabsTrigger>
                        <TabsTrigger value='wifi' className='w-full'>
                            WIFI
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='mqtt' className='pt-2'>
                        <div className='space-y-4'>
                            <div>
                                <Label htmlFor='mqtt-client-id'>Client ID</Label>
                                <Input
                                    id='mqtt-client-id'
                                    value={mqttConfig.client_id}
                                    onChange={(e) => handleMqttChange('client_id', e.target.value)}
                                    placeholder='Enter MQTT Client ID'
                                />
                            </div>
                            <div>
                                <Label htmlFor='mqtt-server'>Server</Label>
                                <Input
                                    id='mqtt-server'
                                    value={mqttConfig.server}
                                    onChange={(e) => handleMqttChange('server', e.target.value)}
                                    placeholder='Enter MQTT Server'
                                />
                            </div>
                            <div>
                                <Label htmlFor='mqtt-port'>Port</Label>
                                <Input
                                    id='mqtt-port'
                                    value={mqttConfig.port}
                                    onChange={(e) => handleMqttChange('port', e.target.value)}
                                    placeholder='Enter MQTT Port'
                                    type='number'
                                />
                            </div>
                            <div>
                                <Label htmlFor='mqtt-username'>Username</Label>
                                <Input
                                    id='mqtt-username'
                                    value={mqttConfig.username}
                                    onChange={(e) => handleMqttChange('username', e.target.value)}
                                    placeholder='Enter MQTT Username'
                                />
                            </div>
                            <div>
                                <Label htmlFor='mqtt-password'>Password</Label>
                                <Input
                                    id='mqtt-password'
                                    value={mqttConfig.password}
                                    onChange={(e) => handleMqttChange('password', e.target.value)}
                                    placeholder='Enter MQTT Password'
                                    type='password'
                                />
                            </div>
                            <Button
                                onClick={() => {
                                    props.onMqttSubmit(mqttConfig);
                                    setMqttConfig({
                                        client_id: '',
                                        server: '',
                                        port: '',
                                        username: '',
                                        password: '',
                                    });
                                }}
                            >
                                Save config
                            </Button>
                        </div>
                    </TabsContent>
                    <TabsContent value='wifi'>
                        <div className='space-y-4'>
                            <div>
                                <Label htmlFor='wifi-ssid'>SSID</Label>
                                <Input
                                    id='wifi-ssid'
                                    value={wifiConfig.ssid}
                                    onChange={(e) => handleWifiChange('ssid', e.target.value)}
                                    placeholder='Enter WiFi SSID'
                                />
                            </div>

                            <div>
                                <Label htmlFor='wifi-password'>Password</Label>
                                <div className='relative'>
                                    <Input
                                        id='wifi-password'
                                        value={wifiConfig.password}
                                        onChange={(e) => handleWifiChange('password', e.target.value)}
                                        placeholder='Enter WiFi Password'
                                        type={isPasswordVisible ? 'text' : 'password'}
                                    />
                                    <button
                                        type='button'
                                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                                        onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                                    >
                                        {isPasswordVisible ? (
                                            <EyeOff size={20} className='text-gray-500' />
                                        ) : (
                                            <Eye size={20} className='text-gray-500' />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button
                                onClick={() => {
                                    props.onWifiSubmit(wifiConfig);
                                    setWifiConfig({
                                        ssid: '',
                                        password: '',
                                    });
                                }}
                            >
                                Save config
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
