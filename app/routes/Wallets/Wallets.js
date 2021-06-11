import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import client from '../../../src/client';
import WalletItem from '../../../src/components/WalletItem/WalletItem';

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  TextInput: {
    backgroundColor: '#4f4f4f',
    width: '90%',
    margin: '5%',
  },
  contentContainerStyle: {
    backgroundColor: 'pink',
  },
});

function Wallets({getWallets, getLastPrices}) {
  useEffect(() => {
    setIsLoading(true);
    getWallets().then(wallets => {
      setWallets(wallets);
      setIsLoading(false);
    });
    getLastPrices().then(prices => {
      setPrices(prices);
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const [wallets, setWallets] = useState([]);
  const [prices, setPrices] = useState([]);

  return (
    <View style={styles.AppContainer}>
      {isLoading && <ActivityIndicator size={'large'} color={'green'} />}
      {wallets.length > 0 && prices.length > 0 && (
        <FlatList
          data={wallets}
          renderItem={({item}) => (
            <WalletItem
              {...{
                item,
                prices,
              }}
              key={item.coin}
            />
          )}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
    </View>
  );
}

Wallets.defaultProps = {
  getWallets: () => {
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
  },
  getLastPrices: () => {
    return client
      .get('/api/v2/trading/ticker/')
      .then(response => {
        return response.data.data;
      })
      .catch(e => {
        console.log(e.toJSON());
      });
  },
};

export default Wallets;
