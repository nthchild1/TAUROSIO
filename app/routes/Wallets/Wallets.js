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
    backgroundColor: 'white',
  },
  TextInput: {
    backgroundColor: '#4f4f4f',
    width: '90%',
    margin: '5%',
  },
});

function Wallets(props) {
  useEffect(() => {
    console.log(props);
    setIsLoading(true);
    props.getWallets().then(wallets => {
      setWallets(wallets);
      setIsLoading(false);
    });
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const [wallets, setWallets] = useState([]);

  console.log(wallets);

  return (
    <View style={styles.AppContainer}>
      {isLoading && <ActivityIndicator size={'large'} color={'green'} />}
      <FlatList
        data={wallets}
        renderItem={item => {
          console.log(item);
          return <WalletItem />;
        }}
      />
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
};

export default Wallets;
