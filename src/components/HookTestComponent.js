import React, { useMemo } from "react";
import { View } from "react-native";
import { Typography } from "./Typography";

export function HookTestComponent({ a, b }) {
  const text = useMemo(() => {
    return a + b;
  }, [a, b]);

  return (
    <View>
      <Typography>결과값 : {text}</Typography>
    </View>
  );
}
