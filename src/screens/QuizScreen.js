import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase';

const QuizScreen = ({ route }) => {
  const { decksData } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const userId = auth.currentUser.uid;

  const questions = decksData.map((deck) => deck.question);
  const answers = decksData.map((deck) => deck.answer);

  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleDeleteQuestion = async () => {
    try {
      const deckId = decksData[currentQuestionIndex]?.id;
      const deckDocRef = doc(db, `users/${userId}/decks/${deckId}`);

      const docSnap = await getDoc(deckDocRef);
      if (docSnap.exists()) {
        await deleteDoc(deckDocRef);
        Alert.alert('🗑️', 'Q and A deleted');
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        }
      } else {
        console.log('No such document exists');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    setShowAnswer(false);
  };

  // If there's no data, return "NO DATA"
  if (!decksData || decksData.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>DECK IS EMPTY</Text>
        <Text style={{ color: '#fff'}}>Please add or select a new deck</Text>
      </View>
    );
  }

// ...
// Render the current question and the 'Show Answer' button
return (
  // We wrap everything in the ScrollView
  <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: '#0E2431' }} >
    <Text style={styles.questionText}>Question:</Text>
      <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
      {!showAnswer && (
        <Button title="Show Answer" onPress={toggleShowAnswer} />
      )}
      {showAnswer && (
        <>
        <View>
          <Text style={styles.answerText}>Answer:</Text>
          <Text style={styles.answer}>{answers[currentQuestionIndex]}</Text>
      
        <Button title="Delete Question" onPress={handleDeleteQuestion} />
        </View>
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title={
            currentQuestionIndex === questions.length - 1
              ? 'Start Over'
              : 'Next Question'
          }
          onPress={handleNextQuestion}
        />
      </View>
  </ScrollView>
);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E2431',
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#0E2431'
  },
  noDataText: {
    fontSize: 32,
    color: 'red',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 8,
    color: '#000',

  },
  answerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#fff',

  },
  answer: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 8,
    color: '#000',

  },
  buttonContainer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
    
  },
});

export default QuizScreen;