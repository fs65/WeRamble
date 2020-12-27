import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export default function Login({ navigation }) {

  const route = "http://192.168.1.96:80/api/test"
  const [data, setData] = useState("");

  async function fetchData() {
    fetch(`${route}`)
      .then(res => res.json())
      .then(rows => setData(rows[0].value))
      .catch(error => {
        console.error(error)
      })
  }
  useEffect(() => {
    fetchData()
  })

  return (
    <View>
      <Text style={styles.sectionTitle}>Login</Text>
      <Text>Username</Text>
      <TextInput></TextInput>
      <Text>Pasword</Text>
      <TextInput></TextInput>
      <Text >New User? Register here</Text>
      <Button
        title="Reg"
        onPress={() => {
          navigation.navigate('Register')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});
