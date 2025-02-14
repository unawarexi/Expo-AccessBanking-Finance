import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown, Search, CreditCard, LogOut } from 'lucide-react';
import { FontAwesome } from '@expo/vector-icons';
import { motion } from 'framer-motion';
import categories from '@/data/MoreCategory';

const MoreOptionScreen = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setActiveCategory(activeCategory === title ? null : title);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={16} />
          <TextInput
            style={styles.searchInput}
            placeholder='Search...'
          />
        </View>
      </View>

      {categories.map((category, index) => (
        <View key={index} style={styles.categoryContainer}>
          <TouchableOpacity onPress={() => toggleCategory(category.title)} style={styles.categoryHeader}>
            <View style={styles.categoryHeaderText}>
              {category.icon}
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </View>
            <ChevronDown size={24} color={activeCategory === category.title ? 'blue' : 'black'} />
          </TouchableOpacity>

          {activeCategory === category.title && (
            <View style={styles.subOptionsContainer}>
              {category.subOptions.map((subOption, subIndex) => (
                <View key={subIndex} style={styles.subOption}>
                  {subOption.icon}
                  <Text style={styles.subOptionText}>{subOption.title}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton}>
        <LogOut size={24} color='white' />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 18,
  },
  categoryContainer: {
    marginBottom: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    padding: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryHeaderText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    marginLeft: 16,
  },
  subOptionsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  subOption: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    width: '30%',
    marginBottom: 16,
  },
  subOptionText: {
    marginTop: 8,
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
  },
});

export default MoreOptionScreen;
