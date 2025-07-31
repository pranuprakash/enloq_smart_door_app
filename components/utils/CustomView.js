import React from 'react';
import { KeyboardAvoidingView, Keyboard, StyleSheet, Platform, TouchableWithoutFeedback, ScrollView } from "react-native";
import Theme from '../../src/Theme';

const CustomView = ({ children, backgroundColor }) => {
  const keyboardAvoidingBehavior = Platform.OS === 'ios' ? 'padding' : null;

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (

      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: 'white' }]}
        behavior={keyboardAvoidingBehavior}
        enabled
      >
         {children}
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

export default CustomView;
