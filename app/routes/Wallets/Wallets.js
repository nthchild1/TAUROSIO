import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import client from '../../../src/client';
import WalletItem from '../../../src/components/WalletItem/WalletItem';

const styles = StyleSheet.create({
  AppContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    paddingTop: '30%',
  },
  TextInput: {
    backgroundColor: '#4f4f4f',
    width: '90%',
    margin: '5%',
  },
  contentContainerStyle: {
    backgroundColor: '#eaeaea',
  },
  CardText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

function Wallets({getWallets, getLastPrices}) {
  const [isLoading, setIsLoading] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [prices, setPrices] = useState([]);
  const [combinedBalance, setCombinedBalance] = useState(0);

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

  useEffect(() => {
    const accumulatedbalance = wallets.reduce((accBalance, currentWallet) => {
      return accBalance + Number.parseFloat(currentWallet.balances.available);
    }, 0);

    setCombinedBalance(accumulatedbalance);
  }, [wallets]);

  return (
    <View style={styles.AppContainer}>
      {isLoading && <ActivityIndicator size={'large'} color={'green'} />}
      <View
        style={{
          backgroundColor: 'black',
          width: '80%',
          height: '20%',
          borderRadius: 20,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          margin: '5%',
        }}>
        <Text style={styles.CardText}>Total Combinado:</Text>
        <Text style={styles.CardText}>
          {'\n'}${combinedBalance} MXN
        </Text>
      </View>
      <View style={{width: '100%', paddingHorizontal: '5%'}}>
        <Text style={{fontSize: 20, textAlign: 'left'}}>Portafolio</Text>
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
