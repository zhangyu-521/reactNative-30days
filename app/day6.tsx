import Constants from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const config = Constants.expoConfig;
  return (
    <View style={styles.container}>
      <Text>当前环境是：{config?.extra?.env}</Text>
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
