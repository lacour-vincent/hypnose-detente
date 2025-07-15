import React, { type ReactNode } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";

import { openDialog } from "@/store/actions/dialog";

import { DialogId } from "@/referential/dialog";

import PressableIcon from "@ui/PressableIcon";

import s from "./styles";

const HeaderRight = (): ReactNode => {
  const dispatch = useDispatch();
  const onInformationPress = () => dispatch(openDialog({ id: DialogId.SAMPLE_INFORMATION }));
  return (
    <View style={s.container}>
      <PressableIcon label="Information" icon="information-outline" onPress={onInformationPress} />
    </View>
  );
};
export default { HeaderRight };
