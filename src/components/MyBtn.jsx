import React from "react";
import { TouchableOpacity, Text } from "react-native";

function MyBtn({ text, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 999,
        width: "80%",
      }}
      onPress={(e) => {
        onPress(e);
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default MyBtn;
