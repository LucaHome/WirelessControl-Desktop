export const mockServerGetData = (url: string): any => {
    switch (url) {
        case "area":
            return [
                {
                    id: 1,
                    filter: 'Sleeping Room',
                    name: 'Sleeping Room',
                    deletable: 1
                },
                {
                    id: 2,
                    filter: 'Living Room',
                    name: 'Living Room',
                    deletable: 1
                },
                {
                    id: 3,
                    filter: 'Working Room',
                    name: 'Working Room',
                    deletable: 1
                },
                {
                    id: 4,
                    filter: 'Kitchen',
                    name: 'Kitchen',
                    deletable: 1
                }
            ];
        case "ping":
            return "OK";
        case "periodic_task":
            return [
                {
                    id: 0,
                    name: "Periodic Task 1",
                    wirelessSocketId: 0,
                    wirelessSocketState: 1,
                    weekday: 1,
                    hour: 10,
                    minute: 25,
                    periodic: 1,
                    active: 1
                }
            ];
        case "wireless_socket":
            return [
                {
                    id: 0,
                    icon: 'fas fa-lightbulb',
                    name: 'Light Sleeping',
                    area: 'Sleeping Room',
                    code: '11010A',
                    state: 0,
                    description: '',
                    deletable: 1
                },
                {
                    id: 1,
                    icon: 'fas fa-headphones',
                    name: 'Sound TV',
                    area: 'Living Room',
                    code: '11010B',
                    state: 0,
                    description: '',
                    deletable: 1
                },
                {
                    id: 2,
                    icon: 'fab fa-raspberry-pi',
                    name: 'Raspberry Pi MediaCenter',
                    area: 'Living Room',
                    code: '11010C',
                    state: 0,
                    description: '',
                    deletable: 1
                },
                {
                    id: 3,
                    icon: 'fas fa-lightbulb',
                    name: 'Light Couch',
                    area: 'Living Room',
                    code: '11010D',
                    state: 1,
                    description: '',
                    deletable: 1
                },
                {
                    id: 4,
                    icon: 'fas fa-hdd',
                    name: 'Backup Drive',
                    area: 'Working Room',
                    code: '11010E',
                    state: 0,
                    description: '',
                    deletable: 1
                },
                {
                    id: 5,
                    icon: 'fas fa-tablet-alt',
                    name: 'Media Mirror Kitchen',
                    area: 'Kitchen',
                    code: '11011A',
                    state: 1,
                    description: '',
                    deletable: 1
                },
                {
                    id: 6,
                    icon: 'fas fa-lightbulb',
                    name: 'Light Ceiling',
                    area: 'Living Room',
                    code: '11000A',
                    state: 0,
                    description: '',
                    deletable: 1
                }
            ];
        default:
            return [];
    }
}

export const mockServerPutData = (inputNumber: number): any => {
    return ++inputNumber;
}

export const mockServerPostDeleteData = (): any => {
    return 0;
} 
