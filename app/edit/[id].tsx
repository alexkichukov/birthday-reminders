import Button from '../../components/Button';
import colors from '../../constants/colors';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { MarkedDates } from 'react-native-calendars/src/types';
import { useReminders } from '../../context/RemindersContext';
import { Calendar } from 'react-native-calendars';
import { useEffect, useMemo, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

const AddModalScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const { reminders, updateReminder } = useReminders();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const reminder = reminders.find((r) => r.id === id);

    if (!reminder) return;

    setName(reminder.name);
    setDescription(reminder.description);
    setDate(reminder.date);
  }, [id, reminders]);

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

  const onSave = async () => {
    updateReminder(id as string, name, description, date);
    router.replace('/');
  };

  if (!name) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

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
          initialDate={date}
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
        <Button text="Save" onPress={onSave} disabled={!name || !date} />
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
