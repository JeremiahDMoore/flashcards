import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { auth } from "../utils/firebase";
import * as Font from 'expo-font';
import LinkButton from '../components/LinkButton';

function HomeScreen({ navigation }) {
  const [fontLoaded, setFontLoaded] = React.useState(false);

  // Add state to hold the logged in user's email
  const [userEmail, setUserEmail] = React.useState('');

  const loadFont = async () => {
    await Font.loadAsync({
      'RobotoMono-Regular': require('../../assets/fonts/RobotoMono-Regular.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFont();

    // Check if a user is currently logged in
    if(auth.currentUser) {
      // If a user is logged in, set the email in state
      setUserEmail(auth.currentUser.email);
    }

  }, []);

  const signOut = async () => {
    auth.signOut();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  return (
    <View 
      style={{ 
        backgroundColor: '#0E2431',
        flex: 1,  
        alignItems: 'center' 
        }}>
      {fontLoaded ? (
        <Text 
          style={{
            fontSize: 60,
            fontFamily: 'RobotoMono-Regular',
            paddingTop: 50,
            paddingBottom: 30,
            color: '#ddd',
            textShadowColor: 'rgba(93, 222, 127, 0.75)',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 3
          }}>100devs</Text>   
      ) : null}
      <Image 
        source={ require('../../assets/leon.jpeg') } 
        style={{ 
          width: 225, 
          height: 225, 
          borderTopLeftRadius: 999,
          borderTopRightRadius: 999,
          borderBottomLeftRadius: 999,
          borderBottomRightRadius: 999,
          overflow: 'hidden',
          borderColor: '#333',
          // borderColor: 'rgba(100, 225, 140, 0.94)',
          borderWidth: 1,
          resizeMode: 'cover',
          top: 0, 
          }} />
        {fontLoaded ? (
        <Text 
          style={{
            fontSize: 20,
            fontFamily: 'RobotoMono-Regular',
            paddingTop: 20,
            paddingBottom: 30,
            color: '#ddd',
            textShadowColor: 'rgba(93, 222, 127, 0.75)',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 1
          }}>Flashcards Study App</Text>   
      ) : null}

{fontLoaded && userEmail ? (
        <Text 
          style={{
            fontSize: 16,
            fontFamily: 'RobotoMono-Regular',
            paddingTop: 20,
            paddingBottom: 30,
            color: '#ddd',
            textShadowColor: 'rgba(93, 222, 127, 0.75)',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 1
          }}>User: {userEmail}</Text>   
      ) : null}
      <LinkButton url="https://leonnoel.com/100devs/" buttonText="More Information" />

    </View>
  );
}

export default HomeScreen;
