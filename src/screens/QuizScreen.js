import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { collection, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase';
import DecksScreen from './DecksScreen';

const QuizScreen = ({ route, getDecksData, setDecksData }) => {
  // Access the 'decksData' parameter from the route object
  const { decksData, deckId } = route.params;
  // Create state variables to keep track of the current question index and whether the answer is being shown
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [endOfDeck, setEndOfDeck] = useState(false);
  // console.log(decksData[currentQuestionIndex].id)

  // Access the 'question' and 'answer' keys from the decksData array
  const questions = decksData.map((deck) => deck.question);
  const answers = decksData.map((deck) => deck.answer);
  // Define a function to toggle the 'showAnswer' state variable
  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const userId = auth.currentUser.uid;
  console.log("userId " + userId)
  // ...

  const handleDeleteQuestion = async () => {
    try {
      // Get the current user's ID and deck ID
      const deckId = decksData[currentQuestionIndex].id;
      console.log("questions  " + questions.length)
      console.log("deckId " + deckId)

      // Get the question and answer ID of the current question being viewed
      const questionId = decksData[currentQuestionIndex].question;
      console.log("questionId " + questionId)
      const answerId = decksData[currentQuestionIndex].answer;
      console.log("answerId " + answerId)
      const deckDocRef = doc(db, `users/${userId}/decks/${deckId}`);

      // Check if document exists
      const docSnap = await getDoc(deckDocRef);
        // If the document exists, delete it
        if (docSnap.exists() ) {
          await deleteDoc(deckDocRef);
          Alert.alert('🗑️', 'Q and A deleted');
        } else {
          navigator.navigate('DecksScreen')
          console.log('No such document exists');
          return;
        }
      // const deckDocRef = doc(db, `users/${userId}/decks/${deckId}`);
      // await deleteDoc(deckDocRef);
      // Alert.alert('🗑️', 'Q and A deleted');
      var numberOfQuestions = questions.length;
      console.log("numberOfQuestions " + numberOfQuestions)
      if (questions.length > 0) {
        if (currentQuestionIndex === questions.length) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
          setCurrentQuestionIndex(0);

        }
      } else {
        setEndOfDeck(true);
        console.log("Current question index " + currentQuestionIndex)

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
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
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