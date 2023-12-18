import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { fetchReminders, addReminder, deleteReminder } from '../db';
import { Reminder } from '../types';

interface Context {
  reminders: Reminder[];
  addReminder: (name: string, description: string, date: string) => void;
  deleteReminder: (id: string) => void;
}

export const RemindersContext = createContext<Context>({
  reminders: [],
  addReminder: (name: string, description: string, date: string) => {},
  deleteReminder: (id: string) => {},
  // updateReminder: (id: string, name: string, description: string, date: string) => {},
});

const RemindersContextProvider = ({ children }: { children: ReactNode }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

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
  };

  // Delete reminder
  const del = async (id: string) => {
    await deleteReminder(id);
    setReminders((prev) => [...prev.filter((r) => r.id !== id)]);
  };

  const value = {
    reminders,
    addReminder: add,
    deleteReminder: del,
  };

  return <RemindersContext.Provider value={value}>{children}</RemindersContext.Provider>;
};

export const useReminders = () => {
  const value = useContext(RemindersContext);
  return value;
};

export default RemindersContextProvider;
