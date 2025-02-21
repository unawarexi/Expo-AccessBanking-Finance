import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // For currency dropdown
import { LinearGradient } from 'expo-linear-gradient';
import AccountCard from '@/components/AccountCard';

const ConvertFx = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [conversionRates, setConversionRates] = useState<{ [key: string]: number }>({});
  const [conversionRate, setConversionRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const [rateChange, setRateChange] = useState('neutral'); // green or red based on gains/losses
  const [isReversed, setIsReversed] = useState(false);

  // Fetch conversion rates using the API
  const fetchConversionRates = async () => {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/ec20f57cc92dfdbb79461b31/latest/${fromCurrency}`);
    const data = await response.json();
    setConversionRates(data.conversion_rates); // Contains all conversion rates
    setLastUpdate(data.time_last_update_utc); // Set last update time
    setConversionRate(data.conversion_rates[toCurrency]);
  };

  useEffect(() => {
    fetchConversionRates();
  }, [fromCurrency, toCurrency]);

  // Handle amount change and calculate conversion
  const handleAmountChange = (value: any) => {
    setAmount(value);
    if (conversionRate !== null) {
      const converted = (parseFloat(value) * conversionRate).toFixed(2);
      setConvertedAmount(converted);
    } else {
      setConvertedAmount('');
    }
  };

  // Reverse "From" and "To" currencies
  const reverseCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setIsReversed(!isReversed);
  };

  // Handle currency changes and calculate the gain/loss indicator
  const handleCurrencyChange = (newToCurrency: string) => {
    const previousRate = conversionRates[toCurrency];
    const newRate = conversionRates[newToCurrency];
    setToCurrency(newToCurrency);

    if (newRate > previousRate) {
      setRateChange('green'); // Gain
    } else if (newRate < previousRate) {
      setRateChange('red'); // Loss
    } else {
      setRateChange('neutral'); 
    }

    setConversionRate(newRate);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            <Ionicons name="information-circle-outline" size={16} color="#0284c7" /> Enter the amount to convert and select your currencies.
          </Text>
        </View>

        {/* Domiciliary Account Card */}
        <LinearGradient colors={['#0f172a', '#0284c7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.domiciliaryCard}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>Domiciliary Account</Text>
            <Text style={styles.cardSubText}>Balance: $10,000</Text>
            <Text style={styles.cardSubText}>Currency: USD</Text>
          </View>
        </LinearGradient>

        <AccountCard />

        {/* Currency Selection */}
        <View style={styles.currencySelectorContainer}>
          {/* From Currency */}
          <View style={styles.currencyPicker}>
            <Text style={styles.label}>From Currency</Text>
            <Picker selectedValue={fromCurrency} onValueChange={itemValue => setFromCurrency(itemValue)} style={styles.picker}>
              {Object.keys(conversionRates).map(currency => (
                <Picker.Item key={currency} label={currency} value={currency} />
              ))}
            </Picker>
          </View>

          {/* Reversal Button */}
          <TouchableOpacity onPress={reverseCurrencies} style={styles.reverseIconContainer}>
            <MaterialIcons name="swap-horiz" size={32} color="#0284c7" />
          </TouchableOpacity>

          {/* To Currency */}
          <View style={styles.currencyPicker}>
            <Text style={styles.label}>To Currency</Text>
            <Picker selectedValue={toCurrency} onValueChange={handleCurrencyChange} style={styles.picker}>
              {Object.keys(conversionRates).map(currency => (
                <Picker.Item key={currency} label={currency} value={currency} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Amount Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <TextInput style={styles.input} value={amount} onChangeText={handleAmountChange} placeholder="Enter amount" keyboardType="numeric" />
        </View>

        {/* Converted Amount */}
        <View style={styles.convertedAmountContainer}>
          <Text style={styles.convertedText}>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </Text>
        </View>

        {/* Conversion Rate */}
        <View style={styles.conversionRateContainer}>
          <Text style={styles.conversionRateText}>
            1 {fromCurrency} = {conversionRate} {toCurrency}
          </Text>
          <Text style={rateChange === 'green' ? styles.greenRate : rateChange === 'red' ? styles.redRate : styles.neutralRate}>
            {rateChange === 'green' ? '↑' : rateChange === 'red' ? '↓' : '↔'}
          </Text>
        </View>

        {/* Last Update Time */}
        <Text style={styles.lastUpdateText}>Last updated: {lastUpdate}</Text>

        {/* Transfer Button */}
        <TouchableOpacity style={[styles.transferButton, { backgroundColor: amount ? '#2563eb' : '#9ca3af' }]} disabled={!amount}>
          <Text style={styles.transferButtonText}>Transfer</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ConvertFx;

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f8fafc' },
  instructionsContainer: { backgroundColor: '#e0f7fa', padding: 10, borderRadius: 8, marginBottom: 20 },
  instructionsText: { fontSize: 14, color: '#0284c7' },
  domiciliaryCard: { borderRadius: 16, padding: 16, marginBottom: 20 },
  cardContent: { flexDirection: 'column', alignItems: 'flex-start' },
  cardText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  cardSubText: { fontSize: 14, color: '#f1f5f9', marginTop: 8 },
  currencySelectorContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  currencyPicker: { flex: 1 },
  reverseIconContainer: { padding: 10 },
  label: { fontSize: 14, color: '#1f2937', marginBottom: 8 },
  picker: { backgroundColor: '#fff', borderRadius: 8, padding: 10 },
  inputContainer: { marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fff' },
  convertedAmountContainer: { padding: 20, backgroundColor: '#e5f3ff', borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  convertedText: { fontSize: 18, fontWeight: 'bold', color: '#2563eb' },
  conversionRateContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  conversionRateText: { fontSize: 16, color: '#1f2937', marginRight: 10 },
  greenRate: { color: '#16a34a', fontSize: 16 },
  redRate: { color: '#dc2626', fontSize: 16 },
  neutralRate: { color: '#64748b', fontSize: 16 },
  lastUpdateText: { fontSize: 12, color: '#64748b', marginBottom: 10 },
  transferButton: { padding: 16, borderRadius: 8, alignItems: 'center' },
  transferButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
