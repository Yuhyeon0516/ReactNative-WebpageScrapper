import { View, useWindowDimensions } from "react-native";
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
import { getOpenGraphData } from "../util/OpenGraphTagUtils";
import { RemoteImage } from "../components/RemoteImage";

export default function AddLinkScreen() {
  const updateList = useSetRecoilState(atomLinkList);
  const safeAreaInset = useSafeAreaInsets();
  const navigation = useNavigation();
  const [url, setUrl] = useState("");
  const [metaData, setMetaData] = useState(null);
  const { width } = useWindowDimensions();
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

  const onSubmitEditing = useCallback(async () => {
    const result = await getOpenGraphData(url);
    console.log(result);
    setMetaData(result);
  }, [url]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="Add Link" />
        </Header.Group>
        <Header.Icon iconName="close" onPress={onPressClose} />
      </Header>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", paddingTop: 32, paddingHorizontal: 24 }}>
        <SingleLineInput value={url} onChangeText={setUrl} placeholder={"https://example.com"} onSubmitEditing={onSubmitEditing} />
        {metaData && (
          <>
            <Spacer space={20} />
            <View style={{ borderWidth: 1, borderRadius: 4, borderColor: "gray" }}>
              <RemoteImage url={metaData.image} width={width - 48} height={(width - 48) * 0.5} />
              <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                <Spacer space={10} />
                <Typography fontSize={20} color={"black"}>
                  {metaData.title}
                </Typography>
                <Spacer space={4} />
                <Typography fontSize={16} color={"gray"}>
                  {metaData.description}
                </Typography>
              </View>
            </View>
          </>
        )}
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
