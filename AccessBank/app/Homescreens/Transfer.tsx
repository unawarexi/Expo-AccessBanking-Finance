import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Transfer = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const snapPoints = ['40%']; // Bottom Sheet Height: 40% of screen height

  useEffect(() => {
    bottomSheetRef.current?.expand(); // Open the bottom sheet when the screen is loaded
  }, []);

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const transferOptions = [
    { id: 1, label: 'Access-to-Access', icon: 'bank', route: '/access' },
    { id: 2, label: 'Access-to-Others', icon: 'users', route: '/others' },
    { id: 3, label: 'Access-to-International', icon: 'globe', route: '/international' },
    { id: 4, label: 'Access-to-Crypto', icon: 'bitcoin', route: '/crypto' },
  ];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1} // Initially hidden
        enablePanDownToClose={true} // Allows swipe down to close
        onClose={handleCloseBottomSheet}
        style={styles.bottomSheet}
      >
        <View style={styles.content}>
          {/* Close Button */}
          <TouchableOpacity onPress={handleCloseBottomSheet} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          {/* Transfer Options */}
          {transferOptions.map((option) => (
            <TouchableOpacity key={option.id} style={styles.option} onPress={() => router.push(option.route as any)}>
              <FontAwesome name={option.icon as any} size={24} color="#0284c7" />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  bottomSheet: { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  content: { padding: 16 },
  closeButton: { position: 'absolute', top: 10, right: 20 },
  closeText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  option: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  optionText: { marginLeft: 16, fontSize: 16, color: '#333' },
});

export default Transfer;
