import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import client from '../../../src/client';
import {err} from 'react-native-svg/lib/typescript/xml';
import {useNavigation} from '@react-navigation/native';

const TaurosTransferModal = ({coin, balances}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [recipient, setRecipient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [NIP, setNIP] = useState('');
  const {available} = balances;
  const navigation = useNavigation();

  const handleBlockchainTransfer = () => {
    client
      .post('/api/v3/wallets/inner-transfer/', {
        coin,
        recipient,
        amount: quantity,
        description,
        nip: NIP,
      })
      .then(response => {
        Alert.alert(
          'Exito',
          'Transferencia enviada exitosamente',
          [
            {
              text: 'OK',
              style: 'cancel',
              onPress: navigation.goBack(),
            },
          ],
          {
            cancelable: true,
          },
        );
      })
      .catch(error => {
        Alert.alert(
          'Error al enviar transferencia',
          error.toJSON().message,
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
          },
        );
      });
  };

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
              placeholder={'Correo electrónico'}
              onChangeText={setRecipient}
              value={recipient}
            />
            <TextInput
              placeholder={'cantidad'}
              onChangeText={setQuantity}
              value={quantity}
            />
            <TextInput
              placeholder={'descripción'}
              onChangeText={setDescription}
              value={description}
            />
            <TextInput placeholder={'NIP'} onChangeText={setNIP} value={NIP} />
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
                  handleBlockchainTransfer();
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
        <Text style={styles.textStyle}>Enviar mediante Tauros Transfer</Text>
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
    backgroundColor: '#30596BFF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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

export default TaurosTransferModal;
