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

export default function Registration({ navigation }) {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function register() {

        const data = {
            email: "email",
            username: "username",
            password: "password",
        }

        const route = "http://192.168.1.96:80/api/register"
        // const route = "http://192.168.1.96:80/api/test"

        const header = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }

        fetch(`${route}/${email}/${username}/${password}`)
            .then(res => res.text())
            .then(txt => console.log(txt))
            .catch(error => {
                console.error(error)
            })
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
