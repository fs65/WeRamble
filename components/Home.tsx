import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Button } from "react-native";
import { ip, port } from "../utils"

const route = `http://${ip}:${port}/api/feed`
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home({ navigation }) {

    const [gallery, setGallery] = useState([])

    function displayImages(data) {
        const rows = [];
        let key = 0;
        let i = -1;
        while (i < data.length) {
            let images = []
            for (let j = 0; j < 3; j++) {
                let image = data[++i];
                if (image) {
                    images.push(<Image key={key++} source={{ uri: image.uri }} style={styles.thumbnail}  />)
                }
            }
            let row =
                <View key={key++} style={styles.galleryRow}>{images}</View>
            rows.push(row);
        }
        setGallery(rows);
    }

    useEffect(() => {
        fetch(`${route}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    displayImages(data)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return (
        <View>
            <View style={styles.gallery}>{gallery}</View>
            <Button title="Camera" onPress={() => navigation.navigate("Camera")}></Button>

        </View>
    )
}

const styles = StyleSheet.create({
    thumbnail: {
        width: windowWidth / 3,
        height: windowHeight / 6,

    },
    galleryRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    gallery: {
        display: 'flex',
        flexDirection: 'column'
    }
})