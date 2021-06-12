import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Login from './Login/Login';
import Wallets from './Wallets/Wallets';
import WalletDetails from './WalletDetails/WalletDetails';

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
        style={{width: 150, height: 30}}
        source={{
          uri: 'https://pbs.twimg.com/media/E3pgBjqX0AECFHb?format=png&name=small',
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
      <Screen name="Wallets" component={Wallets} />
      <Screen name="WalletDetails" component={WalletDetails} />
    </Navigator>
  );
}

export default AppNavigator;
