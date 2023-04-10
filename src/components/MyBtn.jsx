import React from "react";
import { TouchableOpacity, Text } from "react-native";

function MyBtn({ text, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#43A3CC",
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
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default MyBtn;
