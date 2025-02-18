import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'; 
import categories from '@/data/MoreCategory';

const MoreOptionScreen = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setActiveCategory(activeCategory === title ? null : title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          {/* Replace with a compatible icon */}
          <FontAwesome name="search" size={16} color="black" />
          <TextInput style={styles.searchInput} placeholder="Search..." />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollableContainer} showsVerticalScrollIndicator={false}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <TouchableOpacity
              onPress={() => toggleCategory(category.title)}
              style={styles.categoryHeader}
            >
              <View style={styles.categoryHeaderText}>
                {category.icon}
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white', 
                  borderRadius: 50, 
                  padding: 8, 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                }}
              >
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color={activeCategory === category.title ? 'blue' : 'black'}
                />
              </View>
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
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton}>
        <MaterialIcons name="logout" size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 30,
    padding: 16
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
  scrollableContainer: {
    paddingBottom: 16, // Space at the bottom of the ScrollView
  },
  categoryContainer: {
    marginBottom: 16,
    backgroundColor: '#E2E8F0',
    borderRadius: 16,
    padding: 10,
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
    fontSize: 14,
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
    width: '23%', 
    marginBottom: 16,
    marginHorizontal: '1%',
  },
  subOptionText: {
    marginTop: 8,
    fontSize: 10,
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
