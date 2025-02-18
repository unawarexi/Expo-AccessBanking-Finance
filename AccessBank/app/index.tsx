import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Image } from 'react-native';
import Images from '@/constants/ImageStrings';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Banking and Finance',
    description: 'Experience seamless banking and finance management.',
    image: Images.onboarding1,
  },
  {
    id: '2',
    title: 'Family Finance',
    description: 'Manage your family’s financial future with confidence.',
    image: Images.onboarding2,
  },
  {
    id: '3',
    title: 'Lifestyle & Investments',
    description: 'Invest smartly and live your dream lifestyle.',
    image: Images.onboarding3,
  },
  {
    id: '4',
    title: 'Banking & Crypto',
    description: 'Integrate cryptocurrency seamlessly with banking.',
    image: Images.onboarding4,
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: any }) => (
    <Animated.View
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(500)}
      style={styles.slide}
    >
      <Image source={ item.image } style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </Animated.View>
  );

  const handleScroll = (event: { nativeEvent: { layoutMeasurement: { width: number }, contentOffset: { x: number } } }) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);
  };

  return (

    <LinearGradient colors={["#0B2447", '#fff']} style={styles.container}>
      <View style={styles.content}>
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
      </View>

      <View style={styles.bottomContainer}>
      <Text style={styles.title}>Access Bank</Text>
        <Text style={styles.grayedText}>By clicking Get Started, you agree to our terms.</Text>
        <View style={styles.buttonContainer}>
          <Link href="/Login" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: "#0B2447",
    
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  image: {
    width: width * 1,  // Increase the width
    height: width * 0.8,  // Increase the height proportionally
    marginBottom: 20,
    alignSelf: 'center',  // Center the image horizontally
  },

  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#0A0F24',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0A0F24',
    opacity: 0.3,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    opacity: 1,
    width: 50,
    height: 8,
    backgroundColor: 'blue',
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: -2 }, // Top shadow
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  grayedText: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1A73E8',
    paddingVertical: 16,
    paddingHorizontal: 100,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
