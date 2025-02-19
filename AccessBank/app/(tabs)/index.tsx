import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import FeaturedComponent from '../Homescreens/Featured';
import PartialCrypto from '../Homescreens/PartialCrypto';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeServices from '../Homescreens/HomeServices';

export default function HomeScreen() {
  const router = useRouter();

  const renderTransactions = () => (
    <View style={styles.transactionsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {[
        {
          id: 1,
          name: 'Netflix Subscription',
          amount: -15.99,
          date: 'Today',
          icon: 'play-circle',
          color: '#ef4444',
        },
        {
          id: 2,
          name: 'Salary Deposit',
          amount: 5000.0,
          date: 'Yesterday',
          icon: 'briefcase',
          color: '#22c55e',
        },
        {
          id: 3,
          name: 'Grocery Store',
          amount: -85.32,
          date: 'Yesterday',
          icon: 'cart',
          color: '#f59e0b',
        },
      ].map((transaction) => (
        <TouchableOpacity key={transaction.id} style={styles.transaction}>
          <View
            style={[
              styles.transactionIcon,
              { backgroundColor: `${transaction.color}20` },
            ]}
          >
            <Ionicons
              name={transaction.icon as any}
              size={24}
              color={transaction.color}
            />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionName}>{transaction.name}</Text>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
          </View>
          <Text
            style={[
              styles.transactionAmount,
              { color: transaction.amount > 0 ? '#22c55e' : '#ef4444' },
            ]}
          >
            {transaction.amount > 0 ? '+' : ''}
            {transaction.amount.toFixed(2)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <HomeServices />  
          <PartialCrypto />
          {renderTransactions()}
          <FeaturedComponent />
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },

  transactionsSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  seeAll: {
    fontSize: 16,
    color: '#2563eb',
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  transactionDate: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
});
