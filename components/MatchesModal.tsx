import Button from '../components/Button';
import colors from '../constants/colors';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { MarkedDates } from 'react-native-calendars/src/types';
import { Calendar } from 'react-native-calendars';
import { useEffect, useMemo, useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
}

const MatchesModal = ({ open, onClose, onSelect }: Props) => {
  const [date, setDate] = useState('');

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

  // Reset date on opening dialog
  useEffect(() => {
    if (open) setDate('');
  }, [open]);

  return (
    <Modal visible={open} animationType="fade" onRequestClose={onClose} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
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
          <Button
            text="Find a match"
            onPress={() => {
              onSelect(new Date(date));
              onClose();
            }}
            disabled={!date}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modal: {
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

export default MatchesModal;
