import React, { type FC, useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { retrieveSamples } from "@/store/actions/recording";
import { getSamples } from "@/store/selectors/recording";
import { getAssetPackStates } from "@/store/selectors/storage";

import Samples from "@/components/Samples";

import s from "./styles";

const SamplesView: FC = () => {
  const dispatch = useDispatch();
  const samples = useSelector(getSamples);
  const states = useSelector(getAssetPackStates);

  useEffect(() => {
    dispatch(retrieveSamples.request());
  }, []);

  return (
    <View style={s.container}>
      <Samples samples={samples} states={states} />
    </View>
  );
};

export default SamplesView;
