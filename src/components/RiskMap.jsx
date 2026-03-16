import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  FiMapPin,
  FiSun,
  FiWind,
  FiCloudRain,
  FiZap,
} from "react-icons/fi";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DISRUPTION_ZONES = [
  {
    id: 1,
    name: "Hitech City",
    position: [17.4435, 78.3772],
    disruption: "Heavy Rain",
    severity: "high",
    rainfall: 45,
    temperature: 28,
    aqi: 180,
    description: "Heavy monsoon flooding affecting delivery routes",
    zoneColor: "#3b82f6",
    icon: "rain",
  },
  {
    id: 2,
    name: "Madhapur",
    position: [17.4486, 78.3908],
    disruption: "Severe Pollution",
    severity: "high",
    rainfall: 5,
    temperature: 35,
    aqi: 320,
    description: "Severe air quality impacting rider health",
    zoneColor: "#ef4444",
    icon: "pollution",
  },
  {
    id: 3,
    name: "Gachibowli",
    position: [17.4401, 78.3489],
    disruption: "Extreme Heat",
    severity: "medium",
    rainfall: 0,
    temperature: 42,
    aqi: 250,
    description: "Extreme temperatures affecting delivery capacity",
    zoneColor: "#f97316",
    icon: "heat",
  },
  {
    id: 4,
    name: "Kukatpally",
    position: [17.4948, 78.3996],
    disruption: "Traffic Shutdown",
    severity: "high",
    rainfall: 15,
    temperature: 30,
    aqi: 200,
    description: "Major traffic disruption due to protests",
    zoneColor: "#8b5cf6",
    icon: "traffic",
  },
  {
    id: 5,
    name: "Jubilee Hills",
    position: [17.4324, 78.407],
    disruption: "Normal",
    severity: "low",
    rainfall: 2,
    temperature: 32,
    aqi: 120,
    description: "Normal operations",
    zoneColor: "#10b981",
    icon: "safe",
  },
];

const createDisruptionIcon = (zone) => {
  const color =
    zone.icon === "rain"
      ? "blue"
      : zone.icon === "pollution"
      ? "red"
      : zone.icon === "heat"
      ? "orange"
      : zone.icon === "traffic"
      ? "purple"
      : "green";

  return L.divIcon({
    html: `<div style="
        background:${zone.zoneColor};
        width:40px;
        height:40px;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        color:white;
        font-weight:bold;
        box-shadow:0 0 10px ${zone.zoneColor};
      ">⚠</div>`,
    className: "",
    iconSize: [40, 40],
  });
};

const RiskMap = ({ activeDisruptions = [] }) => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [realTimeData, setRealTimeData] = useState({});

  const hyderabadCenter = [17.385, 78.4867];

  useEffect(() => {
    const updateData = () => {
      const updated = {};
      DISRUPTION_ZONES.forEach((z) => {
        updated[z.id] = {
          ...z,
          rainfall: z.rainfall + Math.floor(Math.random() * 10),
          temperature: z.temperature + Math.floor(Math.random() * 2),
          aqi: z.aqi + Math.floor(Math.random() * 10),
          lastUpdate: new Date().toLocaleTimeString(),
        };
      });
      setRealTimeData(updated);
    };

    updateData();
    const interval = setInterval(updateData, 10000);
    return () => clearInterval(interval);
  }, []);

  const updatedZones = DISRUPTION_ZONES.map((zone) => {
    const real = realTimeData[zone.id] || zone;

    return {
      ...real,
      severity: activeDisruptions.includes(zone.disruption)
        ? "high"
        : zone.severity,
    };
  });

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">

      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FiMapPin /> Hyderabad Risk Zones
      </h3>

      <div className="h-96 rounded-lg overflow-hidden">

        <MapContainer
          center={hyderabadCenter}
          zoom={11}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {updatedZones.map((zone) => (
            <React.Fragment key={zone.id}>
              {zone.severity === "high" && (
                <Circle
                  center={zone.position}
                  pathOptions={{
                    fillColor: zone.zoneColor,
                    color: zone.zoneColor,
                    fillOpacity: 0.2,
                  }}
                  radius={4000}
                />
              )}

              <Marker
                position={zone.position}
                icon={createDisruptionIcon(zone)}
                eventHandlers={{
                  click: () => setSelectedZone(zone),
                }}
              >
                <Popup>

                  <h4 className="font-bold">{zone.name}</h4>
                  <p>{zone.disruption}</p>

                  <p>Rainfall: {zone.rainfall} mm</p>
                  <p>Temperature: {zone.temperature}°C</p>
                  <p>AQI: {zone.aqi}</p>

                  <p className="text-sm text-gray-500">
                    AI detected disruption in this zone.
                  </p>

                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>

      </div>

      {selectedZone && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-bold">{selectedZone.name}</h4>
          <p>{selectedZone.description}</p>

          <div className="grid grid-cols-3 gap-4 mt-3">

            <div>
              <div className="text-xs">Rainfall</div>
              <div className="font-bold">{selectedZone.rainfall} mm</div>
            </div>

            <div>
              <div className="text-xs">Temperature</div>
              <div className="font-bold">{selectedZone.temperature}°C</div>
            </div>

            <div>
              <div className="text-xs">AQI</div>
              <div className="font-bold">{selectedZone.aqi}</div>
            </div>

          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">

        <h4 className="font-bold text-blue-800">
          AI-Powered Real-time Monitoring
        </h4>

        <p className="text-sm text-blue-700 mt-2">
          GigShield AI continuously monitors delivery zones in Hyderabad.
          When weather or pollution thresholds are exceeded, the system
          automatically triggers insurance protection for gig workers.
        </p>

      </div>

    </div>
  );
};

export default RiskMap;