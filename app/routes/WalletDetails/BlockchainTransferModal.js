import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import taurosService from '../../../src/services/tauros.service';

const BlockchainTransferModal = ({
  coin,
  balances,
  handleBlockchainTransfer,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [NIP, setNIP] = useState('');

  const {available} = balances;

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enviar {coin}</Text>
            <Text style={styles.modalText}>Máximo: {available}</Text>
            <TextInput
              placeholder={'dirección'}
              onChangeText={setAddress}
              value={address}
            />
            <TextInput
              placeholder={'cantidad'}
              onChangeText={setQuantity}
              value={quantity}
            />
            <TextInput
              placeholder={'mensaje'}
              onChangeText={setMessage}
              value={message}
            />
            <TextInput
              placeholder={'NIP'}
              onChangeText={setNIP}
              secureTextEntry={true}
              value={NIP}
            />
            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                disabled={NIP.length !== 6}
                style={NIP.length !== 6 ? styles.button : styles.buttonClose}
                onPress={() => {
                  handleBlockchainTransfer(
                    coin,
                    address,
                    quantity,
                    message,
                    NIP,
                    navigation,
                  );
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Enviar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Enviar mediante blockchain</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#30596b',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#30596BFF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

BlockchainTransferModal.defaultProps = {
  handleBlockchainTransfer: taurosService.handleBlockchainTransfer,
};

export default BlockchainTransferModal;
