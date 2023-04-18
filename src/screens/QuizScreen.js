import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const QuizScreen = ({ route }) => {
// Access the 'decksData' parameter from the route object
const { decksData } = route.params;

// Create state variables to keep track of the current question index and whether the answer is being shown
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [showAnswer, setShowAnswer] = useState(false);

// Access the 'question' and 'answer' keys from the decksData array
const questions = decksData.map((deck) => deck.question);
const answers = decksData.map((deck) => deck.answer);

// Define a function to toggle the 'showAnswer' state variable
const toggleShowAnswer = () => {
setShowAnswer(!showAnswer);
};

// Render the current question and the 'Show Answer' button
return (
<View>
<Text>Question:</Text>
<Text>{questions[currentQuestionIndex]}</Text>
{!showAnswer && (
<Button title="Show Answer" onPress={toggleShowAnswer} />
)}
{showAnswer && (
<View>
<Text>Answer:</Text>
<Text>{answers[currentQuestionIndex]}</Text>
</View>
)}
</View>
);
};

export default QuizScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from '../utils/firebase';

// const QuizScreen = ({ route }) => {
//   const [deckTitle, setDeckTitle] = useState('');
//   const [quizQuestions, setQuizQuestions] = useState([]);

//   useEffect(() => {
//     if (route.params && route.params.deckTitle) {
//       setDeckTitle(route.params.deckTitle);
//       queryAndSetQuizQuestions(route.params.deckTitle);
//     }
//   }, [route.params]);

//   const queryAndSetQuizQuestions = async (deckTitle) => {
//     const q = query(collection(db, 'quizQuestions'), where('deckTitle', '==', deckTitle));
//     const querySnapshot = await getDocs(q);
//     const questions = querySnapshot.docs.map((doc) => doc.data());
//     setQuizQuestions(questions);
//   };

//   const renderQuestion = ({ item }) => {
//     return (
//       <View style={styles.questionContainer}>
//         <Text style={styles.questionText}>{item.question}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.deckTitle}>{deckTitle}</Text>
//       <FlatList
//         data={quizQuestions}
//         renderItem={renderQuestion}
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
//   deckTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#FFFFFF',
//   },
//   questionContainer: {
//     backgroundColor: '#EBF8FF',
//     borderRadius: 5,
//     padding: 16,
//     marginBottom: 16,
//   },
//   questionText: {
//     fontSize: 18,
//     color: '#000000',
//   },
// });

// export default QuizScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db, auth } from '../utils/firebase';

// const QuizScreen = ({ deckTitle }) => {
//   const [decks, setDecks] = useState([]); // State for storing decks
//   const [currentIndex, setCurrentIndex] = useState(0); // State for storing current index

//   useEffect(() => {
//     const fetchDecks = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const decksRef = collection(db, `users/${user.uid}/decks`);
//         const q = query(decksRef, where('deckTitle', '==', deckTitle)); // Only fetch decks with matching deckTitle
//         const querySnapshot = await getDocs(q);
//         const deckList = querySnapshot.docs.map((doc) => {
//           return { id: doc.id, ...doc.data() };
//         });
//         setDecks(deckList); // Fetch decks from Firebase and update state
//       }
//     };

//     fetchDecks();
//   }, [deckTitle]); // Fetch decks only when deckTitle prop changes

//   const currentDeck = decks[currentIndex]; // Get current deck from decks array using current index

//   const showAnswer = () => {
//     const updatedDeck = { ...currentDeck, showAnswer: true }; // Update current deck to show answer
//     const updatedDecks = [...decks]; // Create a copy of decks array
//     updatedDecks[currentIndex] = updatedDeck; // Update the current deck in the copied array
//     setDecks(updatedDecks); // Update state with the copied array
//   };

//   const nextQuestion = () => {
//     setCurrentIndex(currentIndex + 1); // Update current index to move to the next question
//   };

//   const startOver = () => {
//     setCurrentIndex(0); // Reset current index to 0
//     const updatedDecks = decks.map((deck) => ({ ...deck, showAnswer: false })); // Update all decks to hide answers
//     setDecks(updatedDecks); // Update state with updated decks array
//   };

//   return (
//     <View style={styles.container}>
//       {decks.length === 0 && (
//         <Text style={styles.message}>You have no decks yet</Text>
//       )}
//       {decks.length > 0 && currentDeck && (
//         <View>
//           <Text style={styles.title}>{currentDeck.question}</Text>
//           {currentDeck.showAnswer && (
//             <Text style={styles.description}>{currentDeck.answer}</Text>
//           )}
//           {!currentDeck.showAnswer && (
//             <Button title="Show Answer" onPress={showAnswer} />
//           )}
//         </View>
//       )}
//       {decks.length > 1 && currentIndex < decks.length - 1 && (
//         <Button title="Next Question" onPress={nextQuestion} />
//       )}
//       {currentIndex === decks.length - 1 && (
//         <Button title="Start Over" onPress={startOver} />
//       )}
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
//   message: {
//     fontSize: 18,
//     color: 'white',
//   },
//    title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   description: {
//     fontSize: 18,
//     color: 'white',
//     marginTop: 10,
//   },
// });

// export default QuizScreen;
