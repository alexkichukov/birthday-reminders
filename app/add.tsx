import Button from '../components/Button';
import colors from '../constants/colors';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { MarkedDates } from 'react-native-calendars/src/types';
import { useReminders } from '../context/RemindersContext';
import { Calendar } from 'react-native-calendars';
import { useMemo, useState } from 'react';

const AddModalScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const { addReminder } = useReminders();

  const marked: MarkedDates = useMemo(
    () => ({
      [date]: {
        selected: true,
        disableTouchEvent: true,
        selectedTextColor: colors.white,
        selectedColor: colors.primary,
      },
    }),
    [date]
  );

  const onCreate = async () => addReminder(name, description, date);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
        />
        <Calendar
          theme={{
            todayTextColor: colors.secondary,
            textDisabledColor: colors.disabled,
            arrowColor: colors.primary,
          }}
          markedDates={marked}
          renderHeader={(date) => (
            <Text style={styles.calendarHeader}>{date.toString('MMMM')}</Text>
          )}
          style={styles.calendar}
          onDayPress={(day) => setDate(day.dateString)}
        />
        <Button text="Create" onPress={onCreate} disabled={!name || !date} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  form: {
    flex: 1,
    width: '100%',
    gap: 20,
  },
  input: {
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: '100%',
  },
  calendar: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  calendarHeader: {
    fontSize: 16,
    color: colors.secondary,
  },
});

export default AddModalScreen;
