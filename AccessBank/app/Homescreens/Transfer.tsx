import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Transfer = () => {
  const router = useRouter();

  const majorTransferOptions = [
    { id: 1, label: 'Access-to-Access', icon: 'bank', route: '/Transactions/AccessToAccess', color: '#2563eb' },
    { id: 2, label: 'Access-to-Others', icon: 'users', route: '/Transactions/AccessToOthers', color: '#16a34a' },
    { id: 3, label: 'International Transfers', icon: 'globe', route: '/international', color: '#000080' },
    { id: 4, label: 'Access-SwiftPAY', icon: 'bolt', route: '/swiftpay', color: '#ef4444' },
    { id: 5, label: 'Access-to-crypto', icon: 'btc', route: '/swiftpay', color: '#F7931A' }
  ];

  const thirdPartyServices = [
    { id: 5, label: 'PayPal', icon: 'paypal', route: '/paypal', color: '#3b82f6' },
    { id: 6, label: 'Venmo', icon: 'money', route: '/venmo', color: '#10b981' },
    { id: 7, label: 'CashApp', icon: 'dollar', route: '/cashapp', color: '#1d4ed8' },
    { id: 8, label: 'Zelle', icon: 'credit-card', route: '/zelle', color: '#6b7280' },
    { id: 9, label: 'Google Pay', icon: 'google-wallet', route: '/googlepay', color: '#f43f5e' },
    { id: 10, label: 'Apple Pay', icon: 'apple', route: '/applepay', color: '#000000' }
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40, padding: 20 }}>
        <TouchableOpacity onPress={() => router.back()}>
          888
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Transfer Options</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        {/* Major Transfer Options */}
        {majorTransferOptions.map(option => (
          <TouchableOpacity key={option.id} style={styles.option} onPress={() => router.push(option.route as any)}>
            <View style={[styles.iconContainer, { backgroundColor: `${option.color}20` }]}>
              <FontAwesome name={option.icon as any} size={24} color={option.color} />
            </View>
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Divider */}
        <View style={styles.divider}>
          <Text style={styles.dividerText}>Third-Party Services</Text>
        </View>

        {/* Third-Party Payment Options */}
        {thirdPartyServices.map(service => (
          <TouchableOpacity key={service.id} style={styles.option} onPress={() => router.push(service.route as any)}>
            <View style={[styles.iconContainer, { backgroundColor: `${service.color}20` }]}>
              <FontAwesome name={service.icon as any} size={24} color={service.color} />
            </View>
            <Text style={styles.optionText}>{service.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginLeft: 15
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 12
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1f2937'
  },
  divider: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    alignItems: 'center'
  },
  dividerText: {
    position: 'absolute',
    top: -12,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#6b7280'
  }
});

export default Transfer;
