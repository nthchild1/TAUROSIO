import React, {useEffect, useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import BlockchainTransferModal from './BlockchainTransferModal';
import TaurosTransferModal from './TaurosTransferModal';
import taurosService from '../../../src/services/tauros.service';

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
  },
  QRContainer: {
    margin: '5%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
      <Image source={{uri: coin_icon}} style={{width: 50, height: 50}} />
      <View style={styles.QRContainer}>
        {walletAddress && <QRCode size={200} value={walletAddress} />}
        <Text style={{marginVertical: '5%', fontWeight: 'bold', fontSize: 15}}>
          Recibir {coin_name}
        </Text>
      </View>
      <BlockchainTransferModal {...{coin, balances}} />
      <TaurosTransferModal {...{coin, balances}} />
    </View>
  );
}

WalletDetails.defaultProps = {
  getWalletAddress: taurosService.getWalletAddress,
};

export default WalletDetails;
