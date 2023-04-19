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

  // Access the 'question' and 'answer' keys from the decksData array
  const questions = decksData.map((deck) => deck.question);
  const answers = decksData.map((deck) => deck.answer);

  // Define a function to toggle the 'showAnswer' state variable
  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  // Define a function to handle deleting the current question from the database
  const handleDeleteQuestion = async () => {
    try {
      await db.collection('decks').doc(deckId).delete();
      
      const updatedDecksData = await getDecksData();
  
      // If there are no more questions left in the deck, set the current question index back to 0
      if (updatedDecksData[deckId].questions.length === 0) {
        setCurrentQuestionIndex(0);
        setShowAnswer(false);
        setEndOfDeck(true);
      }
  
      setDecksData(updatedDecksData);
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
        <View>
          <Text style={styles.answerText}>Answer:</Text>
          <Text style={styles.answer}>{answers[currentQuestionIndex]}</Text>
          <Button title="Delete Question" onPress={handleDeleteQuestion} />
        </View>
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
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  answerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  answer: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
  },
});

export default QuizScreen;
