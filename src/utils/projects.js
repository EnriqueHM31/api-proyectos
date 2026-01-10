// services/projects.service.js
export function getProjects() {
    return [
        {
            name: "Geolocalización IP",
            description: "Servicio para obtener ubicación desde IP",
            endpoints: [
                { method: "GET", path: "/ip/:ip", description: "Geolocalización por IP" }
            ]
        }
    ];
}
