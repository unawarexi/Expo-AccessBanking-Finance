import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Install expo-linear-gradient
import * as Clipboard from 'expo-clipboard';

const AccountCard = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  const copyToClipboard = () => {
    const accountDetails = `Account Number: 0098 5737 8550 1337\nBalance: ${balanceVisible ? '$12,345.67' : '****'}`;
    Clipboard.setStringAsync(accountDetails);
    alert('Account details copied to clipboard!');
  };

  return (
    <LinearGradient
      colors={['#0f172a', '#0284c7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      {/* Account Details */}
      <View style={styles.infoContainer}>
        <View style={styles.leftSection}>
          <Text style={styles.accountNumber}>0098 5737 8550 1337</Text>
          <Text style={{flexDirection: "row",}}> <Text style={styles.accountType}>Savings Account - </Text>
          <Text style={styles.accountStatus}>Regular</Text></Text>
        </View>

        {/* Toggle Visibility */}
        <View style={styles.rightSection}>
          <TouchableOpacity onPress={toggleBalanceVisibility}>
            <Ionicons
              name={balanceVisible ? 'eye' : 'eye-off'}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceAmount}>
          {balanceVisible ? '$12,345.67' : '****'}
        </Text>
      </View>

      {/* Share Icon */}
      <View style={styles.shareContainer}>
        <TouchableOpacity onPress={copyToClipboard}>
          <FontAwesome name="share" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default AccountCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    padding: 16, // Reduced padding for a smaller height
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'column',
  },
  accountNumber: {
    fontSize: 16, // Increased account number size
    color: '#e2e8f0',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  accountType: {
    fontSize: 14,
    color: '#f1f5f9',
    marginBottom: 4,
  },
  accountStatus: {
    fontSize: 14,
    color: '#94a3b8',
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContainer: {
    marginTop: 16, // Reduced vertical spacing
  },
  balanceLabel: {
    fontSize: 16,
    color: '#f1f5f9',
  },
  balanceAmount: {
    fontSize: 24, // Slightly reduced balance font size
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  shareContainer: {
    marginTop: 8, // Reduced spacing between balance and share icon
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
