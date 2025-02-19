import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import AccountCard from '@/components/AccountCard'; // Assuming you have an AccountCard component
import { useRouter } from 'expo-router';
import ConvertFx from './ConvertFx';

const AccessToAccess = () => {
  const [activeTab, setActiveTab] = useState('accessAccount');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const router = useRouter();

  // Function to switch between tabs
  const handleTabSwitch = (tab: React.SetStateAction<string>) => setActiveTab(tab);

  // Function to validate the inputs and enable/disable the Proceed button
  const validateForm = () => {
    if (accountNumber.length === 10 && accountName && amount && description) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  // Limit account number to 10 digits
  const handleAccountNumberChange = (value: string) => {
    if (value.length <= 10) {
      setAccountNumber(value);
      validateForm(); // Trigger form validation
    }
  };

  // Update form values and validate each time an input changes
  const handleInputChange = (setter : any) => (value: any) => {
    setter(value);
    validateForm(); // Trigger form validation
  };

  return (
    <View style={styles.container}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => router.back() }>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Access Transfers</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'accessAccount' && styles.activeTab]}
          onPress={() => handleTabSwitch('accessAccount')}
        >
          <Text style={styles.tabText}>Access Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'convertFx' && styles.activeTab]}
          onPress={() => handleTabSwitch('convertFx')}
        >
          <Text style={styles.tabText}>Convert FX</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content with Keyboard Avoidance */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          {activeTab === 'accessAccount' && (
            <>
              <AccountCard />

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
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <FontAwesome name="bank" size={20} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Account Number"
                    keyboardType="numeric"
                    value={accountNumber}
                    onChangeText={handleAccountNumberChange}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <FontAwesome name="user" size={20} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Account Name"
                    value={accountName}
                    onChangeText={handleInputChange(setAccountName)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <FontAwesome name="money" size={20} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={handleInputChange(setAmount)}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <FontAwesome name="pencil" size={20} color="#9ca3af" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Transfer Description"
                    value={description}
                    onChangeText={handleInputChange(setDescription)}
                  />
                </View>
              </View>
            </>
          )}

          {activeTab === 'convertFx' && (
            <View style={styles.convertFxContainer}>
              <Text style={styles.sectionTitle}>Convert FX</Text>
              {/* Add relevant FX form fields here */}
             <ConvertFx />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Proceed Button */}
      {activeTab === "accessAccount" &&  <View style={styles.proceedButtonContainer}>
        <TouchableOpacity
          style={[
            styles.proceedButton,
            { backgroundColor: isButtonEnabled ? '#2563eb' : '#9ca3af' }, // Change color based on validation
          ]}
          disabled={!isButtonEnabled}
        >
          <Text style={styles.proceedButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>}
      
    </View>
  );
};

export default AccessToAccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  appBarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tabButton: {
    paddingVertical: 15,
    width: '50%',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
  },
  tabText: {
    fontSize: 16,
    color: '#1f2937',
  },
  scrollViewContent: {
    paddingBottom: 20, // Ensure some space at the bottom
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  limitText: {
    color: '#1f2937',
    fontSize: 14,
  },
  upgradeText: {
    color: '#2563eb',
    fontSize: 14,
  },
  progressBar: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  amountText: {
    color: '#1f2937',
  },
  beneficiaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  beneficiaryText: {
    color: '#1f2937',
  },
  findText: {
    color: '#2563eb',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  formContainer: {
    marginTop: 20,
  },
  convertFxContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1f2937',
  },
  fxText: {
    fontSize: 16,
    color: '#64748b',
  },
  proceedButtonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  proceedButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
