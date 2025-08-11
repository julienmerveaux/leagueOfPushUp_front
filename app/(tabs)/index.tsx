import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import useStore from '../../store/user.store';
import { User } from '../../interface/user.interface';

export default function LoginScreen() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Accès direct à login et user
    const login = useStore(state => state.login);
    const user = useStore(state => state.user) as User | null;

    const handleLogin = async () => {
        try {
            console.log(username, password)
            await login({ username, password });
            Alert.alert("Succès", "Connecté avec succès !");
        } catch (error) {
            Alert.alert("Erreur", "Nom d'utilisateur ou mot de passe incorrect.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>League of Push Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom utilisateur riot game"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={{ backgroundColor: '#4a90e2', paddingVertical: 12, borderRadius: 8 }} onPress={handleLogin}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: '600' }}>Se connecter</Text>
            </TouchableOpacity>
            {user && <Text style={styles.userText}>Utilisateur connecté : {user.username || user.email}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa', // gris clair très doux
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 40,
        textAlign: 'center',
        color: '#222',
    },
    input: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 8,
        overflow: 'hidden', // arrondir le bouton
    },
    userText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 16,
        color: '#555',
    },
});
