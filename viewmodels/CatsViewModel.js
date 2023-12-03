import { Cat } from '../models/Cat';
import { fetchData } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class CatsViewModel {
  async getCats() {
    const catsData = await fetchData('http://10.0.2.2:3000/api/v1/cats');
    return catsData.map(
      (cat) =>
        new Cat(cat._id, cat.cat_name, cat.weight, cat.birthdate, cat.owner)
    );
  }

  async addCat(catName, weight, birthdate, owner) {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await fetch('http://10.0.2.2:3000/api/v1/cats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cat_name: catName, weight, birthdate, owner }),
      });

      if (!response.ok) {
        throw new Error('You are not an admin');
      }
    } catch (error) {
      console.error('Error adding cat:', error);
    }
  }

  async deleteCat(catId) {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await fetch(
        `http://10.0.2.2:3000/api/v1/cats/${catId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('You are not an admin');
      }
    } catch (error) {
      console.error('Error deleting cat:', error);
    }
  }
}
