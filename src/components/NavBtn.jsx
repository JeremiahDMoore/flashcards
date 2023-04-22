import React from "react";
import { TouchableOpacity, Text } from "react-native";

function NavBtn({ text, onPress }) {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        alignItems: "center",
        backgroundColor: "#43A3CC",
        padding: 20,
        borderRadius: 999,
        marginBottom: 20,
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

export default NavBtn;
