import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import taurosService from '../../../src/services/tauros.service';

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3c3c3c',
  },
  TextInput: {
    backgroundColor: '#4f4f4f',
    width: '90%',
    margin: '5%',
  },
});

function Login({handleLogin, navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.AppContainer}>
      <Text style={{color: 'white'}}>TAUROS</Text>
      {isLoading && <ActivityIndicator size={'large'} color={'green'} />}
      <TextInput
        value={email}
        placeholder={'email'}
        style={styles.TextInput}
        onChangeText={setEmail}
      />
      <TextInput
        value={password}
        placeholder={'password'}
        style={styles.TextInput}
        onChangeText={setPassword}
      />
      <Button
        title={'Iniciar Sesión'}
        onPress={async () => {
          setIsLoading(true);
          const {success} = await handleLogin(email, password);
          setIsLoading(false);
          if (success) {
            navigation.navigate('Wallets');
          }
        }}
      />
    </View>
  );
}

Login.defaultProps = {
  handleLogin: taurosService.login,
};

export default Login;
