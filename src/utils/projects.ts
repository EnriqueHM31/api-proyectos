import type { Project } from "../types/project.js";

export function getProjects(): Project[] {
    return [
        {
            name: "Geolocalización IP",
            description: "Servicio para obtener ubicación desde IP",
            endpoints: [
                { method: "GET", path: "/geolocalizacion/:ip", description: "Geolocalización por IP" }
            ]
        },
        {
            name: "Pronóstico del Clima",
            description: "Servicio para obtener clima y pronóstico por ciudad y días",
            endpoints: [
              {
                method: "GET",
                path: "/clima?q={lugar}&days={days}",
                description: "Obtiene el clima según el lugar y la cantidad de días"
              }
            ]
          }
          
    ];
}
