import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export default function Login({ navigation }) {

  // const route = "http://192.168.1.96:80/api/test"
  // const [data, setData] = useState("");

  // async function fetchData() {
  //   fetch(`${route}`)
  //     .then(res => res.json())
  //     .then(rows => setData(rows[0].value))
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }
  // useEffect(() => {
  //   fetchData()
  // })
  function handlePress() {
    console.log("object");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle} >Username</Text>
      <TextInput style={styles.input}></TextInput>
      <Text style={styles.sectionTitle} > Password</Text>
      <TextInput style={styles.input}></TextInput>
      <Text style={styles.smallText}
        onPress={() => navigation.navigate('Register')}
      >New User? Register here</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: "center",
  },
  smallText: {
    textAlign: "center",
  },
  input: {
    borderColor: Colors.black,
    borderWidth: 1,
    width: "80%",
    alignSelf: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
});
