import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    country: '',
    password: '',
    confirmPassword: '',
    ssn: '', // Social Security Number
    employmentStatus: '',
    annualIncome: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.stepDot,
            index + 1 === currentStep && styles.stepDotActive,
            index + 1 < currentStep && styles.stepDotCompleted,
          ]}
        />
      ))}
    </View>
  );

  const renderStep1 = () => (
    <>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#FFFFFF80"
          value={formData.firstName}
          onChangeText={(value) => updateFormData('firstName', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#FFFFFF80"
          value={formData.lastName}
          onChangeText={(value) => updateFormData('lastName', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FFFFFF80"
          value={formData.email}
          onChangeText={(value) => updateFormData('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#FFFFFF80"
          value={formData.phone}
          onChangeText={(value) => updateFormData('phone', value)}
          keyboardType="phone-pad"
        />
      </View>
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={styles.stepTitle}>Address & Identity</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="home-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#FFFFFF80"
          value={formData.address}
          onChangeText={(value) => updateFormData('address', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="business-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="#FFFFFF80"
          value={formData.city}
          onChangeText={(value) => updateFormData('city', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="globe-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor="#FFFFFF80"
          value={formData.country}
          onChangeText={(value) => updateFormData('country', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="card-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Social Security Number"
          placeholderTextColor="#FFFFFF80"
          value={formData.ssn}
          onChangeText={(value) => updateFormData('ssn', value)}
          keyboardType="number-pad"
        />
      </View>
    </>
  );

  const renderStep3 = () => (
    <>
      <Text style={styles.stepTitle}>Financial Information</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="briefcase-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Employment Status"
          placeholderTextColor="#FFFFFF80"
          value={formData.employmentStatus}
          onChangeText={(value) => updateFormData('employmentStatus', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="cash-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Annual Income"
          placeholderTextColor="#FFFFFF80"
          value={formData.annualIncome}
          onChangeText={(value) => updateFormData('annualIncome', value)}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Password"
          placeholderTextColor="#FFFFFF80"
          value={formData.password}
          onChangeText={(value) => updateFormData('password', value)}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Confirm Password"
          placeholderTextColor="#FFFFFF80"
          value={formData.confirmPassword}
          onChangeText={(value) => updateFormData('confirmPassword', value)}
          secureTextEntry={!showPassword}
        />
      </View>
    </>
  );

  return (
    <LinearGradient colors={['#0A0F24', '#1A1B4B']} style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join our secure banking platform</Text>
        </View>

        {renderStepIndicator()}

        <View style={styles.form}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          <View style={styles.buttonContainer}>
            {currentStep > 1 && (
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => setCurrentStep(prev => prev - 1)}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>Previous</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[
                styles.button,
                currentStep > 1 && { flex: 1, marginLeft: 12 }
              ]}
              onPress={() => {
                if (currentStep < totalSteps) {
                  setCurrentStep(prev => prev + 1);
                } else {
                  // Handle signup
                }
              }}
            >
              <Text style={styles.buttonText}>
                {currentStep === totalSteps ? 'Create Account' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/Login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginText}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  stepTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  stepDotActive: {
    backgroundColor: '#FFFFFF',
    width: 20,
  },
  stepDotCompleted: {
    backgroundColor: '#FFFFFF',
  },
  form: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#0A0F24',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});