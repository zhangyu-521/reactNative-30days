import Constants from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const t = Constants.expoConfig;
  console.log(t);
  return (
    <View style={styles.container}>
      <Text>本地存储</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
