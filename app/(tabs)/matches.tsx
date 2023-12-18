import MatchesModal from '../../components/MatchesModal';
import Button from '../../components/Button';
import { Image, StyleSheet, View, Text } from 'react-native';
import { getRandomPersonWithBirthday } from '../../api';
import { useEffect, useState } from 'react';
import { Person } from '../../types';

const MatchesScreen = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!date) return;

      try {
        const person = await getRandomPersonWithBirthday(date);
        setPerson(person);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [date]);

  return (
    <View style={styles.container}>
      {person && (
        <>
          <Text style={styles.personName}>{person.name}</Text>
          <Text style={styles.personExtract}>{person.extract}</Text>
          <Image style={styles.personImage} source={{ uri: person.image }} resizeMode="contain" />
        </>
      )}

      <Button text="Pick a date" onPress={() => setOpen(true)} />
      <MatchesModal open={open} onClose={() => setOpen(false)} onSelect={(d) => setDate(d)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  personExtract: {
    marginVertical: 20,
    color: '#e2e2e2',
    fontSize: 16,
  },
  personImage: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 5,
    height: 300,
  },
});

export default MatchesScreen;
