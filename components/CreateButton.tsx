import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Href, Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';
import { schedulePushNotification } from '../notifications';

interface Props {
  href: string;
}

const CreateButton = ({ href }: Props) => {
  return (
    <Link href={href as Href<{}>} asChild>
      <Pressable
        style={styles.buttonContainer}
        android_ripple={{ color: colors.secondary, borderless: true, foreground: true, radius: 32 }}
      >
        <View style={styles.button}>
          <FontAwesome name="plus" size={24} />
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 14,
    right: 14,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
});

export default CreateButton;
