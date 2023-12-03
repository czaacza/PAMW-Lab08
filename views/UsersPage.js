import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { UsersViewModel } from '../viewmodels/UsersViewModel';
import { AddUserForm } from './AddUserForm';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  const usersViewModel = new UsersViewModel();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersData = await usersViewModel.getUsers();
    setUsers(usersData);
  };

  const handleAddUser = async (userName, email, role, password) => {
    await usersViewModel.addUser(userName, email, role, password);
    fetchUsers();
  };

  const handleDeleteUser = async (userId) => {
    await usersViewModel.deleteUser(userId);
    fetchUsers();
  };

  const renderUser = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.userName}</Text>
      <Text style={styles.content}>Email: {item.email}</Text>
      <Button title="Delete User" onPress={() => handleDeleteUser(item._id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <AddUserForm onAddUser={handleAddUser} />
      <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderUser}
      />
    </View>
  );
};

// You can use the same styles as in CatsPage.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 5,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default UsersPage;
