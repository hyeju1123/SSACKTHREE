import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

type Props = {
  latitude: number;
  longitude: number;
};

export default function MapViewWrapper({latitude, longitude}: Props) {
  return (
    <MapView
      style={{flex: 1}}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.0011,
      }}
    />
  );
}
