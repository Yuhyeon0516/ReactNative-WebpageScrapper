import { FlatList, Platform, SectionList, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { Header } from "../components/Header/Header";
import { CustomButton } from "../components/CustomButton";
import { Typography } from "../components/Typography";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "../components/Spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../components/Icons";
import { useRecoilValue } from "recoil";
import { atomLinkList } from "../states/atomLinkList";

export default function LinkListScreen() {
  const data = useRecoilValue(atomLinkList);
  const safeAreaInset = useSafeAreaInsets();
  const navigation = useNavigation();
  const onPressListItem = useCallback((item) => {
    navigation.navigate("LinkDetail", { item });
  }, []);

  const onPressAddButton = useCallback(() => {
    navigation.navigate("AddLink");
  }, []);

  const sectionData = useMemo(() => {
    const dateList = {};

    function makeDateString(createdAt) {
      const dateItem = new Date(createdAt);

      return `${dateItem.getFullYear()}.${dateItem.getMonth()}.${dateItem.getDate()} ${dateItem.getHours()}:${dateItem.getMinutes()}`;
    }

    if (!data.list) return [];

    data.list.forEach((item) => {
      const keyName = makeDateString(item.createdAt);
      if (!dateList[keyName]) {
        dateList[keyName] = [item];
      } else {
        dateList[keyName].push(item);
      }
    });

    return Object.keys(dateList).map((item) => {
      return {
        title: item,
        data: dateList[item],
      };
    });
  }, [data.list]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="Link List" />
        </Header.Group>
      </Header>
      <SectionList
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          return (
            <CustomButton onPress={() => onPressListItem(item)} paddingH={24} paddingV={24}>
              <View>
                <Typography fontSize={20}>{item.link}</Typography>
                <Spacer space={4} />
                <Typography fontSize={16} color={"gray"}>
                  {item.title ? `${item.title.slice(0, 20)} | ` : ""}
                  {new Date(item.createdAt).toLocaleString()}
                </Typography>
              </View>
            </CustomButton>
          );
        }}
        sections={sectionData}
        renderSectionHeader={({ section }) => {
          return (
            <View style={{ paddingHorizontal: 12, paddingVertical: 4, backgroundColor: "white" }}>
              <Typography color={"gray"} fontSize={12}>
                {section.title}
              </Typography>
            </View>
          );
        }}
      />
      <View style={{ position: "absolute", right: 24, bottom: 24 + safeAreaInset.bottom }}>
        <CustomButton onPress={onPressAddButton}>
          <View style={{ width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
            <Icon iconName="add" color="white" size={32} />
          </View>
        </CustomButton>
      </View>
    </View>
  );
}
