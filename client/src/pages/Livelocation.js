import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const TrackingMap = () => {
  const [map, setMap] = useState(null);
  const [userMarker, setUserMarker] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0], 
        zoom: 12, 
      });

      setMap(map);
    };

    if (!map) {
      initializeMap();
    }

    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [map]);

  const updateMarker = (latitude, longitude) => {
    if (map && userMarker) {
      userMarker.setLngLat([longitude, latitude]);
    } else if (map) {
      const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
      setUserMarker(marker);
    }
  };

  const startTracking = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateMarker(latitude, longitude);
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <button onClick={startTracking}>Start Tracking</button>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default TrackingMap;
