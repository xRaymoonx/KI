"use client"; // Falls Next.js verwendet wird

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic"; // Lazy Loading für bessere Ladezeiten
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { io } from "socket.io-client"; // WebSocket für Echtzeit-Updates
import MarkerClusterGroup from "react-leaflet-cluster";

// Dummy API oder WebSocket-Server (ersetzen durch echten Backend-Link)
const socket = io("https://dein-api-server.com");

const JobMap: React.FC = () => {
  const [jobs, setJobs] = useState<{ id: number; title: string; location: [number, number]; company: string }[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // Nutzer-Icon
  const userIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
  });

  // Echtzeit-Updates für neue Jobs per WebSocket
  useEffect(() => {
    socket.on("jobUpdate", (newJob) => {
      setJobs((prevJobs) => [...prevJobs, newJob]);
    });

    return () => {
      socket.off("jobUpdate");
    };
  }, []);

  // Nutzer-Standort abrufen (optimiert mit `watchPosition`)
  useEffect(() => {
    const geoSuccess = (position: GeolocationPosition) => {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    };

    const geoError = (error: GeolocationPositionError) => {
      console.error("Fehler beim Abrufen der Geolocation:", error.message);
    };

    const geoOptions = { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 };
    const watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Memoization für Job-Standorte (verhindert unnötige Re-Render)
  const jobMarkers = useMemo(
    () =>
      jobs.map((job) => (
        <Marker key={job.id} position={job.location}>
          <Popup>
            <strong>{job.title}</strong> <br />
            {job.company}
          </Popup>
        </Marker>
      )),
    [jobs]
  );

  return (
    <MapContainer center={[51.1657, 10.4515]} zoom={6} className="h-96 w-full rounded-lg shadow-lg">
      {/* TileLayer optimiert für Performance */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
        tileSize={256}
        zoomOffset={0}
      />

      {/* Nutzer-Standort als Marker */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>📍 Dein aktueller Standort</Popup>
        </Marker>
      )}

      {/* Cluster für bessere Performance bei vielen Jobs */}
      <MarkerClusterGroup>{jobMarkers}</MarkerClusterGroup>
    </MapContainer>
  );
};

export default JobMap;