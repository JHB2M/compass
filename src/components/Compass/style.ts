import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontSize: 30,
  },
  iconContainer: {
    backgroundColor: 'black',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  vector: {
    position: 'absolute',
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default styles;
