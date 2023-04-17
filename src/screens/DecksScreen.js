import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'; // Import the 'where' function from firestore
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../utils/firebase';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const DecksScreen = () => {
  const [decks, setDecks] = useState([]);
  const [user] = useAuthState(auth);
  const navigation = useNavigation(); // Get the navigation object from the hook

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, `users/${user.uid}/decks`), orderBy('date', 'desc')),
      (snapshot) => {
        const decksData = [];
        const uniqueDecks = new Set();
        snapshot.forEach((doc) => {
          const deck = { ...doc.data(), id: doc.id };
          if (!uniqueDecks.has(deck.deckTitle)) {
            uniqueDecks.add(deck.deckTitle);
            decksData.push(deck);
          }
        });
        setDecks(decksData);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleDeckPress = (deckTitle) => {
    const queryRef = query(
      collection(db, `users/${user.uid}/decks`),
      where('deckTitle', '==', deckTitle)
    );

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const decksData = [];
      snapshot.forEach((doc) => {
        const deck = { ...doc.data(), id: doc.id };
        decksData.push(deck);
      });
      navigation.navigate('QuizScreen', { deckTitle, decksData });
    });

    return () => unsubscribe();
  };

  const renderDeckCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleDeckPress(item.deckTitle)}
      >
        <Text style={styles.cardTitle}>{item.deckTitle}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={decks}
        renderItem={renderDeckCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
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
});

export default DecksScreen;


// import React, { useState, useEffect } from 'react';
// import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db } from '../utils/firebase';
// import { useNavigation } from '@react-navigation/native';

// const DecksScreen = () => {
//   const [decks, setDecks] = useState([]);
//   const [user] = useAuthState(auth);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       query(collection(db, `users/${user.uid}/decks`), orderBy('date', 'desc')),
//       (snapshot) => {
//         const decksData = [];
//         const uniqueDecks = new Set();
//         snapshot.forEach((doc) => {
//           const deck = { ...doc.data(), id: doc.id };
//           if (!uniqueDecks.has(deck.deckTitle)) {
//             uniqueDecks.add(deck.deckTitle);
//             decksData.push(deck);
//           }
//         });
//         setDecks(decksData);
//       }
//     );

//     return () => unsubscribe();
//   }, [user]); // Add user as a dependency

//   const handleDeckPress = (deckTitle) => {
//     navigation.navigate('QuizScreen', { deckTitle });
//   };
  
//   const renderDeckCard = ({ item }) => {
//     return (
//       <TouchableOpacity
//         style={styles.cardContainer}
//         onPress={() => handleDeckPress(item.deckTitle)}
//       >
//         <Text style={styles.cardTitle}>{item.deckTitle}</Text>
//       </TouchableOpacity>
//     );
//   };
  
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={decks}
//         renderItem={renderDeckCard}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContentContainer}
//       />
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
//   listContentContainer: {
//     width: '100%',
//     padding: 16,
//   },
//   cardContainer: {
//           backgroundColor: '#EBF8FF',
//           borderRadius: 5,
//           padding: 16,
//           marginBottom: 16,
//         },
//         cardTitle: {
//           fontSize: 24,
//           fontWeight: 'bold',
//           marginBottom: 8,
//         },
//       });
      
//       export default DecksScreen;


// import React, { useState, useEffect } from 'react';
// import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'; // Import the 'where' function from firestore
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db } from '../utils/firebase';
// import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

// const DecksScreen = () => {
//   const [decks, setDecks] = useState([]);
//   const [user] = useAuthState(auth);
//   const navigation = useNavigation(); // Get the navigation object from the hook

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       query(collection(db, `users/${user.uid}/decks`), orderBy('date', 'desc')),
//       (snapshot) => {
//         const decksData = [];
//         const uniqueDecks = new Set();
//         snapshot.forEach((doc) => {
//           const deck = { ...doc.data(), id: doc.id };
//           if (!uniqueDecks.has(deck.deckTitle)) {
//             uniqueDecks.add(deck.deckTitle);
//             decksData.push(deck);
//           }
//         });
//         setDecks(decksData);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   const handleDeckPress = (deckTitle) => { // Modify the function to accept deckTitle as an argument
//     navigation.navigate('QuizScreen', { deckTitle }); // Navigate to the QuizScreen and pass deckTitle as a parameter
//   };
  
//   const renderDeckCard = ({ item }) => {
//     return (
//       <TouchableOpacity
//         style={styles.cardContainer}
//         onPress={() => handleDeckPress(item.deckTitle)} // Pass the deckTitle as a parameter when calling handleDeckPress
//       >
//         <Text style={styles.cardTitle}>{item.deckTitle}</Text>
//       </TouchableOpacity>
//     );
//   };
  
//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={decks}
//         renderItem={renderDeckCard}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContentContainer}
//       />
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
//   listContentContainer: {
//     width: '100%',
//     padding: 16,
//   },
//   cardContainer: {
//     backgroundColor: '#EBF8FF',
//     borderRadius: 5,
//     padding: 16,
//     marginBottom: 16,
//   },
//   cardTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
// });

// export default DecksScreen;


// import React, { useState, useEffect } from 'react';
// import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, db } from '../utils/firebase';
// import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
// import AppNavigator from '../components/AppNavigator';

// const DecksScreen = () => {
//   const [decks, setDecks] = useState([]);
//   const [selectedDeck, setSelectedDeck] = useState(null);
//   const [user] = useAuthState(auth);
//   const navigation = useNavigation(); // Get the navigation object from the hook

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       query(collection(db, `users/${user.uid}/decks`), orderBy('date', 'desc')),
//       (snapshot) => {
//         const decksData = [];
//         const uniqueDecks = new Set();
//         snapshot.forEach((doc) => {
//           const deck = { ...doc.data(), id: doc.id };
//           if (!uniqueDecks.has(deck.deckTitle)) {
//             uniqueDecks.add(deck.deckTitle);
//             decksData.push(deck);
//           }
//         });
//         setDecks(decksData);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   const handleDeckPress = () => {
//     const title = 'Test deck'
//     navigation.navigate('QuizScreen', { title });
//   };
  
//   const renderDeckCard = ({ item }) => {
//     return (
//       <TouchableOpacity
//         style={styles.cardContainer}
//         onPress={() => handleDeckPress(item.deckTitle)}
//       >
//         <Text style={styles.cardTitle}>{item.deckTitle}</Text>
        
//       </TouchableOpacity>
//     );
//   };
//     return (
//     <View style={styles.container}>
//       <FlatList
//         data={decks}
//         renderItem={renderDeckCard}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContentContainer}
//       />
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
//   listContentContainer: {
//     width: '100%',
//     padding: 16,
//   },
//   cardContainer: {
//     backgroundColor: '#EBF8FF',
//     borderRadius: 5,
//     padding: 16,
//     marginBottom: 16,
//   },
//   cardTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   questionsAndAnswersContainer: {
//     width: '100%',
//     padding: 16,
//   },
//   questionsAndAnswersTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   qaContainer: {
//     backgroundColor: '#333',
//     borderRadius: 5,
//     padding: 16,
//     marginBottom: 16,
//     },
//     questionText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     },
//     answerText: {
//     fontSize: 16,
//     },
// });

// export default DecksScreen;