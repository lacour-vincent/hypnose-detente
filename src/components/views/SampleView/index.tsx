import React, { type FC, useEffect } from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import { clearSelectedSample, retrieveSampleById } from "@/store/actions/recording";
import { getSelectedSample } from "@/store/selectors/recording";

import useRouter from "@/hooks/useRouter";

import theme from "@/styling";

import s from "./styles";

interface Params {
  id: string;
}

const SampleView: FC = () => {
  const dispatch = useDispatch();
  const { params } = useRouter<Params>();
  const sample = useSelector(getSelectedSample);

  useEffect(() => {
    dispatch(retrieveSampleById.request({ id: params.id }));
    return () => {
      dispatch(clearSelectedSample());
    };
  }, []);

  return (
    <LinearGradient
      style={s.container}
      colors={[theme["primary-color"], theme["tertiary-color"]]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <Text>SAMPLE VIEW : {sample.title}</Text>
    </LinearGradient>
  );
};

export default SampleView;
