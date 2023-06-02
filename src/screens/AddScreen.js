import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { doc, setDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../utils/firebase';
import MyBtn from '../components/MyBtn';

const AddScreen = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [deckTitle, setDeckTitle] = useState('');

  const [user] = useAuthState(auth);

  const handleAddDeck = async () => {
    if (question === '' || answer === '' || deckTitle === '') {
      Alert.alert('Error', 'Please enter question, answer, and deck title');
    } else {
      try {
        const decksCollectionRef = collection(db, `users/${user.uid}/decks`);
        const newDeckRef = await addDoc(decksCollectionRef, {
          question: question,
          answer: answer,
          date: serverTimestamp(),
          deckTitle: deckTitle,
        });

        setQuestion('');
        setAnswer('');
        console.log('Deck added successfully with ID:', newDeckRef.id);
      } catch (error) {
        console.error('Error adding deck', error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TextInput
          style={styles.text}
          multiline={true}
          placeholder={deckTitle === '' ? 'Deck Title' : deckTitle}
          value={deckTitle}
          onChangeText={setDeckTitle}
        />
        <TextInput
          style={styles.text}
          multiline={true}
          placeholder="Enter question"
          value={question}
          onChangeText={setQuestion}
        />
        <TextInput
          style={styles.text}
          multiline={true}
          placeholder="Enter answer"
          value={answer}
          onChangeText={setAnswer}
        />
        <MyBtn text="Add Q&A to Deck" onPress={handleAddDeck} disabled={question === '' || answer === '' || deckTitle === ''} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E2431',
  },
  text: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 10,
    backgroundColor: '#EBF8FF',
  },
});

export default AddScreen;
