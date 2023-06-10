import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Cart from './src/screens/Cart';
import Checkout from './src/screens/Checkout';
type Props = {};

const App = (props: Props) => {
  const RootStack = createNativeStackNavigator();
  const CartStack=()=>{
    return <RootStack.Navigator>
      <RootStack.Screen name='Cart' component={Cart}/>
      <RootStack.Screen name='Checkout' component={Checkout}/>
    </RootStack.Navigator>
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <RootStack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <RootStack.Screen name="CartStack" component={CartStack} options={{headerShown:false}} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
