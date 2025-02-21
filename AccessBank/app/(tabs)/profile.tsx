import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const profileSections = [
    {
      title: 'Account Settings',
      items: [
        { icon: 'person', label: 'Personal Information', route: '/profile/personal' },
        { icon: 'shield-checkmark', label: 'Security', route: '/profile/security' },
        { icon: 'notifications', label: 'Notifications', route: '/profile/notifications' },
        { icon: 'language', label: 'Language', route: '/profile/language' }
      ]
    },
    {
      title: 'Banking Preferences',
      items: [
        { icon: 'card', label: 'Payment Methods', route: '/profile/payments' },
        { icon: 'wallet', label: 'Account Limits', route: '/profile/limits' },
        { icon: 'document-text', label: 'Statements', route: '/profile/statements' },
        { icon: 'analytics', label: 'Reports', route: '/profile/reports' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle', label: 'Help Center', route: '/profile/help' },
        { icon: 'chatbubble-ellipses', label: 'Contact Us', route: '/profile/contact' },
        { icon: 'document', label: 'Terms & Conditions', route: '/profile/terms' },
        { icon: 'shield', label: 'Privacy Policy', route: '/profile/privacy' }
      ]
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }} style={styles.profileImage} />
          <View style={styles.profileText}>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={20} color="#2563eb" />
        </TouchableOpacity>
      </View>

      <View style={styles.quickStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Active Accounts</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Active Cards</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>85%</Text>
          <Text style={styles.statLabel}>Profile Complete</Text>
        </View>
      </View>

      {profileSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity key={itemIndex} style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuItemIcon}>
                    <Ionicons name={item.icon as any} size={20} color="#2563eb" />
                  </View>
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#64748b" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out" size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
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
    paddingTop: 60,
    backgroundColor: '#fff'
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16
  },
  profileText: {
    flex: 1
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937'
  },
  email: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 1
  },
  statItem: {
    flex: 1,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563eb'
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#e2e8f0'
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  menuItemLabel: {
    fontSize: 16,
    color: '#1f2937'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 24,
    marginHorizontal: 20,
    marginBottom: 40,
    padding: 16,
    borderRadius: 16
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8
  }
});
