import React, {useState, useContext} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import LocationSearch from '../../components/Map/LocationSearch';
import MapStyle from '../../components/Map/MapStyle';
import Button from '../../components/Utils/Button';
import Colors from '../../constants/Colors';
import {AuthContext} from '../../store/auth-context';
import {useNavigation} from '@react-navigation/native';
import {
  PheedStackNavigationProps,
  PheedStackScreens,
} from '../../constants/types';
import EncryptedStorage from 'react-native-encrypted-storage';
import {sendUserLocation} from '../../api/profile';
import {MapContext} from '../../store/map-context';

const deviceWidth = Dimensions.get('window').width;

const FirstTownSearchScreen = () => {
  const navigation = useNavigation<PheedStackNavigationProps>();
  const {userId, walletAddress} = useContext(AuthContext);
  const {
    userLocationInfo,
    userRegionCode,
    userLatitude,
    userLongitude,
    setUserLatitude,
    setUserLongitude,
    setUserLocationInfo,
    setUserRegionCode,
  } = useContext(MapContext);
  const [location, setLocation] = useState<Region>({
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
    latitude: 0,
    longitude: 0,
  });

  const getTownName = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`,
      {
        method: 'GET',
        headers: {
          Authorization: `KakaoAK ${Config.KAKAO_REST_API_KEY}`,
        },
      },
    );
    const result = await response.json();
    setUserRegionCode(result.documents[0].code);
    setUserLocationInfo(result.documents[0].region_3depth_name);
  };

  const pressHandler = async () => {
    try {
      const response = await sendUserLocation({
        userId: userId,
        latitude: location.latitude,
        longitude: location.longitude,
        regionCode: userRegionCode,
        regionName: userLocationInfo,
      });
      console.log(response);
      if (response.status === 'OK') {
        setUserLatitude(location.latitude);
        setUserLongitude(location.longitude);
        setUserRegionCode(userRegionCode);
        setUserLocationInfo(userLocationInfo);

        await EncryptedStorage.setItem('latitude', `${location.latitude}`);
        await EncryptedStorage.setItem('longitude', `${location.longitude}`);
        // await EncryptedStorage.setItem('townName', `${townName}`);
        if (!walletAddress) {
          navigation.navigate(PheedStackScreens.WalletCreation);
        } else {
          navigation.navigate(PheedStackScreens.MainPheed);
        }
      } else {
        alert('다시 확인해주세요.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.body}>
        <View style={{flex: 1}}>
          <Text style={styles.title}>동네 설정</Text>
          <LocationSearch
            onPress={(data, detail) => {
              const {
                geometry: {
                  location: {lat, lng},
                },
              } = detail!;
              setLocation(prev => ({
                ...prev,
                latitude: lat,
                longitude: lng,
              }));
              getTownName(lat, lng);
            }}
          />
          {location && (
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              customMapStyle={MapStyle}
              region={
                location.latitude && location.longitude ? location : undefined
              }>
              <Marker coordinate={location}>
                <Icon name="map-marker" size={20} color="white" />
              </Marker>
            </MapView>
          )}
          {location.latitude != 0 ? (
            <View style={{height: '25%', bottom: 0}}>
              <Text style={styles.name}>{userLocationInfo}</Text>
              <Button
                title="선택한 위치로 설정"
                btnSize="large"
                textSize="medium"
                isGradient={false}
                isOutlined={false}
                onPress={pressHandler}
                customStyle={styles.button}
              />
            </View>
          ) : null}
        </View>
      </View>
    </>
  );
};

export default FirstTownSearchScreen;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.black500,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'NanumSquareRoundR',
    fontSize: 18,
    color: Colors.gray300,
    margin: 20,
  },
  location: {
    position: 'absolute',
    width: '90%',
    borderBottomWidth: 0,
  },
  map: {
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: -1,
  },
  button: {
    marginTop: 20,
    width: deviceWidth * 0.8,
  },
  name: {
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
    marginTop: 20,
  },
});
