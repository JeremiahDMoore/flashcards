import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { db, auth } from '../utils/firebase';
import DecksScreen from './DecksScreen';

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
      // Get the current user's ID and deck ID
      const userId = auth.currentUser.uid;
      console.log("userId " + userId)
      const deckId = decksData[currentQuestionIndex].id;
      console.log("questions  " + questions.length)
      console.log("deckId " + deckId)
  
      // Get the question and answer ID of the current question being viewed
      const questionId = decksData[currentQuestionIndex].question;
      console.log("questionId " + questionId)
      const answerId = decksData[currentQuestionIndex].answer;
      console.log("answerId " + answerId)
  
      // Delete the current question and answer from the database
      // const questionRef = db.collection(`users/${userId}/decks/${deckId}/questions`).doc(questionId);
      // console.log("questionRef " + questionRef)
      // const answerRef = db.collection(`users/${userId}/decks/${deckId}/answers`).doc(answerId);
      // console.log("answerRef " + answerRef)
      // await questionRef.delete();
      // await answerRef.delete();
      // Remove the deleted question and answer from the decksData state variable
      // decksData[currentQuestionIndex].questions.splice(currentQuestionIndex, 1);
      // decksData[currentQuestionIndex].answers.splice(currentQuestionIndex, 1);
  
      // If there are more questions in the deck, display the next question. Otherwise, display a message indicating that there are no more questions in the deck.

      const deckRef = db.collection(`decks/${deckId}`);
      console.log("deckRef " + deckRef)

      var numberOfQuestions = questions.length;
      console.log("numberOfQuestions " + numberOfQuestions)
      if (questions.length > 0) {
        if (currentQuestionIndex === questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
       console.log("Current question index " + currentQuestionIndex)
      } else {
        setEndOfDeck(true);
      }
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