import { AppRegistry, StatusBar, View } from 'react-native';
import App from './App';


    return (
      <>
        <StatusBar barStyle="dark-content" />
        <View style={{ backgroundColor: 'red', flex: 1 }}>
        </View>
      </>
    );
  
  

AppRegistry.registerComponent('firebase-rn', () => App);
