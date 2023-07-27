import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LinkListScreen from "../screens/LinkListScreen";
import LinkDetailScreen from "../screens/LinkDetailScreen";

const Stack = createNativeStackNavigator();

export default function LinkStackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="LinkList"
      screenOptions={{
        presentation: "card",
        headerShown: false,
      }}
    >
      <Stack.Screen name="LinkList" component={LinkListScreen} />
      <Stack.Screen name="LinkDetail" component={LinkDetailScreen} />
    </Stack.Navigator>
  );
}
