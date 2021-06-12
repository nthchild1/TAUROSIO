import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import client from '../../client';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    margin: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

function WalletItem({item, prices}) {
  const {coin, coin_name, coin_icon, balances} = item;
  const navigation = useNavigation();

  const coinPrice = prices.find(price => price.market === `${item.coin}-MXN`);

  console.log(balances);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('WalletDetails', {...item});
      }}>
      <View>
        <Image source={{uri: coin_icon}} style={{width: 20, height: 20}} />
        <Text>{coin}</Text>
      </View>
      <View>
        <Text>{coin_name}</Text>
        {coinPrice?.last && <Text>Precio: {coinPrice?.last} MXN</Text>}
        <Text>Balance: {balances.available}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default WalletItem;
