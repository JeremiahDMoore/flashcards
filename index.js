import { AppRegistry, StatusBar, View } from 'react-native';
import App from './App';


    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={{ backgroundColor: 'red', flex: 1 }}>
          {/* Your app's content goes here */}
        </View>
      </>
    );
  
  

AppRegistry.registerComponent('firebase-rn', () => App);
