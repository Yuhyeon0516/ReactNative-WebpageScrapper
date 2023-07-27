import React from "react";
import { Text as RNText } from "react-native";

export function Typography({ color, fontSize, children }) {
  return (
    <RNText
      style={{
        color: color,
        fontSize: fontSize,
      }}
    >
      {children}
    </RNText>
  );
}
