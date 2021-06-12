import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import client from '../../../src/client';
import QRCode from 'react-native-qrcode-svg';
import BlockchainTransferModal from './BlockchainTransferModal';
import TaurosTransferModal from './TaurosTransferModal';

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

function WalletDetails({getWalletAddress}) {
  const {params} = useRoute();
  const [walletAddress, setWalletAddress] = useState(undefined);

  const {coin, coin_name, coin_icon, balances} = params;

  useEffect(() => {
    getWalletAddress(coin).then(CoinWalletAddress => {
      setWalletAddress(CoinWalletAddress);
    });
  }, []);

  return (
    <View style={styles.AppContainer}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>{coin_name}</Text>
      <View
        style={{
          margin: '5%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        {walletAddress && <QRCode value={walletAddress} />}
        <Text>Recibir {coin_name}</Text>
      </View>
      <BlockchainTransferModal />
      <TaurosTransferModal />
    </View>
  );
}

WalletDetails.defaultProps = {
  getWalletAddress: coin => {
    return client
      .get(`/api/v2/wallets/address/${coin}`)
      .then(response => {
        return response.data.payload.address;
      })
      .catch(e => {
        console.log(e.toJSON());
      });
  },
};

export default WalletDetails;
