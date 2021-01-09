import fs from 'react-native-fs';
import React from 'react'
import { ip, port, request } from '../utils'
import { View, Image, TouchableOpacity, StyleSheet, Dimensions, Text, ImageBase } from 'react-native'
import { isThisTypeNode } from 'typescript';

// const apiRoute = `http://${ip}:${port}/api/upload`
const apiRoute = `http://${ip}:${port}/api/upload`

export default function ImagePreview({ route }) {
    const { uri } = route.params

    async function upload() {
        console.log(uri);

        const data = new FormData();
        // data.append('name', 'avatar');
        // data.append('fileData', {
        //     uri: response.uri,
        //     type: response.type,
        //     name: response.fileName
        // });

        // const config = {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     body: fs.readFile(uri, 'utf8'),
        // };

        fs.readFile(uri, 'base64')
            .then(file => {
                console.log("client")
                fetch(apiRoute, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ file: file })
                });
            })
    }

    return (
        <View style={styles.container}>
            <Image style={styles.container} source={{ uri: uri }} />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={upload} style={styles.button}>
                    <Text style={{ fontSize: 14 }}> Upload </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'black',
        },
        button: {
            flex: 0,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 15,
            paddingHorizontal: 20,
            alignSelf: 'center',
            margin: 20,
        },
    }
)
