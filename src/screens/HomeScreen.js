// import React from 'react';
// import { Text, View, Button, Image } from 'react-native';
// import { auth } from "../utils/firebase";
// import { NavigationContainer } from '@react-navigation/native';
// // import AppNavigator from '../components/AppNavigator';

// function HomeScreen({ navigation }) {
// // working on Log Out button to be shown on home screen, right now only bottom nav log out button is working
//   const signOut = async () => {
//     auth.signOut();
//     navigation.reset({ index: 0, routes: [{ name: "Login" }] });
//   };

//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text 
//           style={{
//             fontSize: 30,
//             fontFamily: 'RobotoMono-Regular',
//           }}>100devs Flashcards Study App</Text>
//       <Image 
//         source={ require('../../assets/leon.jpeg') } 
//         style={{ 
//           width: 225, 
//           height: 225, 
//           resizeMode: 'cover',
//           top: 0, 
//           }} />
//         <NavigationContainer independent={true}>
//         <View style={{ backgroundColor: '#1E5A7F'}}>
//         <Button
//           title="Log out"
//           color="#fff"
//           onPress={() => {
//             signOut();
//             console.log('LOGGED OUT')
//           }}
//         />
//         </View>
//         </NavigationContainer>
//         </View>
//     );
//   }

// export default HomeScreen;

import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { auth } from "../utils/firebase";
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import LinkButton from '../components/LinkButton';

function HomeScreen({ navigation }) {
  const [fontLoaded, setFontLoaded] = React.useState(false);

  const loadFont = async () => {
    await Font.loadAsync({
      'RobotoMono-Regular': require('../../assets/fonts/RobotoMono-Regular.ttf'),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFont();
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

<LinkButton url="https://leonnoel.com/100devs/" buttonText="More Information" />
        </View>
    );
  }

export default HomeScreen;
