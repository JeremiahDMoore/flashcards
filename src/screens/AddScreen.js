// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
// import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
// import { db } from '../utils/firebase';

// const AddScreen = () => {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');

//   const handleAddDeck = async () => {
//     try {
//       const decksCollectionRef = collection(db, 'decks');
//       const newDeckRef = doc(decksCollectionRef);

//       const currentDate = serverTimestamp();

//       await setDoc(newDeckRef, {
//         question: question,
//         answer: answer,
//         date: currentDate,
//       });

//       setQuestion('');
//       setAnswer('');
//       console.log('Deck added successfully');
//     } catch (error) {
//       console.error('Error adding deck', error);
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//     <View style={styles.container}>
        
//       <TextInput
//         style={styles.text}
//         multiline={true}
//         placeholder="Enter question"
//         value={question}
//         onChangeText={setQuestion}
//       />
//       <TextInput
//         style={styles.text}
//         multiline={true}
//         placeholder="Enter answer"
//         value={answer}
//         onChangeText={setAnswer}
//       />
//       <Button title="Add Q&A to Deck" onPress={handleAddDeck} />
      
//     </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: '#0E2431'
//     },
//     text: {
//       padding: 10,
//       borderRadius: 5,
//       borderWidth: 1,
//       borderColor: 'black',
//       width: '80%',
//       textAlign: 'center',
//       fontSize: 22,
//       marginBottom: 10,
//       backgroundColor: '#EBF8FF'
//     },
//   });

// export default AddScreen;
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { doc, setDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../utils/firebase';

const AddScreen = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [user] = useAuthState(auth);

  const handleAddDeck = async () => {
    try {
      const decksCollectionRef = collection(db, `users/${user.uid}/decks`);
      const newDeckRef = await addDoc(decksCollectionRef, {
        question: question,
        answer: answer,
        date: serverTimestamp(),
      });

      setQuestion('');
      setAnswer('');
      console.log('Deck added successfully with ID:', newDeckRef.id);
    } catch (error) {
      console.error('Error adding deck', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
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
        <Button title="Add Q&A to Deck" onPress={handleAddDeck} />
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
