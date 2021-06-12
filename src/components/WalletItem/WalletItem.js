import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: '10%',
    padding: '5%',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '5%',
  },
});

function WalletItem({item, prices}) {
  const {coin, coin_icon, balances} = item;
  const navigation = useNavigation();
  const coinPrice = prices.find(price => price.market === `${item.coin}-MXN`);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('WalletDetails', {...item});
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image source={{uri: coin_icon}} style={{width: 20, height: 20}} />
        <Text>{coin}</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        {coinPrice?.last && <Text>Precio: {coinPrice?.last} MXN</Text>}
        <Text>Balance: {balances.available}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default WalletItem;
