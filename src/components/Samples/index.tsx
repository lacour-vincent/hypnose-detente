import React, { type FC } from "react";
import { FlatList } from "react-native";

import type { Sample } from "@/typings/recording";

import { ROUTES } from "@/referential/routes";
import { getRouteWithParams } from "@/utils/url";

import SampleItem from "@/components/SampleItem";

import Link from "@ui/Link";

import s from "./styles";

interface Props {
  samples: Sample[];
}

const Samples: FC<Props> = ({ samples }) => {
  return (
    <FlatList
      contentContainerStyle={s.container}
      columnWrapperStyle={s.wrapper}
      numColumns={2}
      data={samples}
      keyExtractor={(sample) => sample.id}
      renderItem={({ item }) => {
        const href = getRouteWithParams(ROUTES.SAMPLE_VIEW, { id: item.id });
        return (
          <Link style={s.link} href={href} label={item.title}>
            <SampleItem style={s.item} sample={item} />
          </Link>
        );
      }}
    />
  );
};
export default Samples;
