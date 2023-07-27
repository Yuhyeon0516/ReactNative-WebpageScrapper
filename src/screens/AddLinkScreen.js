import { View } from "react-native";
import React, { useCallback, useState } from "react";
import { Header } from "../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import SingleLineInput from "../components/SingleLineInput";
import { CustomButton } from "../components/CustomButton";
import { Typography } from "../components/Typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacer } from "../components/Spacer";

export default function AddLinkScreen() {
  const safeAreaInset = useSafeAreaInsets();
  const navigation = useNavigation();
  const [url, setUrl] = useState("");
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="Add Link" />
        </Header.Group>
        <Header.Icon iconName="close" onPress={onPressClose} />
      </Header>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
        <SingleLineInput value={url} onChangeText={setUrl} placeholder={"https://example.com"} />
      </View>
      <CustomButton>
        <View style={{ backgroundColor: !url ? "gray" : "black" }}>
          <View style={{ height: 52, alignItems: "center", justifyContent: "center" }}>
            <Typography color={"white"} fontSize={18}>
              Save
            </Typography>
          </View>
          <Spacer space={safeAreaInset.bottom} />
        </View>
      </CustomButton>
    </View>
  );
}
