export const mockServerGetData = (url: string): any => {
    switch (url) {
        case "area":
            return [
                {
                    deletable: 1,
                    filter: "Sleeping Room",
                    id: 1,
                    name: "Sleeping Room",
                },
                {
                    deletable: 1,
                    filter: "Living Room",
                    id: 2,
                    name: "Living Room",
                },
                {
                    deletable: 1,
                    filter: "Working Room",
                    id: 3,
                    name: "Working Room",
                },
                {
                    deletable: 1,
                    filter: "Kitchen",
                    id: 4,
                    name: "Kitchen",
                },
            ];
        case "ping":
            return "OK";
        case "periodic_task":
            return [
                {
                    active: 1,
                    hour: 10,
                    id: 0,
                    minute: 3,
                    name: "Periodic Task 1",
                    periodic: 1,
                    weekday: 1,
                    wirelessSocketId: 0,
                    wirelessSocketState: 1,
                },
            ];
        case "wireless_socket":
            return [
                {
                    area: "Sleeping Room",
                    code: "11010A",
                    deletable: 1,
                    description: "",
                    icon: "fas fa-lightbulb",
                    id: 0,
                    name: "Light Sleeping",
                    state: 0,
                    lastToggled: 1569438706,
                    group: "Couple"
                },
                {
                    area: "Living Room",
                    code: "11010B",
                    deletable: 1,
                    description: "",
                    icon: "fas fa-headphones",
                    id: 1,
                    name: "Sound TV",
                    state: 0,
                    lastToggled: 1569438706,
                    group: ""
                },
                {
                    area: "Living Room",
                    code: "11010C",
                    deletable: 1,
                    description: "",
                    icon: "fab fa-raspberry-pi",
                    id: 2,
                    name: "Raspberry Pi MediaCenter",
                    state: 0,
                    lastToggled: 1569438706,
                    group: ""
                },
                {
                    area: "Living Room",
                    code: "11010D",
                    deletable: 1,
                    description: "",
                    icon: "fas fa-lightbulb",
                    id: 3,
                    name: "Light Couch",
                    state: 1,
                    lastToggled: 1569438706,
                    group: ""
                },
                {
                    area: "Working Room",
                    code: "11010E",
                    deletable: 1,
                    description: "",
                    icon: "fas fa-hdd",
                    id: 4,
                    name: "Backup Drive",
                    state: 0,
                    lastToggled: 1569438706,
                    group: "Restricted"
                },
                {
                    area: "Kitchen",
                    code: "11011A",
                    deletable: 1,
                    description: "",
                    icon: "fas fa-tablet-alt",
                    id: 5,
                    name: "Media Mirror Kitchen",
                    state: 1,
                    lastToggled: 1569438706,
                    group: ""
                },
                {
                    area: "Living Room",
                    code: "11000A",
                    deletable: 1,
                    description: "",
                    icon: "fas fa-lightbulb",
                    id: 6,
                    name: "Light Ceiling",
                    state: 0,
                    lastToggled: 1569438706,
                    group: ""
                },
            ];
        default:
            return [];
    }
};

export const mockServerPutData = (inputNumber: number): number => ++inputNumber;

export const mockServerPostDeleteData = (): number => 0;
