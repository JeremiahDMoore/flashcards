import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { app, auth, db } from '../utils/firebase';

const DecksScreen = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [previousDoc, setPreviousDoc] = useState(null);
  const [next, setNext] = useState(true);

  useEffect(() => {
    // const db = firebase.firestore();
    db.collection('decks')
      .orderBy('date', 'desc')
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setQuestion(doc.data().question);
          setAnswer(doc.data().answer);
          setCurrentDoc(doc);
        });
      })
      .catch(error => console.log(error));
  }, []);

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    // const db = firebase.firestore();
    db.collection('decks')
      .orderBy('date', 'desc')
      .startAfter(currentDoc)
      .limit(1)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach(doc => {
            setQuestion(doc.data().question);
            setAnswer(doc.data().answer);
            setPreviousDoc(currentDoc);
            setCurrentDoc(doc);
            setShowAnswer(false);
            setNext(true)
          });
        } else {
          setNext(false);
        }
      })
      .catch(error => console.log(error));
  };

  const handlePreviousQuestion = () => {
    if (previousDoc) {
      // const db = firebase.firestore();
      db.collection('decks')
        .orderBy('date', 'desc')
        .endBefore(currentDoc)
        .limit(1)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.docs.length > 0) {
            querySnapshot.forEach(doc => {
              setQuestion(doc.data().question);
              setAnswer(doc.data().answer);
              setCurrentDoc(doc);
              setPreviousDoc(null);
              setShowAnswer(false);
              setNext(true);
            });
          } else {
            setNext(false)
          }
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.textQ}>{question}</Text>
        {showAnswer && <Text style={styles.textA}>{answer}</Text>}
        {!showAnswer && (
          <Button title="Show Answer" onPress={handleShowAnswer} />
        )}
        {previousDoc && showAnswer && (
          <Button title="Start Over" onPress={handlePreviousQuestion} />
        )}
        {showAnswer && currentDoc && (
          <Button title="Next Question" onPress={handleNextQuestion} />
        )}
        {showAnswer && currentDoc && next === false && (
          <Text style={styles.textN}>No more questions</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E2431',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textQ: {
    padding: 20,
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',

  },
  textA: {
    fontSize: 24,
    marginBottom: 20,
    color: '#57f542',
  },
  textN: {
    fontSize: 24,
    marginBottom: 20,
    color: 'red',
  }
});

export default DecksScreen;
