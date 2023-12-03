import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import { CatsViewModel } from '../viewmodels/CatsViewModel';
import { AddCatForm } from './AddCatForm';

const CatsPage = () => {
  const [cats, setCats] = useState([]);
  const catsViewModel = new CatsViewModel();

  // Fetch cats on component mount
  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    const catsData = await catsViewModel.getCats();
    setCats(catsData);
  };

  // Handle adding a new cat
  const handleAddCat = async (catName, weight, birthdate, owner) => {
    await catsViewModel.addCat(catName, weight, birthdate, owner);
    fetchCats();
  };

  // Handle deleting a cat
  const handleDeleteCat = async (catId) => {
    await catsViewModel.deleteCat(catId);
    fetchCats(); // Refresh the list
  };

  // Render each cat
  const renderCat = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.catName}</Text>
      <Text style={styles.content}>Weight: {item.weight}</Text>
      <Text style={styles.content}>Born: {item.birthdate}</Text>
      <Button title="Delete Cat" onPress={() => handleDeleteCat(item._id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Form for adding a cat */}
      <AddCatForm onAddCat={handleAddCat} />

      {/* List of cats */}
      <FlatList
        data={cats}
        keyExtractor={(item, index) =>
          item._id ? item._id.toString() : index.toString()
        }
        renderItem={renderCat}
      />
    </View>
  );
};

// Styles for the page
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

export default CatsPage;
