import React, { type FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import { prepare, release } from "@/store/actions/player";
import { clearSelectedSample, retrieveSampleById } from "@/store/actions/recording";
import { getSelectedSample } from "@/store/selectors/recording";
import { getSelectedAssetPack } from "@/store/selectors/storage";

import { SAMPLE_THUMBNAILS } from "@/referential/thumbnails";

import useRouter from "@/hooks/useRouter";

import AudioPlayer from "@/components/AudioPlayer";
import SampleInformationDialog from "@/components/dialogs/SampleInformationDialog";

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
  const pack = useSelector(getSelectedAssetPack);

  useEffect(() => {
    dispatch(retrieveSampleById.request({ id: params.id }));
    return () => {
      dispatch(clearSelectedSample());
      dispatch(release());
    };
  }, []);

  useEffect(() => {
    if (pack.file !== "") dispatch(prepare.request({ file: pack.file }));
  }, [pack]);

  const url = SAMPLE_THUMBNAILS[sample.rid];
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
      <SampleInformationDialog sample={sample} />
    </LinearGradient>
  );
};

export default SampleView;
