import React, { type FC } from "react";
import { View } from "react-native";

import PrivacyPolicy from "@/components/PrivacyPolicy";

import s from "./styles";

const PrivacyPolicyView: FC = () => {
  return (
    <View style={s.container}>
      <PrivacyPolicy />
    </View>
  );
};

export default PrivacyPolicyView;
