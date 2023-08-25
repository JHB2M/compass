import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import styles from './style';
import VECTORS from '../../constants/DATA'
import {Text, View, StyleSheet, PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';



const Compass = ({setSpeed}: {setSpeed: Dispatch<SetStateAction<any>>}) => {
  const rotate = useSharedValue(0);
  const [heading, setHeading] = useState<any>(0);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonPositive: 'Allow',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotate.value}deg`}],
    };
  });

  useEffect(() => {
    rotate.value = withTiming(heading, {duration: 250});
  }, [heading]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchLocation();
    }, 250);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchLocation = async () => {
    requestLocationPermission().then(response => {
      if (response) {
        Geolocation.getCurrentPosition(
          position => {
            const {speed, heading} = position.coords;
            setSpeed(speed);
            setHeading(heading);
          },
          error => {
            console.warn(error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <View style={styles.iconContainer}>
        <Icon
          style={{opacity: 0.2}}
          name="compass-rose"
          size={190}
          color="gray"
        />
      </View>
      {VECTORS.map(x => {
        return <Text style={[styles.vector, x.style]}>{x.name}</Text>;
      })}
    </Animated.View>
  );
};

export default Compass;
