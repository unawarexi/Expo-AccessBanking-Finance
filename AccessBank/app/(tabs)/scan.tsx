import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan to Pay</Text>
        <TouchableOpacity style={styles.historyButton}>
          <Ionicons name="time" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <View style={styles.scanArea}>
        <View style={styles.scanFrame}>
          <View style={styles.scanCorner} />
          <View style={[styles.scanCorner, styles.topRight]} />
          <View style={[styles.scanCorner, styles.bottomLeft]} />
          <View style={[styles.scanCorner, styles.bottomRight]} />
        </View>
        <Text style={styles.scanText}>Align QR code within frame</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.actionIcon, { backgroundColor: '#eff6ff' }]}>
            <Ionicons name="qr-code" size={24} color="#2563eb" />
          </View>
          <Text style={styles.actionText}>My QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={[styles.actionIcon, { backgroundColor: '#f0fdf4' }]}>
            <Ionicons name="images" size={24} color="#16a34a" />
          </View>
          <Text style={styles.actionText}>Upload QR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentScans}>
        <Text style={styles.recentTitle}>Recent Sc ans</Text>
        {[
          { name: 'Coffee Shop', amount: 8.5, time: '2 hours ago' },
          { name: 'Grocery Store', amount: 45.99, time: 'Yesterday' },
          { name: 'Restaurant', amount: 32.4, time: '2 days ago' }
        ].map((scan, index) => (
          <TouchableOpacity key={index} style={styles.scanItem}>
            <View style={styles.scanIcon}>
              <Ionicons name="qr-code" size={24} color="#64748b" />
            </View>
            <View style={styles.scanInfo}>
              <Text style={styles.scanName}>{scan.name}</Text>
              <Text style={styles.scanTime}>{scan.time}</Text>
            </View>
            <Text style={styles.scanAmount}>${scan.amount.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.flashButton}>
          <Ionicons name="flash" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937'
  },
  historyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scanArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 400
  },
  scanFrame: {
    width: 280,
    height: 280,
    position: 'relative'
  },
  scanCorner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#2563eb',
    borderWidth: 4
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  scanText: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 24
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20
  },
  actionButton: {
    alignItems: 'center',
    marginHorizontal: 20
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  actionText: {
    fontSize: 14,
    color: '#64748b'
  },
  recentScans: {
    padding: 20
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16
  },
  scanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  scanIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  scanInfo: {
    flex: 1
  },
  scanName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  scanTime: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4
  },
  scanAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  footer: {
    padding: 20,
    alignItems: 'center'
  },
  flashButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  }
});
