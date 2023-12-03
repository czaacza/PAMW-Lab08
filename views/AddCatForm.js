import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform } from 'react-native';

const AddCatForm = ({ onAddCat }) => {
  const [catName, setCatName] = useState('');
  const [weight, setWeight] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [owner, setOwner] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    onAddCat(
      catName,
      weight,
      new Date().toISOString(),
      '6548d5ab9f50a36a5915d4d7'
    );
    setCatName('');
    setWeight('');
    setBirthdate(new Date());
    setOwner('');
    setShowDatePicker(false);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Cat Name"
        value={catName}
        onChangeText={setCatName}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
      />

      <Button title="Add Cat" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
  },
});

export { AddCatForm };
