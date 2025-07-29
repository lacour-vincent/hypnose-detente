import React, { type ReactNode } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";

import { openDialog } from "@/store/actions/dialog";

import { DialogId } from "@/referential/dialog";

import RateApplicationDialog from "@/components/dialogs/RateApplicationDialog";

import Menu from "@ui/Menu";
import PressableIcon from "@ui/PressableIcon";

import s from "./styles";

const HeaderRight = (): ReactNode => {
  const dispatch = useDispatch();
  const onRatingPress = () => dispatch(openDialog({ id: DialogId.RATE_APPLICATION }));
  return (
    <View style={s.container}>
      <PressableIcon label="Notation" icon="star" onPress={onRatingPress} />
      <RateApplicationDialog />
      <Menu
        position={{ vertical: "top", horizontal: "right" }}
        items={[
          { label: "Paramètres", callback: () => true },
          { label: "Informations", callback: () => true },
          { label: "A propos de nous", callback: () => true },
        ]}
      />
    </View>
  );
};
export default { HeaderRight };
