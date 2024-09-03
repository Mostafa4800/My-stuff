import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function App() {
  const handleButtonClick = () => {
    // Handle button click logic here
    console.log('Button clicked!');
  };

  return (
    <View style={styles.container}>
      <Text>So it's working now?</Text>
      <Text>Yes, it is.</Text>
      <StatusBar style="auto" />
      <Button title="Click Me" onPress={handleButtonClick}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
