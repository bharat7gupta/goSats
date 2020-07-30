import React, { Component } from 'react';
import {
  Pressable,
  StatusBar,
  Text,
} from 'react-native';

class App extends Component {

  render(): React.ReactNode {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Pressable
          style={{paddingVertical: 20, backgroundColor: '#841584'}}
          accessibilityLabel="Learn more about this purple button"
          android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', radius: 0 }}
        >
          <Text>
            Click!
          </Text>
        </Pressable>
      </>
    );
  }
}

export default App;
