import React, { useState, useEffect } from 'react'
import { ip, port } from "../utils"
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  Image
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const route = `http://${ip}:${port}/api/login`

  function checkResponse(data) {
    console.log("DATA");
    if (data) {
      navigation.navigate("Home");
    }
    else { setError("Invalid Details") }
  }

  function login() {
    if (username.length > 0 && password.length > 0) {
      fetch(`${route}/${username}/${password}`)
        .then(res => res.json())
        .then(data => {
          checkResponse(data)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle} >Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={(v) => setUsername(v)} />
      <Text style={styles.sectionTitle} > Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(v) => setPassword(v)} />
      <Text style={styles.smallText}
        onPress={() => navigation.navigate('Register')}
      >New User? Register here</Text>
      <Button
        title="Login"
        onPress={() => login()}
      />
      <Text
        style={styles.sectionTitle}
      > {error}</Text>
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
  tinylogo: {
    width: 250,
    height: 200,
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
