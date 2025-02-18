import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import FeaturedComponent from "../Homescreens/Featured"
import PartialCrypto from '../Homescreens/PartialCrypto';

export default function HomeScreen() {
  const router  = useRouter();
  const services = [
    [
      {
        id: 1,
        name: 'Send Money',
        icon: 'send',
        color: '#0284c7',
        bg: '#e0f2fe',
        route: '/transfer',
      },
      {
        id: 2,
        name: 'Pay Bills',
        icon: 'receipt',
        color: '#16a34a',
        bg: '#dcfce7',
        route: '/bills',
      },
      {
        id: 3,
        name: 'Mobile Top-up',
        icon: 'phone-portrait',
        color: '#d97706',
        bg: '#fef3c7',
        route: '/topup',
      },
      {
        id: 4,
        name: 'International Transfers',
        icon: 'globe',
        color: '#0ea5e9',
        bg: '#e0f2fe',
        route: '/international-transfers',
      },
    ],
    [
      {
        id: 5,
        name: 'Investments',
        icon: 'trending-up',
        color: '#7c3aed',
        bg: '#f3e8ff',
        route: '/investments',
      },
      {
        id: 6,
        name: 'Loans',
        icon: 'cash',
        color: '#e11d48',
        bg: '#ffe4e6',
        route: '/loans',
      },
      {
        id: 7,
        name: 'Insurance',
        icon: 'shield-checkmark',
        color: '#0891b2',
        bg: '#cffafe',
        route: '/insurance',
      },
      {
        id: 8,
        name: 'Vouchers',
        icon: 'pricetag',
        color: '#f59e0b',
        bg: '#fef3c7',
        route: '/vouchers',
      },
    ],
    [
      {
        id: 9,
        name: 'Cards',
        icon: 'card',
        color: '#c2410c',
        bg: '#ffedd5',
        route: '/cards',
      },
      {
        id: 10,
        name: 'Savings',
        icon: 'wallet',
        color: '#4f46e5',
        bg: '#e0e7ff',
        route: '/savings',
      },
      {
        id: 11,
        name: 'Wallet Funding',
        icon: 'wallet',
        color: '#0f766e',
        bg: '#ccfbf1',
        route: '/wallet-funding',
      },
      {
        id: 12,
        name: 'Utilities',
        icon: 'flash',
        color: '#f43f5e',
        bg: '#fee2e2',
        route: '/utilities',
      },
    ],
    [
      {
        id: 13,
        name: 'Help & Support',
        icon: 'help-circle',
        color: '#3b82f6',
        bg: '#dbeafe',
        route: '/help-support',
      },
      {
        id: 14,
        name: 'Settings',
        icon: 'settings',
        color: '#6b7280',
        bg: '#f3f4f6',
        route: '/settings',
      },
      {
        id: 15,
        name: 'Notifications',
        icon: 'notifications',
        color: '#eab308',
        bg: '#fef9c3',
        route: '/notifications',
      },
      {
        id: 9,
        name: 'More',
        icon: 'grid',
        color: '#475569',
        bg: '#f1f5f9',
        route: "/Homescreens/MoreOptions",
      },
    ],
  ];
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.name}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color="#1f2937" />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={['#2563eb', '#1d4ed8']}
        style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$24,562.80</Text>
        <View style={styles.accountInfo}>
          <Text style={styles.accountNumber}>**** **** **** 1234</Text>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1640034471744-1b52cffe4454?w=200' }}
            style={styles.bankLogo}
          />
        </View>
      </LinearGradient>

     

      <View style={styles.servicesContainer}>
        <Text style={styles.sectionTitle}>Banking Services</Text>
        {services.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.serviceRow}>
            {row.map((service) => (
              <Link key={service.id} href={service.route as any} asChild>
                <TouchableOpacity style={styles.serviceItem}>
                  <View style={[styles.serviceIcon, { backgroundColor: service.bg }]}>
                    <Ionicons name={service.icon as any} size={20} color={service.color} />
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        ))}
      </View>
      <PartialCrypto />

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
            amount: 5000.00,
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
            <View style={[styles.transactionIcon, { backgroundColor: `${transaction.color}20` }]}>
              <Ionicons name={transaction.icon as any} size={24} color={transaction.color} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>{transaction.name}</Text>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
            </View>
            <Text style={[
              styles.transactionAmount,
              { color: transaction.amount > 0 ? '#22c55e' : '#ef4444' }
            ]}>
              {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FeaturedComponent />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 16,
    color: '#64748b',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceCard: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#e2e8f0',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  accountInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  accountNumber: {
    color: '#e2e8f0',
    fontSize: 16,
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  servicesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  serviceRow: {
    // flexDirection: 'row',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceItem: {
    alignItems: 'center',
    width: "25%",
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 9,
    color: '#64748b',
    textAlign: 'center',
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