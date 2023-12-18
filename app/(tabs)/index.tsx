import CreateButton from '../../components/CreateButton';
import moment from 'moment';
import { StyleSheet, Text, ScrollView, View, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useReminders } from '../../context/RemindersContext';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  const { reminders, deleteReminder } = useReminders();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {reminders.map((r) => (
        <View style={styles.reminderContainer} key={r.id}>
          <Text style={styles.date}>{moment(r.date).format('Do MMMM')}</Text>
          <Link href={'/edit/' + r.id} asChild>
            <Pressable style={styles.reminder} android_ripple={{ color: '#272127' }}>
              <View>
                <Text style={styles.name}>{r.name}</Text>
                {r.description && <Text style={styles.description}>{r.description}</Text>}
              </View>
              <Pressable style={styles.delete} onPress={() => deleteReminder(r.id)}>
                <FontAwesome name="trash" color="#943535" size={18} />
              </Pressable>
            </Pressable>
          </Link>
        </View>
      ))}
      <CreateButton href="/add" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reminderContainer: {
    width: '100%',
    marginTop: 20,
  },
  date: {
    fontSize: 24,
    marginBottom: 8,
  },
  reminder: {
    backgroundColor: '#181818',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 4,
    color: '#c0c0c0',
  },
  delete: {
    marginLeft: 'auto',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
});
