import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type HeaderProps = {
  userName: string;
  onSearchPress: () => void;
  onNotificationPress: () => void;
};

const Header = ({ userName, onSearchPress, onNotificationPress }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image 
            source={require('@/assets/images/emoji2.png')} 
            style={styles.avatar}
            // Fallback to a placeholder if image fails to load
            defaultSource={require('@/assets/images/adaptive-icon.png')}
          />
        </View>
        
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
      
      <View style={styles.iconsContainer}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onSearchPress}
          activeOpacity={0.7}
        >
          <Ionicons name="search" size={22} color="#fff"/>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    height: 44,
    width: 44,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#e1e1e1',
  },
  avatar: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  welcomeTextContainer: {
    marginLeft: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    height: 38,
    width: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});

export default Header;