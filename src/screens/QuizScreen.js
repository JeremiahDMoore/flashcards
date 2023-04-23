import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { db, auth } from '../utils/firebase';

const QuizScreen = ({ route, getDecksData, setDecksData }) => {
  // Access the 'decksData' parameter from the route object
  const { decksData, deckId } = route.params;
  // Create state variables to keep track of the current question index and whether the answer is being shown
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [endOfDeck, setEndOfDeck] = useState(false);
  console.log(decksData[currentQuestionIndex].id)

  // Access the 'question' and 'answer' keys from the decksData array
  const questions = decksData.map((deck) => deck.question);
  const answers = decksData.map((deck) => deck.answer);

  // Define a function to toggle the 'showAnswer' state variable
  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  const handleDeleteQuestion = async () => {
    try {
      // Check that there is a current user and deck data is loaded
      if (!auth.currentUser) {
        console.log('No user logged in.');
        return;
      }
      if (!decksData || decksData.length === 0) {
        console.log('No deck data available.');
        return;
      }
      if (currentQuestionIndex == undefined) {
        currentQuestionIndex === 0;
        return;
      }
  
      // Get the current user's ID and deck ID
      const userId = auth.currentUser.uid;
      const deckId = decksData[currentQuestionIndex].id;
  
      // Show a confirmation prompt before deleting the deck
      const confirmed = window.confirm('Are you sure you want to delete this deck?');
      if (!confirmed) {
        return;
      }
  
      // Delete the current deck from the database
      const deckRef = db.collection(`users/${userId}/decks`).doc(deckId);
      await deckRef.delete();
  
      // Update the decksData state variable
      getDecksData();
    } catch (error) {
      console.log(error);
    }
  };
    // Define a function to handle going to the next question or starting over
  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    setShowAnswer(false);
  };

  // Render the current question and the 'Show Answer' button
  return (
    <View style={styles.container}>
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
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E2431',
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