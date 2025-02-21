import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn, SlideInUp, SlideOutDown } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';

interface ConfirmTransactionProps {
  swiftCode: string;
  ibanOrRouting: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  description: string;
  onClose: () => void;
}

const ConfirmTransaction: React.FC<ConfirmTransactionProps> = ({ swiftCode, ibanOrRouting, bankName, accountNumber, accountName, amount, description, onClose }) => {
  const handleTransfer = () => {
    console.log('Transfer Successful');
    onClose();
  };

  return (
    <Animated.View entering={SlideInUp.springify().mass(0.7)} exiting={SlideOutDown.springify().mass(0.7)} style={styles.container}>
      {/* Close Button */}
      {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <FontAwesome name="close" size={20} color="#fff" />
      </TouchableOpacity> */}

      <Text style={styles.title}>Confirm Transaction</Text>
      <Animated.View entering={FadeIn.delay(200)}>
        <Text style={styles.detail}>
          Swift Code: <Text style={styles.info}>{swiftCode}</Text>
        </Text>
        <Text style={styles.detail}>
          Iban / Routing Number: <Text style={[styles.info, ibanOrRouting === '' && { color: '#9ca3af' }]}>{ibanOrRouting === '' ? '(Optional)' : ibanOrRouting}</Text>
        </Text>
        <Text style={styles.detail}>
          Bank: <Text style={styles.info}>{bankName}</Text>
        </Text>
        <Text style={styles.detail}>
          Account Number: <Text style={styles.info}>{accountNumber}</Text>
        </Text>
        <Text style={styles.detail}>
          Account Name: <Text style={styles.info}>{accountName}</Text>
        </Text>
        <Text style={styles.detail}>
          Amount: <Text style={styles.info}>${amount}</Text>
        </Text>
        <Text style={styles.detail}>
          Description: <Text style={styles.info}>{description}</Text>
        </Text>
      </Animated.View>

      <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
        <Text style={styles.transferButtonText}>Transfer</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    container: { padding: 20, position: 'relative', margin: 10 }, 
    title: { fontSize: 22, fontWeight: '600', marginBottom: 20, color: '#333', textAlign: 'center' },
    detail: { fontSize: 16, marginBottom: 8, color: '#555' }, 
    info: { color: '#007bff', fontWeight: '800', fontSize: 18 }, 
    transferButton: { backgroundColor: '#007bff', paddingVertical: 14, alignItems: 'center', borderRadius: 30, marginTop: 30, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, marginBottom: 30 }, 
    transferButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' }, 
    closeButton: { position: 'absolute', top: 10, right: 10, backgroundColor: '#ff4d4f', borderRadius: 50, padding: 8 }
});

export default ConfirmTransaction;
