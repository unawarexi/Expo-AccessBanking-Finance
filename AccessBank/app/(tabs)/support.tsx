import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SupportScreen() {
  const supportCategories = [
    { icon: 'card', label: 'Cards & Payments' },
    { icon: 'shield-checkmark', label: 'Account Security' },
    { icon: 'cash', label: 'Transfers' },
    { icon: 'settings', label: 'App Issues' },
  ];

  const faqItems = [
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to the login screen and tap "Forgot Password". Follow the instructions sent to your email.',
    },
    {
      question: 'How do I report a suspicious transaction?',
      answer: 'If you notice any suspicious activity, immediately lock your card in the app and contact our 24/7 support.',
    },
    {
      question: 'What are the transfer limits?',
      answer: 'Transfer limits vary based on your account type and verification level. Check your limits in Profile > Account Limits.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Support</Text>
        <TouchableOpacity style={styles.chatButton}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search help articles..."
            placeholderTextColor="#64748b"
          />
        </View>
      </View>

      <View style={styles.categories}>
        {supportCategories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <View style={styles.categoryIcon}>
              <Ionicons name={category.icon} size={24} color="#2563eb" />
            </View>
            <Text style={styles.categoryLabel}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.faqItem}>
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Ionicons name="chevron-down" size={20} color="#64748b" />
            </View>
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactOptions}>
          <TouchableOpacity style={styles.contactOption}>
            <View style={[styles.contactIcon, { backgroundColor: '#eff6ff' }]}>
              <Ionicons name="call" size={24} color="#2563eb" />
            </View>
            <Text style={styles.contactLabel}>Call Us</Text>
            <Text style={styles.contactDetail}>24/7 Support Line</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactOption}>
            <View style={[styles.contactIcon, { backgroundColor: '#f0fdf4' }]}>
              <Ionicons name="mail" size={24} color="#16a34a" />
            </View>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactDetail}>Response in 24h</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.emergencySection}>
        <View style={styles.emergencyHeader}>
          <Ionicons name="warning" size={24} color="#dc2626" />
          <Text style={styles.emergencyTitle}>Emergency Contact</Text>
        </View>
        <Text style={styles.emergencyText}>
          For urgent assistance or to report a lost/stolen card, call our emergency hotline:
        </Text>
        <TouchableOpacity style={styles.emergencyButton}>
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.emergencyButtonText}>Call Emergency Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1f2937',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  contactSection: {
    padding: 20,
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactOption: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    color: '#64748b',
  },
  emergencySection: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#dc2626',
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
    borderRadius: 8,
    padding: 12,
  },
  emergencyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});