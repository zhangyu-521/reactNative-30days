import Utils from '@/utils';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

async function save(key: string, value: string) {
  console.log(key, value);
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}

export default function App() {
  const config = Constants.expoConfig;
  const [key, onChangeKey] = useState('key');
  const [value, onChangeValue] = useState('value');
  return (
    <View style={styles.container}>
      <Text>
        当前环境是：{config?.extra?.env}-{Utils.platform}
      </Text>
      {Utils.platform === 'web' ? (
        <Text>当前环境不支持expo-secure-store</Text>
      ) : (
        <View style={styles.container}>
          <Text style={styles.paragraph}>Save an item, and grab it later!</Text>
          <Button
            title="Save this key/value pair"
            onPress={() => {
              save(key, value);
              onChangeKey('key');
              onChangeValue('value');
            }}
          />
          <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
          <TextInput
            style={styles.textInput}
            onSubmitEditing={(event) => {
              getValueFor(event.nativeEvent.text);
            }}
            placeholder="Enter the key for the value you want to get"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 4,
  },
});
