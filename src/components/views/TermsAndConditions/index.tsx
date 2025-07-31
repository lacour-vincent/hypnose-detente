import React, { type FC } from "react";
import { View } from "react-native";

import TermsAndConditions from "@/components/TermsAndConditions";

import s from "./styles";

const TermsAndConditionsView: FC = () => {
  return (
    <View style={s.container}>
      <TermsAndConditions />
    </View>
  );
};

export default TermsAndConditionsView;
