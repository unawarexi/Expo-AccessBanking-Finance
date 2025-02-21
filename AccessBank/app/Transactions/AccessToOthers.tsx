import { View, Text, TouchableOpacity, ScrollView, TextInput, Platform, KeyboardAvoidingView, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { useRouter } from 'expo-router';
import AccountCard from '@/components/AccountCard';
import Countries from '@/data/Countries';
import IbanCountriesData from '@/data/iban';
import * as Location from 'expo-location';
import axios from 'axios';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import ConfirmTransaction from './ConfirmTransaction';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BANK_DATA_API_KEY } from '@env';

const AccessToOthers = () => {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [location, setLocation] = useState<{ code: string; name: string; flag: string } | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<{ code: string; name: string; flag: string } | null>(null);
  const [ibanOrRouting, setIbanOrRouting] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [ibanData, setIbanData] = useState(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheet>(null); // Reference controlling the bottom sheet
  const snapPoints = Platform.OS === 'ios' ? ['55%'] : ['60%'];

  const handleProceed = () => {
    console.log(' i was clicked');
    setShowBottomSheet(true);
    bottomSheetRef.current?.expand(); // Open the bottom sheet
  };

  useEffect(() => {
    getUserCurrentLocation();

    if (ibanOrRouting.length >= 15 && ibanOrRouting.length <= 34) {
      validateIbanOrSwift(ibanOrRouting, 'iban');
    }

    if (ibanOrRouting.length === 9) {
      validateIbanOrSwift(ibanOrRouting, 'routing');
    }

    if (swiftCode.length === 8 || swiftCode.length === 11) {
      validateIbanOrSwift(swiftCode, 'swift');
    }
  }, [ibanOrRouting, swiftCode]);

  //------------- GET USERS LOCATION
  const getUserCurrentLocation = async () => {
    try {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // user's current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;

      // reverse geocoding to get location details from latitude/longitude
      let geocodeResult = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      if (geocodeResult && geocodeResult.length > 0) {
        const country = geocodeResult[0].country;
        //  console.log(`User is located in: ${country}`);

        // mapping the country name to a known country object
        const matchedCountry = Countries.find(c => c.name === country);
        if (matchedCountry) {
          setLocation(matchedCountry);
          setSelectedCountry(matchedCountry);
        } else {
          setLocation({ code: '', name: country || '', flag: '' });
        }
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  // Function to validate IBAN or SWIFT code
  const validateIbanOrSwift = async (value: string, type: string) => {
    setIsLoading(true);
    try {
      let url = '';
      if (type === 'iban') {
        url = `https://api.apilayer.com/bank_data/iban_fields?country=${value}`;
      } else if (type === 'swift') {
        url = `https://api.apilayer.com/bank_data/swift_check?swift_code=${value}`;
      } else if (type === 'routing') {
        url = `https://api.apilayer.com/bank_data/us_routing?us_routing=${value}`;
      }

      const response = await fetch(url, {
        headers: { apikey: BANK_DATA_API_KEY }
      });

      const data = await response.json();
      // console.log('Full Response Data:', data); // Log all returned data
      setIbanData(data);

      // Auto-fill the bank name
      setBankName(data.bank_data?.name || '');
    } catch (error) {
      // Log the full error object for more detailed information
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Error response data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Error request:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      } else {
        console.error('Unexpected error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if IBAN or Routing is needed based on country
  const determineFormFields = () => {
    if (selectedCountry?.code === 'US') {
      return 'routing';
    }
    return 'iban';
  };

  // Validate form fields
  const validateForm = () => {
    if (accountNumber.length === 10 && bankName !== '' && accountName !== '' && amount !== '' && description !== '' && swiftCode !== '') {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleAccountNumberChange = (value: string) => {
    if (value.length <= 10) {
      setAccountNumber(value);
      validateForm();
    }
  };

  const handleInputChange = (setter: any) => (value: any) => {
    setter(value);
    validateForm();
  };

  const handleCountryChange = (value: any) => {
    const country = Countries.find(c => c.code === value);
    setSelectedCountry(country as any);
    setShowCountryPicker(false);
  };

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <View style={[styles.appBar, showBottomSheet && { backgroundColor: 'darkgrey' }]}>
        <TouchableOpacity onPress={() => !showBottomSheet && router.back()}>
          <Ionicons name="arrow-back" size={24} color={showBottomSheet ? '#000' : '#fff'} />
        </TouchableOpacity>
        <Text style={[styles.appBarTitle, showBottomSheet && { color: '#000' }]}>Other Banks Transfers</Text>
      </View>

      {/* Scrollable Content with Keyboard Avoidance */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={[{ flex: 1 }, showBottomSheet ? styles.disabledInput : null]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            showsVerticalScrollIndicator={false}
            scrollEnabled={!showBottomSheet}
            pointerEvents={showBottomSheet ? 'none' : 'auto'}
          >
            <>
              <AccountCard />

              <View style={styles.viewContent}>
                <View style={styles.progressContainer}>
                  <Text style={styles.limitText}>Daily Transaction Limit:</Text>
                  <TouchableOpacity>
                    <Text style={styles.upgradeText}>Upgrade Now</Text>
                  </TouchableOpacity>
                </View>

                <Progress.Bar progress={0.5} width={null} color="#2563eb" style={styles.progressBar} />

                <View style={styles.amountContainer}>
                  <Text style={styles.amountText}>Amount Used: $5,000</Text>
                  <Text style={styles.amountText}>Amount Remaining: $5,000</Text>
                </View>

                {/* Beneficiaries Section */}
                <View style={styles.beneficiaryContainer}>
                  <Text style={styles.beneficiaryText}>Frequent Beneficiaries</Text>
                  <TouchableOpacity>
                    <Text style={styles.findText}>Find Beneficiaries</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <FontAwesome name="search" size={20} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput style={styles.input} placeholder="No frequent beneficiaries" />
                </View>

                {/* Form Fields */}
                <View style={styles.container}>
                  {/* Country Selector */}
                  <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={() => !showBottomSheet && setShowCountryPicker(!showCountryPicker)}>
                      <View style={styles.countrySelector}>
                        <Text style={styles.countryText}>
                          {selectedCountry?.flag || '🌍'} {selectedCountry?.name || 'Select Country'}
                        </Text>
                        <FontAwesome name="chevron-down" size={20} color="#9ca3af" />
                      </View>
                    </TouchableOpacity>
                    {showCountryPicker && (
                      <ScrollView nestedScrollEnabled={true} style={styles.countryPicker}>
                        {Countries.map(country => (
                          <TouchableOpacity key={country.code} onPress={() => handleCountryChange(country.code)}>
                            <Text style={styles.countryPickerText}>
                              {country.flag} {country.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    )}
                  </View>

                  <Text style={{ fontSize: 15, color: '#a0a0a0', marginTop: 15 }}>( Optional )</Text>
                  {/* IBAN or Routing Number */}
                  <View style={styles.inputContainer}>
                    <FontAwesome name="bank" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.input, isLoading || showBottomSheet ? styles.disabledInput : null]}
                      placeholder={determineFormFields() === 'routing' ? 'Routing Number' : 'IBAN Number'}
                      keyboardType="numeric"
                      value={ibanOrRouting}
                      onChangeText={handleInputChange(setIbanOrRouting)}
                      editable={!isLoading && !showBottomSheet}
                    />
                  </View>

                  {/* SWIFT Code */}
                  <View style={styles.inputContainer}>
                    <FontAwesome name="bank" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <TextInput
                      style={[styles.input, isLoading || showBottomSheet ? styles.disabledInput : null]}
                      placeholder="SWIFT Code"
                      value={swiftCode}
                      onChangeText={handleInputChange(setSwiftCode)}
                      editable={!isLoading && !showBottomSheet}
                    />
                  </View>

                  {/* Loading Indicator */}
                  {isLoading && <ActivityIndicator size="small" color="#0284c7" />}

                  {/* Bank Name */}
                  <View style={styles.inputContainer}>
                    <FontAwesome name="bank" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Bank Name" value={bankName} onChangeText={handleInputChange(setBankName)} editable={!showBottomSheet} />
                  </View>

                  {/* Account Number */}
                  <View style={styles.inputContainer}>
                    <FontAwesome name="bank" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Account Number"
                      keyboardType="numeric"
                      value={accountNumber}
                      onChangeText={handleAccountNumberChange}
                      editable={!showBottomSheet}
                    />
                  </View>

                  {/* Account Name */}
                  <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Account Name" value={accountName} onChangeText={handleInputChange(setAccountName)} editable={!showBottomSheet} />
                  </View>

                  {/* Amount */}
                  <View style={styles.inputContainer}>
                    <FontAwesome name="money" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Amount"
                      keyboardType="numeric"
                      value={amount}
                      onChangeText={handleInputChange(setAmount)}
                      editable={!showBottomSheet}
                    />
                  </View>

                  {/* Description */}
                  <View style={styles.inputContainer}>
                    <FontAwesome name="comment" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={handleInputChange(setDescription)} editable={!showBottomSheet} />
                  </View>

                  {/* Transfer Button */}
                  <TouchableOpacity
                    style={[styles.transferButton, { backgroundColor: isButtonEnabled && !isLoading && !showBottomSheet ? '#2563eb' : '#9ca3af' }]}
                    disabled={!isButtonEnabled || isLoading || showBottomSheet}
                    onPress={() => {
                      if (isButtonEnabled) {
                        // Perform the transfer logic here
                        console.log('Transfer initiated');
                        handleProceed();
                      }
                    }}
                  >
                    <Text style={styles.transferButtonText}>Proceed</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Bottom Sheet */}
        {showBottomSheet && (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            onClose={() => setShowBottomSheet(false)}
            enablePanDownToClose={true}
            index={0}
            style={styles.BottomSheetContainer}
          >
            <BottomSheetView>
              <ConfirmTransaction
                swiftCode={swiftCode}
                ibanOrRouting={ibanOrRouting}
                bankName={bankName}
                accountNumber={accountNumber}
                accountName={accountName}
                amount={parseFloat(amount)}
                description={description}
                onClose={() => setShowBottomSheet(false)}
              />
            </BottomSheetView>
          </BottomSheet>
        )}
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  appBar: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40
  },
  appBarTitle: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15
  },
  scrollViewContent: {
    padding: 5
  },
  viewContent: {
    padding: 20
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  limitText: {
    fontSize: 16,
    color: '#111827'
  },
  upgradeText: {
    color: '#2563eb',
    fontSize: 14
  },
  progressBar: {
    marginVertical: 2
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  amountText: {
    fontSize: 14,
    color: '#6b7280'
  },
  beneficiaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  beneficiaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827'
  },
  findText: {
    fontSize: 14,
    color: '#2563eb'
  },
  inputContainer: {
    marginVertical: 10,
    position: 'relative'
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 40
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#a0a0a0'
  },
  inputIcon: {
    position: 'absolute',
    left: 10,
    top: 12
  },
  countrySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  countryText: {
    fontSize: 16,
    color: '#111827'
  },
  countryPicker: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 5,
    maxHeight: 150,
    marginTop: 5
  },
  countryPickerText: {
    padding: 10,
    fontSize: 16
  },
  dataContainer: {
    padding: 16,
    backgroundColor: '#e5f3ff',
    borderRadius: 8
  },
  transferButton: {
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 20
  },
  transferButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },

  BottomSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff', // Ensure the background color is set
    shadowColor: '#000', // Dark shadow for depth
    shadowOffset: { width: 0, height: 5 }, // Position shadow below
    shadowOpacity: 0.3, // Adjust shadow opacity
    shadowRadius: 10, // Adjust shadow spread
    elevation: 10, // Elevation for Android shadow
    paddingTop: 10 // Add spacing at the top for better shadow visibility
  }
});

export default AccessToOthers;
