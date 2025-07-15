import React, { type FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import { clearSelectedSample, retrieveSampleById } from "@/store/actions/recording";
import { getSelectedSample } from "@/store/selectors/recording";

import { SAMPLE_THUMBNAILS } from "@/referential/thumbnails";

import useRouter from "@/hooks/useRouter";

import AudioPlayer from "@/components/AudioPlayer";

import Image from "@ui/Image";

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

  if (!sample.id) return null; //Loader or error
  const url = SAMPLE_THUMBNAILS[sample.slug];
  const alt = `Vignette - ${sample.label}`;

  return (
    <LinearGradient
      style={s.container}
      colors={[theme["primary-color"], theme["tertiary-color"]]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <Image style={s.image} src={url} alt={alt} />
      <AudioPlayer style={s.player} />
    </LinearGradient>
  );
};

export default SampleView;
