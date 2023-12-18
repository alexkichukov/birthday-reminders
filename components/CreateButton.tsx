import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Href, Link } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import colors from '../constants/colors';

interface Props {
  href: string;
}

const CreateButton = ({ href }: Props) => {
  return (
    <Link href={href as Href<{}>} asChild>
      <Pressable
        style={styles.button}
        android_ripple={{ color: colors.secondary, borderless: true }}
      >
        <FontAwesome name="plus" size={24} />
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 14,
    right: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
});

export default CreateButton;
