import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../utils/firebase';
import { useNavigation } from '@react-navigation/native';

const DecksScreen = () => {
  const [decks, setDecks] = React.useState([]);
  const [user] = useAuthState(auth);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, `users/${user.uid}/decks`), orderBy('deckTitle', 'asc')),
      (snapshot) => {
        const decksData = new Map();
        snapshot.forEach((doc) => {
          const deck = { ...doc.data(), id: doc.id };
          const deckTitle = deck.deckTitle;

          if (!decksData.has(deckTitle)) {
            decksData.set(deckTitle, []);
          }

          decksData.get(deckTitle).push(deck);
        });
        
        setDecks(Array.from(decksData, ([deckTitle, decks]) => ({ deckTitle, decks })));
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDeckPress = (deck) => {
    navigation.navigate('QuizScreen', { deckTitle: deck.deckTitle, decksData: deck.decks });
  };

  const renderDeckCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleDeckPress(item)}
      >
        <Text style={styles.cardTitle}>{item.deckTitle}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.deckTitle}>Decks</Text>
      {decks.length === 0 ? (
        <Text style={styles.noDeckText}>Please add a new deck</Text>
      ) : (
        <FlatList
          data={decks}
          renderItem={renderDeckCard}
          keyExtractor={(item) => item.deckTitle}
          contentContainerStyle={styles.listContentContainer}
        />
      )}
    </View>
  );
};

// ... Rest of your code with styles ...


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E2431',
  },
  listContentContainer: {
    width: '100%',
    padding: 16,
  },
  cardContainer: {
    backgroundColor: '#EBF8FF',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deckTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    color: '#EBF8FF',
  },
  noDeckText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    color: '#EBF8FF',
  },
});

export default DecksScreen;
