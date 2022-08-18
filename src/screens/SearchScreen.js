import React, { useState } from 'react'
import { SafeAreaView, ew, Text, TextInput, StyleSheet, View, Image } from 'react-native'
import {
    getFirestore,
    collection,
    query,
    orderBy,
    startAt,
    endAt,
    getDocs
} from 'firebase/firestore';
import Heart from '../bottom-bar-icons/heart.svg'

const db = getFirestore();

const SearchResult = (props) => {
    const { age, displayName, id, job, photoURL, timestamp } = props;

    return (
        <View style={styles.result}>
            <Image
                style={styles.image}
                source={{ uri: photoURL }}
            />
            <Text
                style={styles.userName}
            >{displayName}</Text>
        </View>
    )
}

const SearchScreen = () => {
    const [text, onChangeText] = useState("");
    const [results, setResults] = useState([]);

    const handleTextUpdate = async (text) => {
        onChangeText(text);
        if (!text) {
            setResults([]);
            return;
        };
        const q = query(
            collection(db, 'users'),
            orderBy('displayName'),
            startAt(text),
            endAt(text + "\uf8ff")
        );

        const snap = await getDocs(q);
        const docs = snap.docs.map(d => d.data());
        setResults(docs);
    };

    const renderResults = () => {
        return results.map((result, idx) => {
            return <SearchResult
                {...result}
                key={idx}
            />
        })
    }

    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={handleTextUpdate}
                value={text}
                placeholder={"Search for a user..."}
            />
            {renderResults()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    result: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userName: {
        fontSize: 18,
        marginLeft: 10,
    }
});

export default SearchScreen
