import {Alert} from 'react-native';
import axios from 'axios';
import client from '../client';

class TaurosService {
  constructor() {}

  getWalletAddress(coin) {
    return client
      .get(`/api/v2/wallets/address/${coin}`)
      .then(response => {
        return response.data.payload.address;
      })
      .catch(e => {
        console.log(e.toJSON());
      });
  }

  getLastPrices() {
    return client
      .get('/api/v2/trading/ticker/')
      .then(response => {
        return response.data.data;
      })
      .catch(e => {
        console.log(e.toJSON());
      });
  }

  getWallets() {
    return client
      .get('/api/v1/data/listbalances/')
      .then(
        ({
          data: {
            data: {wallets},
          },
        }) => {
          return wallets;
        },
      )
      .catch(e => {
        console.log(e.toJSON());
        return [];
      });
  }

  login(email, password) {
    return client
      .post(
        '/api/v3/auth/signin/',
        {
          email,
          password,
          device_name: 'iphone 11',
          unique_device_id: 'TKY2048',
        },
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      )
      .then(({data: {payload}}) => {
        const {access} = payload;
        client.interceptors.request.use(function (config) {
          config.headers.Authorization = `JWT-V3 ${access}`;
          return config;
        });
        return {success: true};
      })
      .catch(e => {
        console.log(e.toJSON());
        return {success: false};
      });
  }

  handleBlockchainTransfer(
    coin,
    recipient,
    quantity,
    description,
    NIP,
    navigation,
  ) {
    client
      .post('/api/v3/wallets/inner-transfer/', {
        coin,
        recipient,
        amount: quantity,
        description,
        nip: NIP,
      })
      .then(response => {
        Alert.alert(
          'Exito',
          'Transferencia enviada exitosamente',
          [
            {
              text: 'OK',
              style: 'cancel',
              onPress: navigation.goBack(),
            },
          ],
          {
            cancelable: true,
          },
        );
      })
      .catch(error => {
        Alert.alert(
          'Error al enviar transferencia',
          error.toJSON().message,
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
          },
        );
      });
  }

  handleBlockchainTransfer(coin, address, quantity, message, NIP, navigation) {
    client
      .post('/api/v3/wallets/crypto-withdraw/', {
        coin,
        address,
        amount: quantity,
        message,
        nip: NIP,
      })
      .then(response => {
        Alert.alert(
          'Exito',
          'Transferencia enviada exitosamente',
          [
            {
              text: 'OK',
              style: 'cancel',
              onPress: navigation.goBack(),
            },
          ],
          {
            cancelable: true,
          },
        );
      })
      .catch(error => {
        Alert.alert(
          'Error al enviar transferencia',
          error.toJSON().message,
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
          },
        );
      });
  }
}

const taurosService = new TaurosService();
Object.freeze(taurosService);

export default taurosService;
