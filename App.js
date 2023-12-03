import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexPage from './views/IndexPage';
import CatsPage from './views/CatsPage';
import UsersPage from './views/UsersPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Index" component={IndexPage} />
        <Stack.Screen name="CatsPage" component={CatsPage} />
        <Stack.Screen name="UsersPage" component={UsersPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
