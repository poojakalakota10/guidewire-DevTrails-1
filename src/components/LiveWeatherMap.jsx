import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FiMap, FiCloudDrizzle, FiSun, FiAlertTriangle } from 'react-icons/fi';
import { renderToStaticMarkup } from 'react-dom/server';

// Fix for default marker icons in Leaflet with webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// City coordinates map
const CITY_COORDS = {
  'Mumbai': [19.0760, 72.8777],
  'Bengaluru': [12.9716, 77.5946],
  'Hyderabad': [17.3850, 78.4867],
  'Delhi': [28.6139, 77.2090]
};

// Component to dynamically update map view when city changes
const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 11, { duration: 1.5 });
  }, [center, map]);
  return null;
};

// Custom DivIcons using react-icons rendered to HTML
const createCustomIcon = (iconElement, bgColor, textColor) => {
  const html = renderToStaticMarkup(
    <div className={`w-10 h-10 ${bgColor} ${textColor} rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce-slow`}>
      {iconElement}
    </div>
  );
  
  return L.divIcon({
    html,
    className: 'custom-weather-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

const LiveWeatherMap = ({ city, apiState }) => {
  const position = CITY_COORDS[city] || CITY_COORDS['Mumbai'];
  
  // Determine weather symbol logic based on apiState
  let WeatherIcon = <FiSun size={24} />;
  let iconBg = "bg-blue-500";
  let iconText = "text-white";
  let statusText = "Clear & Normal Traffic";
  let riskZoneColor = "transparent";

  if (apiState.weather.rainfall > 20) {
    WeatherIcon = <FiCloudDrizzle size={24} />;
    iconBg = "bg-slate-700";
    iconText = "text-blue-200";
    statusText = `Heavy Rain (${apiState.weather.rainfall}mm) - Risk Zone Active`;
    riskZoneColor = "#3b82f6"; // blue
  } else if (apiState.traffic === 'Gridlock' || apiState.traffic === 'Shutdown') {
    WeatherIcon = <FiAlertTriangle size={24} />;
    iconBg = "bg-red-500";
    iconText = "text-white";
    statusText = `Severe Traffic (${apiState.traffic}) - Routing Disrupted`;
    riskZoneColor = "#ef4444"; // red
  } else if (apiState.weather.temperature > 39) {
    WeatherIcon = <FiSun size={24} />;
    iconBg = "bg-orange-500";
    iconText = "text-yellow-100";
    statusText = `Extreme Heat (${apiState.weather.temperature}°C)`;
    riskZoneColor = "#f97316"; // orange
  }

  const customMarker = createCustomIcon(WeatherIcon, iconBg, iconText);

  return (
    <div className="glass p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 z-10">
        <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
          <FiMap className="text-indigo-600" /> Live Environment Geo-Map
        </h3>
        <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-600">
          Target: {city}
        </span>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 relative min-h-[250px] z-0">
        <MapContainer 
          center={position} 
          zoom={11} 
          scrollWheelZoom={false} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles-grayscale" // We can add custom css class for styling if desired
          />
          <MapUpdater center={position} />
          
          {riskZoneColor !== "transparent" && (
             <Circle 
               center={position} 
               pathOptions={{ fillColor: riskZoneColor, color: riskZoneColor, fillOpacity: 0.2 }} 
               radius={6000} 
             />
          )}

          <Marker position={position} icon={customMarker}>
            <Popup className="font-sans">
              <strong>{city}</strong><br/>
              {statusText}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="mt-4 text-xs text-slate-500 flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
         <FiMap className="mt-0.5 text-slate-400 shrink-0" />
         <p>Geospatial API mock actively monitoring designated delivery/transit zones for localized parametric hazard triggers.</p>
      </div>
    </div>
  );
};

export default LiveWeatherMap;
