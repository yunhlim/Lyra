import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

export interface MapContextType {
  userLocationInfo: null | string;
  userRegionCode: null | string;
  userLatitude: number;
  userLongitude: number;
  mapLatitude: number;
  mapLongitude: number;
  mapZoomLv: number;
  pheeds: any[];
  setUserLocationInfo: Dispatch<SetStateAction<string | null>>;
  setUserRegionCode: Dispatch<SetStateAction<string | null>>;
  setUserLatitude: Dispatch<SetStateAction<number>>;
  setUserLongitude: Dispatch<SetStateAction<number>>;
  setMapLatitude: Dispatch<SetStateAction<number>>;
  setMapLongitude: Dispatch<SetStateAction<number>>;
  setMapZoomLv: Dispatch<SetStateAction<number>>;
  setPheeds: Dispatch<SetStateAction<any[]>>;
}

export const MapContext = createContext<MapContextType>({
  userLocationInfo: null,
  userRegionCode: null,
  userLatitude: 0,
  userLongitude: 0,
  mapLatitude: 0,
  mapLongitude: 0,
  mapZoomLv: 17,
  pheeds: [],
  setUserLocationInfo: () => {},
  setUserRegionCode: () => {},
  setUserLatitude: () => {},
  setUserLongitude: () => {},
  setMapLatitude: () => {},
  setMapLongitude: () => {},
  setMapZoomLv: () => {},
  setPheeds: () => {},
});

export const MapProvider = ({children}: {children: ReactNode}) => {
  const [userLocationInfo, setUserLocationInfo] = useState<string | null>(null);
  const [userRegionCode, setUserRegionCode] = useState<string | null>(null);
  const [userLatitude, setUserLatitude] = useState<number>(0);
  const [userLongitude, setUserLongitude] = useState<number>(0);
  const [mapLatitude, setMapLatitude] = useState<number>(0);
  const [mapLongitude, setMapLongitude] = useState<number>(0);
  const [mapZoomLv, setMapZoomLv] = useState<number>(17);
  const [pheeds, setPheeds] = useState<any[]>([]);

  const mapValue = {
    userLocationInfo,
    userRegionCode,
    userLatitude,
    userLongitude,
    mapLatitude,
    mapLongitude,
    mapZoomLv,
    pheeds,
    setUserLocationInfo,
    setUserRegionCode,
    setUserLatitude,
    setUserLongitude,
    setMapLatitude,
    setMapLongitude,
    setMapZoomLv,
    setPheeds,
  };

  return <MapContext.Provider value={mapValue}>{children}</MapContext.Provider>;
};
