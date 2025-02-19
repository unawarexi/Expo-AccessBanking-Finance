import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import services from './HomeRoutes';
import { Link } from 'expo-router';

const HomeServices = () => {
  
  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.name}>John Doe</Text>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <Ionicons name="notifications" size={24} color="#1f2937" />
      </TouchableOpacity>
    </View>
  );

  const renderBalanceCard = () => (
    <LinearGradient colors={['#2563eb', '#1d4ed8']} style={styles.balanceCard}>
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
  );

  const renderServices = () => (
    <View style={styles.servicesContainer}>
      <Text style={styles.sectionTitle}>Banking Services</Text>
      {services.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.serviceRow}>
          {row.map((service) => (
            <Link key={service.id} href={service.route as any ?? '#'} asChild>
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
  );

  return (
    <View>
      {renderHeader()}
      {renderBalanceCard()}
      {renderServices()}
    </View>
  );
};

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
    flexDirection: 'row',
    marginBottom: 20,
  },
  serviceItem: {
    alignItems: 'center',
    width: '25%',
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
 
});


export default HomeServices