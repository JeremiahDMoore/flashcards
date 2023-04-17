import { createStackNavigator } from '@react-navigation/stack';
// import DecksScreen from '../screens/DecksScreen';
import QuizScreen from '../screens/QuizScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="DecksScreen" component={DecksScreen} /> */}
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
