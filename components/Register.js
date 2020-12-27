import React, { useState, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export default function Register() {

  return (
    <View>
      <Text style={styles.sectionTitle}>Register</Text>
      <Text>E-Mail</Text>
      <TextInput></TextInput>
      <Text>Username</Text>
      <TextInput></TextInput>
      <Text>Pasword</Text>
      <TextInput></TextInput>
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
