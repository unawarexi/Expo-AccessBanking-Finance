import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Banking Made Simple',
    description: 'Experience seamless banking with our intuitive mobile app',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&auto=format',
  },
  {
    id: '2',
    title: 'Secure Transactions',
    description: 'Bank with confidence knowing your money is protected',
    image: 'https://images.unsplash.com/photo-1626266061368-46a8632bac03?w=500&auto=format',
  },
  {
    id: '3',
    title: 'Smart Investments',
    description: 'Grow your wealth with our expert financial guidance',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=500&auto=format',
  },
];

// Define the type for the item
interface Item {
    image: string;
    title: string;
    description: string;
}
  
export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const handleScroll = (event: { nativeEvent: { layoutMeasurement: { width: any; }; contentOffset: { x: number; }; }; }) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);
  };

  return (
    <LinearGradient colors={['#0A0F24', '#1A1B4B']} style={styles.container}>
      <Animated.View 
        entering={FadeIn.duration(1000)}
        exiting={FadeOut}
        style={styles.content}
      >
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
        
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Link href="/Login" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    opacity: 1,
    width: 20,
  },
  buttonContainer: {
    padding: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#0A0F24',
  },
});