import React, { type FC } from "react";
import { ScrollView, Text, View } from "react-native";

import s from "./styles";

const PrivacyPolicy: FC = () => {
  return (
    <ScrollView>
      <View style={s.container}>
        <Text style={s.content}>
          Cette politique de confidentialité s&apos;applique à l&apos;application {"\u2060"}Hypnose&nbsp;—&nbsp;Détente
          {"\u2060"} (ci-après dénommée &quot;Application&quot;) pour appareils mobiles, créée par {"\u2060"}LACOUR
          VINCENT
          {"\u2060"} (ci-après dénommé &quot;Fournisseur de Service&quot;) en tant que service gratuit. Ce service est
          fourni &quot;TEL QUEL&quot;.
        </Text>
        <Text style={s.heading}>
          Quelles informations l&apos;Application collecte-t-elle et comment sont-elles utilisées ?
        </Text>
        <Text style={s.content}>
          L&apos;Application ne collecte aucune information lorsque vous la téléchargez et l&apos;utilisez. Aucune
          inscription n&apos;est requise pour utiliser l&apos;Application.
        </Text>
        <Text style={s.heading}>
          L&apos;Application collecte-t-elle des informations précises sur la localisation en temps réel de
          l&apos;appareil ?
        </Text>
        <Text style={s.content}>
          Cette Application ne collecte pas d&apos;informations précises sur la localisation de votre appareil mobile.
        </Text>
        <Text style={s.heading}>Les tiers ont-ils accès aux informations obtenues par l&apos;Application ?</Text>
        <Text style={s.content}>
          Étant donné que l&apos;Application ne collecte aucune information, aucune donnée n&apos;est partagée avec des
          tiers.
        </Text>
        <Text style={s.heading}>Quels sont mes droits de désengagement ?</Text>
        <Text style={s.content}>
          Vous pouvez arrêter toute collecte d&apos;informations par l&apos;Application simplement en la désinstallant.
          Vous pouvez utiliser les processus de désinstallation standards disponibles sur votre appareil mobile ou via
          la boutique d&apos;applications ou le réseau mobile.
        </Text>
        <Text style={s.heading}>Enfants</Text>
        <Text style={s.content}>
          L&apos;Application n&apos;est pas destinée à collecter sciemment des données ou à cibler les enfants de moins
          de 13 ans.
        </Text>
        <Text style={s.content}>
          Le Fournisseur de Service ne collecte pas sciemment d&apos;informations personnellement identifiables auprès
          des enfants. Le Fournisseur de Service encourage tous les enfants à ne jamais soumettre d&apos;informations
          personnellement identifiables via l&apos;Application et/ou les Services. Le Fournisseur de Service encourage
          les parents et tuteurs légaux à surveiller l&apos;utilisation d&apos;Internet par leurs enfants et à faire
          respecter cette Politique en leur apprenant à ne jamais fournir d&apos;informations personnellement
          identifiables via l&apos;Application et/ou les Services sans leur permission. Si vous avez des raisons de
          croire qu&apos;un enfant a fourni des informations personnelment identifiables au Fournisseur de Service via
          l&apos;Application et/ou les Services, veuillez contacter le Fournisseur de Service ({"\u2060"}
          lacour.vincent.app@gmail.com{"\u2060"}) afin qu&apos;il puisse prendre les mesures nécessaires. Vous devez
          également avoir au moins 16 ans pour consentir au traitement de vos informations personnellement identifiables
          dans votre pays (dans certains pays, nous pouvons autoriser vos parents ou tuteurs à le faire en votre nom).
        </Text>
        <Text style={s.heading}>Sécurité</Text>
        <Text style={s.content}>
          Le Fournisseur de Service attache une grande importance à la confidentialité de vos informations. Cependant,
          puisque l&apos;Application ne collecte aucune information, il n&apos;y a aucun risque que vos données soient
          consultées par des personnes non autorisées.
        </Text>
        <Text style={s.heading}>Modifications</Text>
        <Text style={s.content}>
          Cette politique de confidentialité peut être mise à jour périodiquement pour diverses raisons. Le Fournisseur
          de Service vous informera de toute modification en mettant à jour cette page avec la nouvelle politique de
          confidentialité. Il vous est conseillé de consulter régulièrement cette politique de confidentialité pour
          prendre connaissance des éventuels changements, car votre utilisation continue de l&apos;Application vaut
          approbation de toutes les modifications.
        </Text>
        <Text style={s.content}>
          Cette politique de confidentialité est effective à partir du {"\u2060"}01/08/2025{"\u2060"}.
        </Text>
        <Text style={s.heading}>Votre consentement</Text>
        <Text style={s.content}>
          En utilisant l&apos;Application, vous consentez au traitement de vos informations conformément à cette
          politique de confidentialité, telle qu&apos;elle est actuellement en vigueur et telle qu&apos;elle pourra être
          modifiée par le Fournisseur de Service.
        </Text>
        <Text style={s.heading}>Nous contacter</Text>
        <Text style={s.content}>
          Si vous avez des questions concernant la confidentialité lors de l&apos;utilisation de l&apos;Application, ou
          des questions sur nos pratiques, veuillez contacter le Fournisseur de Service par e-mail à l&apos;adresse
          suivante : {"\u2060"}lacour.vincent.app@gmail.com{"\u2060"}
        </Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;
