import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Event } from '../redux/reducers';
mapboxgl.accessToken = 'pk.eyJ1IjoicmljYXJkbzQ1NDUiLCJhIjoiY2xneDkxOHBmMDM4MzNxbzA3bnRoaXJ6NiJ9.uV6zwcd4tJlyDfjJYFtkNg';

interface MapComponentProps {
  events: Event[];
  height?: string;
  width?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  events, 
  height = '400px', 
  width = '100%' 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    console.log('Inicializando mapa con token:', mapboxgl.accessToken);

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-99.1332, 19.4326],
      zoom: 10
    });

    map.current.on('load', () => {
      console.log('Mapa cargado correctamente');
    });

    map.current.on('error', (e) => {
      console.error('Error en el mapa:', e);
    });

    map.current.on('styledata', () => {
      console.log('Estilo del mapa cargado');
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());

    events.forEach(event => {
      if (event.location) {
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.style.cssText = `
          background-color: #1976d2;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; color: #1976d2;">${event.name}</h3>
            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Fecha:</strong> ${event.date}</p>
            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Hora:</strong> ${event.time}</p>
            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Ubicación:</strong> ${event.location.address}</p>
            <p style="margin: 0; font-size: 12px; color: #666;">${event.description}</p>
          </div>
        `);

        new mapboxgl.Marker(markerElement)
          .setLngLat([event.location.longitude, event.location.latitude])
          .setPopup(popup)
          .addTo(map.current!);
      }
    });

    if (events.some(event => event.location)) {
      const bounds = new mapboxgl.LngLatBounds();
      
      events.forEach(event => {
        if (event.location) {
          bounds.extend([event.location.longitude, event.location.latitude]);
        }
      });

      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }, [events]);

  return (
    <div 
      ref={mapContainer} 
      style={{ 
        height, 
        width,
        borderRadius: '8px',
        overflow: 'hidden'
      }} 
    />
  );
};

export default MapComponent;
