import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IndexPage = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login'); // Navigate back to the Login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laboratorium 7 - PAMW</Text>
      <Text style={styles.author}>Mateusz Czarnecki</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CatsPage')}
        >
          <Text style={styles.buttonText}>View Cats</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UsersPage')}
        >
          <Text style={styles.buttonText}>View Users</Text>
        </TouchableOpacity>
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: '#606060',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IndexPage;
