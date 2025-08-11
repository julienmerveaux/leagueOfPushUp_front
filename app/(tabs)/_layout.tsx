import { Slot, useRouter } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import  useUserStore  from '@/store/user.store';
import {NavButtonProps} from "@/interface/interface"
import { JSX } from 'react';


export default function Layout() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  return (
      <View style={styles.container}>

        <View style={styles.content}>
          <Slot />
        </View>

        {/* NavBar personnalisée */}
        <View style={styles.navbar}>
          <NavButton title="Accueil" onPress={() => router.replace('/')} />

          {!user ? (
              <>
                <NavButton title="Inscription" onPress={() => router.replace('/register')} />
              </>
          ) : (
              <>

              </>
          )}
        </View>
      </View>
  );
}

function NavButton({ title, onPress }: NavButtonProps): JSX.Element {
  return (
      <TouchableOpacity style={styles.navButton} onPress={onPress}>
        <Text style={styles.navButtonText}>{title}</Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f8f8f8',
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
});