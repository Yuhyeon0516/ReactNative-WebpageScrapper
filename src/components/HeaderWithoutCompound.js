import React from "react";
import { View, Dimensions } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import { Spacer } from "./Spacer";
import { Icon } from "./Icons";
import { CustomButton } from "./CustomButton";
import { Typography } from "./Typography";
const { width } = Dimensions.get("window");

export class HeaderWithoutCompound extends React.Component {
  render() {
    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => (
          <View style={{ paddingTop: insets.top }}>
            <View
              style={{
                width: width,
                height: 56,
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
              }}
            >
              <Spacer horizontal={true} space={12} />
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {this.props.leftIcon && (
                    <CustomButton onPress={this.props.leftIcon.onPress}>
                      <Icon iconName={this.props.leftIcon.iconName} size={28} />
                    </CustomButton>
                  )}

                  <Typography fontSize={18}>{this.props.title}</Typography>
                </View>

                {this.props.rightIcon && (
                  <CustomButton onPress={this.props.rightIcon.onPress}>
                    <Icon iconName={this.props.rightIcon.iconName} size={28} />
                  </CustomButton>
                )}
              </View>
              <Spacer horizontal={true} space={12} />
            </View>
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}
