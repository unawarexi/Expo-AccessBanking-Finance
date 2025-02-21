import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons'; // For up/down chart arrows
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds
import { useRouter } from 'expo-router';

const PartialCrypto = () => {
  interface Coin {
    id: number;
    name: string;
    quote: {
      USD: {
        price: number;
        percent_change_24h: number;
      };
    };
  }

  const [coins, setCoins] = useState<Coin[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch the coin data from CoinMarketCap API
    axios
      .get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': '3d601765-66c9-4801-b916-8d810027088c'
        }
      })
      .then(response => setCoins(response.data.data.slice(0, 8))) // Show 8 coins on home
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    const priceChange = item.quote.USD.percent_change_24h;
    const priceColor = priceChange < 0 ? '#FF6B6B' : '#4CAF50';

    return (
      <View style={styles.coinContainer}>
        <Image
          source={{
            uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`
          }}
          style={styles.coinImage}
        />
        <View style={styles.coinDetails}>
          <Text style={styles.coinName}>{item.name}</Text>
          <Text style={[styles.coinPrice, { color: priceColor }]}>${item.quote.USD.price.toFixed(2)}</Text>
          <View style={styles.priceChange}>
            <FontAwesome
              name={priceChange < 0 ? 'arrow-down' : 'arrow-up'}
              size={12} // Smaller icon size
              color={priceColor}
            />
            <Text style={[styles.priceChangeText, { color: priceColor }]}>{priceChange.toFixed(2)}%</Text>
          </View>
        </View>
      </View>
    );
  };

  const handleMoreClick = () => {
    router.push('./Homescreens/CryptoListScreen');
  };

  return (
    <View>
      <Text style={styles.title}>Top Cryptos</Text>

      <LinearGradient colors={['#fff', '#203a43', '#0f2027']} style={styles.gradientContainer}>
        <View style={styles.cryptoGrid}>
          {coins.map(coin => (
            <View key={coin.id} style={styles.coinWrapper}>
              {renderItem({ item: coin })}
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={handleMoreClick} style={styles.moreButtonContainer}>
          <FontAwesome name="caret-down" size={24} color="#FFFFFF" style={styles.moreButtonIcon} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    paddingHorizontal: 8, // Adjusted for proper spacing
    justifyContent: 'flex-start',
    // backgroundColor: '#0f2027', // Fallback color for older devices

    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',

    marginLeft: 4,
    padding: 20
  },
  cryptoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', 

    marginTop: 40
  },
  coinWrapper: {
    width: '23%', // Ensure 4 items per row, margin space included
    marginBottom: 12
  },
  coinContainer: {
    alignItems: 'center',
    backgroundColor: '#202b33',
    paddingVertical: 10, // Reduced padding for compactness
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 12, // Reduced space between items
    alignSelf: 'stretch'
  },
  coinImage: {
    width: 35, // Adjusted size for better fit
    height: 35,
    marginBottom: 8 // Reduced margin
  },
  coinDetails: {
    alignItems: 'center'
  },
  coinName: {
    fontSize: 10, 
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 4 // Reduced margin for tighter layout
  },
  coinPrice: {
    fontSize: 10, 
    fontWeight: '600'
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2 // Reduced top margin
  },
  priceChangeText: {
    fontSize: 10, // Smaller font size for percentages
    marginLeft: 4 // Space between the arrow and percentage
  },
  moreButtonContainer: {
    alignSelf: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 50,

    paddingHorizontal: 24,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  moreButtonIcon: {
    transform: [{ rotate: '0deg' }] // Fixed the rotation so it's facing down
  }
});

export default PartialCrypto;
