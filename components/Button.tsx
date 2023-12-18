import { Pressable, Text, StyleSheet, PressableProps } from 'react-native';
import colors from '../constants/colors';

interface Props extends PressableProps {
  text: string;
}

const Button = ({ text, ...rest }: Props) => {
  return (
    <Pressable
      style={rest.disabled ? styles.disabledButton : styles.button}
      android_ripple={{ color: colors.secondary }}
      {...rest}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  disabledButton: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.disabled,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Button;
