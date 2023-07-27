import { View } from "react-native";
import React, { useCallback } from "react";
import { Header } from "../components/Header/Header";
import { CustomButton } from "../components/CustomButton";
import { Typography } from "../components/Typography";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "../components/Spacer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../components/Icons";

export default function LinkListScreen() {
  const safeAreaInset = useSafeAreaInsets();
  const navigation = useNavigation();
  const onPressButton = useCallback(() => {
    navigation.navigate("LinkDetail");
  }, []);

  const onPressAddButton = useCallback(() => {
    navigation.navigate("AddLink");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="Link List" />
        </Header.Group>
      </Header>
      <View style={{ flex: 1 }}>
        <CustomButton onPress={onPressButton}>
          <Typography>Link Detail로 이동</Typography>
        </CustomButton>
        <Spacer space={12} />
        <CustomButton onPress={onPressAddButton}>
          <Typography>Add Link로 이동</Typography>
        </CustomButton>
      </View>
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
