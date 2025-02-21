import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccessScreen() {
  const accessItems = [
    {
      title: 'Quick Access',
      items: [
        { icon: 'finger-print', label: 'Biometric Login', enabled: true },
        { icon: 'phone-portrait', label: 'Device Management', enabled: true },
        { icon: 'key', label: 'Password Manager', enabled: false }
      ]
    },
    {
      title: 'Security',
      items: [
        { icon: 'shield-checkmark', label: '2-Factor Authentication', enabled: true },
        { icon: 'lock-closed', label: 'App Lock', enabled: true },
        { icon: 'eye-off', label: 'Hide Balance', enabled: false }
      ]
    },
    {
      title: 'Permissions',
      items: [
        { icon: 'camera', label: 'Camera Access', enabled: true },
        { icon: 'location', label: 'Location Services', enabled: true },
        { icon: 'notifications', label: 'Push Notifications', enabled: true }
      ]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Access</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <View style={styles.securityScore}>
        <View style={styles.scoreHeader}>
          <Text style={styles.scoreTitle}>Security Score</Text>
          <Text style={styles.scoreValue}>85%</Text>
        </View>
        <View style={styles.scoreBar}>
          <View style={[styles.scoreProgress, { width: '85%' }]} />
        </View>
        <Text style={styles.scoreText}>Your account security is good</Text>
      </View>

      {accessItems.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity key={itemIndex} style={styles.accessItem}>
                <View style={styles.accessItemLeft}>
                  <View style={[styles.accessItemIcon, { backgroundColor: item.enabled ? '#eff6ff' : '#f1f5f9' }]}>
                    <Ionicons name={item.icon} size={20} color={item.enabled ? '#2563eb' : '#94a3b8'} />
                  </View>
                  <Text style={[styles.accessItemLabel, { color: item.enabled ? '#1f2937' : '#64748b' }]}>{item.label}</Text>
                </View>
                <View style={[styles.toggle, { backgroundColor: item.enabled ? '#2563eb' : '#e2e8f0' }]}>
                  <View style={[styles.toggleKnob, { transform: [{ translateX: item.enabled ? 20 : 0 }] }]} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.deviceInfo}>
        <Text style={styles.deviceTitle}>Current Device</Text>
        <View style={styles.deviceDetails}>
          <View style={styles.deviceIcon}>
            <Ionicons name="phone-portrait" size={24} color="#2563eb" />
          </View>
          <View style={styles.deviceText}>
            <Text style={styles.deviceName}>iPhone 13 Pro</Text>
            <Text style={styles.deviceStatus}>Last accessed: Just now</Text>
          </View>
          <TouchableOpacity style={styles.deviceAction}>
            <Ionicons name="settings-outline" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  securityScore: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  scoreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563eb'
  },
  scoreBar: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden'
  },
  scoreProgress: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4
  },
  scoreText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden'
  },
  accessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  accessItemLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  accessItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  accessItemLabel: {
    fontSize: 16
  },
  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    padding: 2
  },
  toggleKnob: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  deviceInfo: {
    margin: 20,
    marginTop: 24
  },
  deviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16
  },
  deviceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  deviceText: {
    flex: 1
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  deviceStatus: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4
  },
  deviceAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
