import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useStore from '../../store/user.store';
import { User } from '../../interface/user.interface';

export default function SignUpScreen() {
    const [gameName, setGameName] = useState<string>(''); // Nom Riot
    const [tagLine, setTagLine] = useState<string>('');   // TagLine Riot
    const [region, setRegion] = useState<string>('europe'); // Région pour API Riot
    const [password, setPassword] = useState<string>('');

    const signup = useStore(state => state.signUp);
    const user = useStore(state => state.user) as User | null;

    const handleSignUp = async () => {
        try {
            const data = {
                username: gameName,
                tagLine: tagLine,
                region: region,
                password: password,
            }
            console.log(data)
            await signup(data);
            Alert.alert("Succès", "Inscription réussie !");
        } catch (error) {
            Alert.alert("Erreur", "Vérifiez vos informations.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>League of Push Up</Text>

            <TextInput
                style={styles.input}
                placeholder="Nom d'invocateur"
                value={gameName}
                onChangeText={setGameName}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="TagLine Riot (ex: EUW, KR1...)"
                value={tagLine}
                onChangeText={setTagLine}
                autoCapitalize="none"
            />

            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={region}
                    onValueChange={(value) => setRegion(value)}
                    style={styles.picker}
                    dropdownIconColor="#555"
                >
                    <Picker.Item label="Europe" value="europe" />
                    <Picker.Item label="Americas" value="americas" />
                    <Picker.Item label="Asia" value="asia" />
                    <Picker.Item label="Sea" value="sea" />
                </Picker>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="S'inscrire" onPress={handleSignUp} />

            {user && (
                <Text style={styles.userText}>
                    Utilisateur connecté : {user.username || user.email}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#222',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    userText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
    },
});
