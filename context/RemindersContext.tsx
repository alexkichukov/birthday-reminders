import moment from 'moment';
import { fetchReminders, addReminder, deleteReminder, updateReminder } from '../db';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { Reminder } from '../types';

interface Context {
  reminders: Reminder[];
  addReminder: (name: string, description: string, date: string) => void;
  updateReminder: (id: string, name: string, description: string, date: string) => void;
  deleteReminder: (id: string) => void;
}

export const RemindersContext = createContext<Context>({
  reminders: [],
  addReminder: (name: string, description: string, date: string) => {},
  updateReminder: (id: string, name: string, description: string, date: string) => {},
  deleteReminder: (id: string) => {},
});

const RemindersContextProvider = ({ children }: { children: ReactNode }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const orderedReminders = useMemo(() => {
    if (reminders.length === 0) return reminders;

    const todaysDay = moment().dayOfYear();
    const ordered = reminders.sort(
      (a, b) => moment(a.date).dayOfYear() - moment(b.date).dayOfYear()
    );
    const indexOfClosestDate = ordered.findIndex((r) => moment(r.date).dayOfYear() >= todaysDay);

    if (indexOfClosestDate < 0) return ordered;

    return [...ordered.slice(indexOfClosestDate), ...ordered.slice(0, indexOfClosestDate)];
  }, [reminders]);

  useEffect(() => {
    const loadNotes = async () => {
      const reminders = await fetchReminders();
      setReminders(reminders);
    };
    loadNotes();
  }, []);

  // Add reminder
  const add = async (name: string, description: string, date: string) => {
    const id = await addReminder(name, description, date);
    setReminders((prev) => [...prev, { id, name, description, date }]);
    ToastAndroid.show('Successfully added reminder!', ToastAndroid.SHORT);
  };

  // Update reminder
  const update = async (id: string, name: string, description: string, date: string) => {
    await updateReminder(id, name, description, date);
    setReminders((prev) => {
      const newReminders = [...prev];
      const editIndex = newReminders.findIndex((r) => r.id === id);
      newReminders[editIndex].name = name;
      newReminders[editIndex].date = date;
      newReminders[editIndex].description = description;
      return newReminders;
    });
    ToastAndroid.show('Successfully updated reminder!', ToastAndroid.SHORT);
  };

  // Delete reminder
  const del = async (id: string) => {
    await deleteReminder(id);
    setReminders((prev) => [...prev.filter((r) => r.id !== id)]);
    ToastAndroid.show('Successfully deleted reminder!', ToastAndroid.SHORT);
  };

  const value = {
    reminders: orderedReminders,
    addReminder: add,
    updateReminder: update,
    deleteReminder: del,
  };

  return <RemindersContext.Provider value={value}>{children}</RemindersContext.Provider>;
};

export const useReminders = () => {
  const value = useContext(RemindersContext);
  return value;
};

export default RemindersContextProvider;
