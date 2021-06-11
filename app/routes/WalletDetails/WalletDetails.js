import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import client from '../../../src/client';

function WalletDetails({getWalletAddress}) {
  const {params} = useRoute();
  const [walletAddress, setWalletAddress] = useState('');

  const {coin, coin_name, coin_icon, balances} = params;

  useEffect(() => {
    getWalletAddress(coin).then(CoinWalletAddress => {
      setWalletAddress(CoinWalletAddress);
    });
  }, []);

  return (
    <View>
      <Text>WalletDetails</Text>
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
