import React from 'react';
import { Button, Linking } from 'react-native';

const LinkButton = ({ url, buttonText }) => {
  const handleButtonPress = async () => {
    // Check if the link is supported
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" or "https" the web opens
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <Button title={buttonText} onPress={handleButtonPress} />
  );
};

export default LinkButton;
