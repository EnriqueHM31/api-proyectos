import type { Project } from "../types/project.js";

export function getProjects(): Project[] {
    return [
        {
            name: "Geolocalización IP",
            description: "Servicio para obtener ubicación desde IP",
            endpoints: [
                { method: "GET", path: "/geolocalizacion/:ip", description: "Geolocalización por IP" }
            ]
        }
    ];
}
