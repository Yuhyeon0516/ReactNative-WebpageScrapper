import { View } from "react-native";
import React, { useCallback } from "react";
import { Header } from "../components/Header/Header";
import { Spacer } from "../components/Spacer";
import { useNavigation, useRoute } from "@react-navigation/native";
import WebView from "react-native-webview";

export default function LinkDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName="arrow-back" onPress={onPressBack} />
          <Spacer space={12} horizontal />
          <Header.Title title="Link Detail" />
        </Header.Group>
      </Header>
      <WebView style={{ flex: 1 }} source={{ uri: route.params.item.link }} />
    </View>
  );
}
