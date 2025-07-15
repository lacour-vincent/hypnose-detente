import React, { type FC } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import s from "./styles";

export type DialogAction = { label: string; callback: () => void };

interface Props {
  title: string;
  description: string;
  actions: DialogAction[];
  visible: boolean;
  onClose: () => void;
}

const Dialog: FC<Props> = ({ title, description, actions, visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose} transparent accessibilityViewIsModal>
      <View style={s.background}>
        <View style={s.dialog}>
          <Text style={s.title}>{title}</Text>
          <Text style={s.description}>{description}</Text>
          <View style={s.actions}>
            {actions.map((action) => {
              return (
                <Pressable
                  style={s.action}
                  key={action.label}
                  role="button"
                  aria-label={action.label}
                  accessibilityRole="button"
                  accessibilityLabel={action.label}
                  onPress={action.callback}
                >
                  <Text style={s.label}>{action.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;
