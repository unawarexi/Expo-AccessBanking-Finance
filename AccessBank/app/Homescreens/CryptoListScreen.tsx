import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons'; // For up/down chart arrows

const CryptoListScreen = () => {
  const [coins, setCoins] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all coins
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': '3d601765-66c9-4801-b916-8d810027088c',
      },
    })
    .then(response => setCoins(response.data.data))
    .catch(error => console.error(error));
  }, []);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderItem = ({ item }: { item: any }) => {
    const priceChange = item.quote.USD.percent_change_24h;
    const priceColor = priceChange < 0 ? '#FF6B6B' : '#4CAF50'; // Red for loss, Green for gain

    return (
      <View style={styles.coinContainer}>
        <Image source={{ uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png` }} style={styles.coinImage} />
        <View style={styles.coinDetails}>
          <Text style={styles.coinName}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={[styles.coinPrice, { color: priceColor }]}>${item.quote.USD.price.toFixed(2)}</Text>
            <Text style={[styles.priceChange, { color: priceColor }]}>
              {priceChange.toFixed(2)}%
            </Text>
            <FontAwesome
              name={priceChange < 0 ? 'arrow-down' : 'arrow-up'}
              size={12}
              color={priceColor}
              style={styles.arrowIcon}
            />
          </View>
          <Text style={styles.coinMarketCap}>Market Cap: ${item.quote.USD.market_cap.toFixed(0)}</Text>
          <Text style={styles.coinVolume}>24h Volume: ${item.quote.USD.volume_24h.toFixed(0)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a coin..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredCoins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Ensures space below notch on iPhone X and similar devices
    paddingHorizontal: 16,
    backgroundColor: '#F0F8FF',
  },
  searchBar: {
    height: 45,
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginTop: 50
  },
  coinContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  coinImage: {
    width: 48,
    height: 48,
  },
  coinDetails: {
    marginLeft: 16,
    flex: 1, // Ensure details fill available space
  },
  coinName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    flex: 1, // Ensures price text is aligned properly
  },
  priceChange: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right', // Right-align the percentage change
    flex: 0.5, // Makes sure the price and change are aligned
  },
  arrowIcon: {
    marginLeft: 4, // Slight margin between price and arrow
  },
  coinMarketCap: {
    fontSize: 12,
    marginTop: 4,
  },
  coinVolume: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default CryptoListScreen;
