import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import WalletItem from '../../../src/components/WalletItem/WalletItem';
import taurosService from '../../../src/services/tauros.service';

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
      const coinPrice = prices.find(
        price => price.market === `${currentWallet.coin}-MXN`,
      );
      if (!coinPrice) {
        return accBalance;
      }

      return (
        accBalance +
        Number.parseFloat(currentWallet.balances.available * coinPrice.last)
      );
    }, 0);

    setCombinedBalance(accumulatedbalance);
  }, [wallets, isLoading, prices]);

  return (
    <ScrollView
      contentContainerStyle={styles.AppContainer}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            getWallets();
            getLastPrices();
          }}
        />
      }>
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
    </ScrollView>
  );
}

Wallets.defaultProps = {
  getWallets: taurosService.getWallets,
  getLastPrices: taurosService.getLastPrices,
};

export default Wallets;
