import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { auth, db, app } from '../utils/firebase';

const AddScreen = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAddDeck = async () => {
    try {
      const decksCollectionRef = db.collection('decks');
      const newDeckRef = decksCollectionRef.doc();

      const currentDate = new Date().toISOString();

      await newDeckRef.set({
        question: question,
        answer: answer,
        date: currentDate,
      });

      setQuestion('');
      setAnswer('');
      console.log('Deck added successfully');
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

// const AddScreen = () => {
//   const [title, setTitle] = useState('');
//   const [questions, setQuestions] = useState([{ question: '', answer: '', flag: 'easy' }]);

//   const handleTitleChange = (text) => {
//     setTitle(text);
//   };

//   const handleQuestionChange = (text, index) => {
//     const newQuestions = [...questions];
//     newQuestions[index].question = text;
//     setQuestions(newQuestions);
//   };

//   const handleAnswerChange = (text, index) => {
//     const newQuestions = [...questions];
//     newQuestions[index].answer = text;
//     setQuestions(newQuestions);
//   };

//   const handleFlagChange = (text, index) => {
//     const newQuestions = [...questions];
//     newQuestions[index].flag = text;
//     setQuestions(newQuestions);
//   };

//   const handleAddQuestion = () => {
//     setQuestions([...questions, { question: '', answer: '', flag: 'easy' }]);
//   };

//   const handleSaveDeck = () => {
//     if (title && questions.length > 0) {
//       const db = firebase.firestore();
//       const deckRef = db.collection('decks').doc();
//       const batch = db.batch();

//       batch.set(deckRef, { title });

//       questions.forEach((question) => {
//         const questionRef = deckRef.collection('questions').doc();
//         batch.set(questionRef, question);
//       });

//       batch.commit()
//         .then(() => {
//           console.log('Deck saved successfully!');
//           setTitle('');
//           setQuestions([{ question: '', answer: '', flag: 'easy' }]);
//         })
//         .catch((error) => {
//           console.log('Error saving deck: ', error);
//         });
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//     <View style={styles.container}>
//       <TextInput style={styles.text}
//         placeholder="Enter deck title"
//         value={title}
//         onChangeText={handleTitleChange}
//       />
//       {questions.map((question, index) => (
//         <View key={index}>
//           <TextInput style={styles.text}
//             placeholder={`Enter question ${index + 1}`}
//             value={question.question}
//             onChangeText={(text) => handleQuestionChange(text, index)}
//           />
//           <TextInput style={styles.text}
//             placeholder={`Enter answer ${index + 1}`}
//             value={question.answer}
//             onChangeText={(text) => handleAnswerChange(text, index)}
//           />
         
//         </View>
//       ))}
//       <Button title="Add Question" onPress={handleAddQuestion} />
//       <Button title="Save Deck" onPress={handleSaveDeck} />
//     </View>
//     </TouchableWithoutFeedback>
//   );
// };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0E2431'
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
      backgroundColor: '#EBF8FF'
    },
  });

export default AddScreen;
