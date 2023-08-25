import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Compass} from './src/components';

const App = () => {
  const [speed, setSpeed] = useState<any>(0);
  return (
    <View style={styles.container}>
      <Compass setSpeed={setSpeed} />
      <Text style={{fontSize: 40, color: 'white', marginTop: 20}}>{Math.floor(speed)} km/h</Text>
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(2,1,22,200)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
