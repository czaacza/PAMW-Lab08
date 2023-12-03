import { User } from '../models/User';
import { fetchData } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class UsersViewModel {
  async getUsers() {
    const usersData = await fetchData('http://10.0.2.2:3000/api/v1/users');
    return usersData.map(
      (user) => new User(user._id, user.user_name, user.email)
    );
  }

  async addUser(userName, email, role, password) {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('token', token);
      if (!token) {
        // Handle the case where there is no token - user is not logged in or token is expired
        console.log('No token found');
        return;
      }

      const response = await fetch('http://10.0.2.2:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the token here
        },
        body: JSON.stringify({
          user_name: userName,
          email,
          role,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('You are not an admin');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  async deleteUser(userId) {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await fetch(
        `http://10.0.2.2:3000/api/v1/users/${userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );
      if (!response.ok) {
        throw new Error('You are not an admin');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}
