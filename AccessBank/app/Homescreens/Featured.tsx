import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const FeaturedComponent = () => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();

  const beneficiaries = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mark Johnson' },
  ];

  const featuredItems = [
    { id: 1, title: 'Discount Campaign' },
    { id: 2, title: 'Holiday Savings' },
    { id: 3, title: 'Loan Offers' },
    { id: 4, title: 'Investment Plans' },
    { id: 5, title: 'Insurance Benefits' },
    { id: 6, title: 'New Bank Features' },
    { id: 7, title: 'Exclusive Rewards' },
    { id: 8, title: 'Partnership Discounts' },
  ];

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number; }; }; }) => {
    const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };

  const renderBeneficiary = ({ item }: { item: { id: number; name: string } }) => (
    <TouchableOpacity style={styles.beneficiaryButton}>
      <Text style={styles.beneficiaryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFeaturedItem = ({ item } : { item: { id: number; title: string } }) => (
    <View style={styles.featuredSlide}>
      <Text style={styles.featuredText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 1-Tap Payment Section */}
      <View style={styles.paymentSection}>
        <Text style={styles.sectionTitle}>1-Tap Payment</Text>
        <FlatList
          data={beneficiaries}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBeneficiary}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.beneficiaryList}
        />
      </View>

      {/* Featured Section */}
      <View style={styles.featuredSection}>
        <View style={styles.featuredHeader}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <TouchableOpacity onPress={() => router.push('./Homescreens/CampaignPage')}>
            <Text style={styles.moreButton}>More</Text>
          </TouchableOpacity>
        </View>

        {/* Slider */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.slider}
        >
          {featuredItems.map((item) => (
            <View key={item.id} style={[styles.featuredSlide, { width }]}>
              <Text style={styles.featuredText}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Slider Indicators */}
        <View style={styles.indicatorContainer}>
          {featuredItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { backgroundColor: activeSlide === index ? '#1E3A8A' : '#93C5FD' },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default FeaturedComponent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8fafc', 
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05, 
    shadowRadius: 30, 
    elevation: 6,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb', 
  },
  paymentSection: {
    marginBottom: 24,
  },
  beneficiaryList: {
    marginTop: 16,
  },
  beneficiaryButton: {
    backgroundColor: '#1E40AF', 
    padding: 10,
    borderRadius: 10,
    marginRight: 16,
    alignItems: 'center',
  },
  beneficiaryText: {
    color: 'white',
    fontSize: 14,
  },
  featuredSection: {
    marginTop: 16,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  moreButton: {
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
  slider: {
    marginBottom: 16,
  },
  featuredSlide: {
    backgroundColor: '#dbeafe', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
    marginRight: 16,
  },
  featuredText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#93C5FD', 
  },
});
