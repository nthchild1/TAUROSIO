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

const TaurosTransferModal = ({coin, balances, handleBlockchainTransfer}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [NIP, setNIP] = useState('');
  const {available} = balances;
  const navigation = useNavigation();

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
                  handleBlockchainTransfer(
                    coin,
                    recipient,
                    quantity,
                    description,
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
        <Text style={styles.textStyle}>Enviar mediante Tauros Transfer</Text>
      </Pressable>
    </View>
  );
};

TaurosTransferModal.defaultProps = {
  handleBlockchainTransfer: taurosService.handleBlockchainTransfer,
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
