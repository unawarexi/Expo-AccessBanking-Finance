import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CardsScreen() {
  const cards = [
    {
      id: 1,
      type: 'Visa Platinum',
      number: '**** **** **** 1234',
      expiry: '12/25',
      gradient: ['#2563eb', '#1d4ed8'],
    },
    {
      id: 2,
      type: 'Mastercard Gold',
      number: '**** **** **** 5678',
      expiry: '09/24',
      gradient: ['#7c3aed', '#6d28d9'],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cards</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}>
        {cards.map((card) => (
          <LinearGradient
            key={card.id}
            colors={card.gradient}
            style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardType}>{card.type}</Text>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1640034471744-1b52cffe4454?w=200' }}
                style={styles.bankLogo}
              />
            </View>
            <Text style={styles.cardNumber}>{card.number}</Text>
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>Expiry Date</Text>
                <Text style={styles.cardExpiry}>{card.expiry}</Text>
              </View>
              <Image
                source={{ uri: card.id === 1 ? 
                  'https://images.unsplash.com/photo-1588158074612-37ee7e776e44?w=100' : 
                  'https://images.unsplash.com/photo-1589758438368-0ad531db3366?w=100' 
                }}
                style={styles.cardBrand}
              />
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Card Actions</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action}>
            <View style={[styles.actionIcon, { backgroundColor: '#e0f2fe' }]}>
              <Ionicons name="lock-closed" size={24} color="#0284c7" />
            </View>
            <Text style={styles.actionText}>Lock Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <View style={[styles.actionIcon, { backgroundColor: '#fef3c7' }]}>
              <Ionicons name="settings" size={24} color="#d97706" />
            </View>
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <View style={[styles.actionIcon, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="eye" size={24} color="#16a34a" />
            </View>
            <Text style={styles.actionText}>Show PIN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Recent Card Transactions</Text>
        {[1, 2, 3].map((i) => (
          <TouchableOpacity key={i} style={styles.transaction}>
            <View style={styles.transactionIcon}>
              <Ionicons name="cart" size={24} color="#64748b" />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Shopping Mall</Text>
              <Text style={styles.transactionDate}>Today at 2:30 PM</Text>
            </View>
            <Text style={styles.transactionAmount}>-$89.99</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    padding: 20,
  },
  card: {
    width: 340,
    height: 200,
    borderRadius: 20,
    padding: 20,
    marginRight: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 40,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 30,
  },
  cardLabel: {
    color: '#e2e8f0',
    fontSize: 12,
  },
  cardExpiry: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  cardBrand: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
  actionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#64748b',
  },
  transactionsContainer: {
    padding: 20,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
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
    color: '#ef4444',
  },
});