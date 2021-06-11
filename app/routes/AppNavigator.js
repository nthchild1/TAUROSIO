import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Login from './Login/Login';

const {Navigator, Screen} = createStackNavigator();

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#353535',
  },
  headerTitleStyle: {
    color: 'white',
  },
});

const HeaderTitle = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }}>
      <Image
        style={{width: 25, height: 25}}
        source={{
          uri: 'https://avatars.githubusercontent.com/u/36422238?s=280&v=4',
        }}
      />
    </TouchableOpacity>
  );
};

function AppNavigator() {
  const {headerStyle, headerTitleStyle} = styles;

  return (
    <Navigator
      screenOptions={{
        headerStyle,
        headerTitleStyle,
        headerTitle: HeaderTitle,
      }}>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}

export default AppNavigator;
