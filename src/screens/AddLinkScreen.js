import { View } from "react-native";
import React, { useCallback, useState } from "react";
import { Header } from "../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import SingleLineInput from "../components/SingleLineInput";
import { CustomButton } from "../components/CustomButton";
import { Typography } from "../components/Typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Spacer } from "../components/Spacer";
import { useSetRecoilState } from "recoil";
import { atomLinkList } from "../states/atomLinkList";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddLinkScreen() {
  const updateList = useSetRecoilState(atomLinkList);
  const safeAreaInset = useSafeAreaInsets();
  const navigation = useNavigation();
  const [url, setUrl] = useState("");
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressSave = useCallback((url) => {
    if (!url) return;

    updateList((prev) => {
      const list = [
        {
          title: "",
          image: "",
          link: url,
          createdAt: new Date().toISOString(),
        },
      ];

      return {
        list: list.concat(prev.list),
      };
    });

    setUrl("");
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
      <CustomButton onPress={() => onPressSave(url)}>
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
