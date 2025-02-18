import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import services from './HomeRoutes';

const HomeServices = () => {
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const bottomSheetRef = React.useRef<BottomSheet>(null);
    const router = useRouter();
    const snapPoints = ['40%'];
  
    const handleServicePress = (service: { name: string; route?: string | null }) => {
      if (service.name === 'Send Money') {
        setIsBottomSheetVisible(true);
        bottomSheetRef.current?.expand();
      } else if (service.route) {
        router.push(service.route as any);
      }
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetVisible(false);
      };
   

  const transferOptions = [
    { id: 1, label: 'Access-to-Access', icon: 'bank', route: '/access' },
    { id: 2, label: 'Access-to-Others', icon: 'users', route: '/others' },
    { id: 3, label: 'Access-to-International', icon: 'globe', route: '/international' },
    { id: 4, label: 'Access-to-Crypto', icon: 'bitcoin', route: '/crypto' },
  ];

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
            <TouchableOpacity
              key={service.id}
              style={styles.serviceItem}
              onPress={() => handleServicePress(service)}
            >
              <View style={[styles.serviceIcon, { backgroundColor: service.bg }]}>
                <Ionicons name={service.icon as any} size={20} color={service.color} />
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );

  const renderBottomSheet = () => (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={handleCloseBottomSheet}
      backdropComponent={BottomSheetBackdrop}
      style={styles.bottomSheet}
    >
      <View style={styles.content}>
        <TouchableOpacity onPress={handleCloseBottomSheet} style={styles.closeButton}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>

        {transferOptions.map((option) => (
          <TouchableOpacity key={option.id} style={styles.option} onPress={() => router.push(option.route as any)}>
            <FontAwesome name={option.icon as any} size={24} color="#0284c7" />
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheet>
  );
  
  return (
    <View>
       {renderHeader()}
          {renderBalanceCard()}
          {renderServices()}
          {isBottomSheetVisible && renderBottomSheet()}
    </View>
  )
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
 
  bottomSheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 50,
  },
  content: {
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
});


export default HomeServices