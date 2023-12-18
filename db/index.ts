import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';
import { Reminder } from '../types';

export const db = SQLite.openDatabase('birthdayreminders.db');

export const setupDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS reminders (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        date TEXT NOT NULL
      )`
    );
  });
};

export const fetchReminders = () =>
  new Promise<Reminder[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM reminders',
        [],
        (_, { rows }) => resolve(rows._array),
        () => {
          reject();
          return false;
        }
      );
    });
  });

export const addReminder = (name: string, description: string, date: string) =>
  new Promise<string>((resolve, reject) => {
    const reminderId = uuid.v4() as string;
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO reminders (id, name, description, date) VALUES (?, ?, ?, ?)',
        [reminderId, name, description, date],
        () => {
          // TODO: Schedule Push Notification for the specified date here

          resolve(reminderId);
        },
        () => {
          reject();
          return false;
        }
      );
    });
  });

export const deleteReminder = (id: string) =>
  new Promise<string>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM reminders where id = ?',
        [id],
        () => {
          resolve(id);
        },
        () => {
          reject();
          return false;
        }
      );
    });
  });
