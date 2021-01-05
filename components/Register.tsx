import React, { useState, useEffect } from 'react'
import {ip, port} from "../utils"
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

export default function Registration({ navigation }) {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const route = `http://${ip}:${port}/api/register`
//
    function register() {

        fetch(`${route}/${email}/${username}/${password}`)
            .then(res => res.text())
            .catch(error => {
                console.error(error)
            })
        navigation.navigate('Home');
    }

    return (
        <View>
            <Text>E-Mail</Text>
            <TextInput
                onChangeText={(v) => setEmail(v)} />
            <Text>Username</Text>
            <TextInput
                onChangeText={(v) => setUsername(v)} />
            <Text>Pasword</Text>
            <TextInput
                onChangeText={(v) => setPassword(v)} />
            <Button
                title="Register"
                onPress={() => register()}
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
