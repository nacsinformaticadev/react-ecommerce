import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthSreen from "./src/screens/AuthScreen"


export default function App() {
  
  const [auth,setAuth] = useState (undefined);
    
  return (
    <PaperProvider style={"backgroundColor:'#8c3e34'"}>
      {auth ? <Text>Zona De usuarios</Text> : <AuthSreen></AuthSreen>}
    </PaperProvider>
  ); 
}

const styles = StyleSheet.create({});
 