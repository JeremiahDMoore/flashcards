// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { collection, onSnapshot, query } from 'firebase/firestore';
// import { db } from '../utils/firebase';

// const DecksScreen = () => {
//   const [decks, setDecks] = useState([]);

//   useEffect(() => {
//     const decksCollectionRef = collection(db, 'decks');
//     const decksQuery = query(decksCollectionRef);

//     const unsubscribe = onSnapshot(decksQuery, (querySnapshot) => {
//       const decksData = [];

//       querySnapshot.forEach((documentSnapshot) => {
//         decksData.push({
//           ...documentSnapshot.data(),
//           key: documentSnapshot.id,
//         });
//       });

//       setDecks(decksData);
//     });

//     return unsubscribe;
//   }, []);

//   const renderDeck = ({ item }) => (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={() => {
//         console.log(`Deck with id ${item.key} pressed`);
//       }}>
//       <Text style={styles.title}>{item.question}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList data={decks} renderItem={renderDeck} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#0E2431',
//   },
//   item: {
//     backgroundColor: '#EBF8FF',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 22,
//     textAlign: 'center',
//   },
// });

// export default DecksScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../utils/firebase';

const DecksScreen = () => {
  const [decks, setDecks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchDecks = async () => {
      const user = auth.currentUser;
      if (user) {
        const decksRef = collection(db, `users/${user.uid}/decks`);
        const q = query(decksRef);
        const querySnapshot = await getDocs(q);
        const deckList = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setDecks(deckList);
      }
    };

    fetchDecks();
  }, []);

  const currentDeck = decks[currentIndex];

  const showAnswer = () => {
    const updatedDeck = { ...currentDeck, showAnswer: true };
    const updatedDecks = [...decks];
    updatedDecks[currentIndex] = updatedDeck;
    setDecks(updatedDecks);
  };

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const startOver = () => {
    setCurrentIndex(0);
    const updatedDecks = decks.map((deck) => ({ ...deck, showAnswer: false }));
    setDecks(updatedDecks);
  };

  return (
    <View style={styles.container}>
      {decks.length === 0 && (
        <Text style={styles.message}>You have no decks yet</Text>
      )}
      {decks.length > 0 && currentDeck && (
        <View>
          <Text style={styles.title}>{currentDeck.question}</Text>
          {currentDeck.showAnswer && (
            <Text style={styles.description}>{currentDeck.answer}</Text>
          )}
          {!currentDeck.showAnswer && (
            <Button title="Show Answer" onPress={showAnswer} />
          )}
        </View>
      )}
      {decks.length > 1 && currentIndex < decks.length - 1 && (
        <Button title="Next Question" onPress={nextQuestion} />
      )}
      {currentIndex === decks.length - 1 && (
        <Button title="Start Over" onPress={startOver} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E2431',
  },
  message: {
    fontSize: 18,
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
});

export default DecksScreen;
