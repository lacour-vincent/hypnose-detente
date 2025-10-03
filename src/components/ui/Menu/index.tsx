import React, { type FC, useRef, useState } from "react";
import { Dimensions, Modal, Pressable, Text, TouchableWithoutFeedback, View } from "react-native";

import PressableIcon from "@ui/PressableIcon";

import s from "./styles";

export type MenuItem = { label: string; callback: () => void };

type Position = { vertical: "top" | "bottom"; horizontal: "left" | "right" };

interface Props {
  position: Position;
  items: MenuItem[];
}

type Coordinate = { x: number; y: number };

const MENU_WIDTH = 0.5 * Dimensions.get("window").width;

const Menu: FC<Props> = ({ position, items }) => {
  const anchor = useRef<View>(null);
  const [visible, setVisible] = useState(false);
  const [coordinate, setCoordinate] = useState<Coordinate>({ x: 0, y: 0 });

  const onOpen = () => {
    if (!anchor.current) return;
    anchor.current.measure((_x, _y, width, height, pageX, pageY) => {
      const { vertical, horizontal } = position;
      const target: Coordinate = { x: 0, y: 0 };
      if (vertical === "top") target.y = pageY;
      if (vertical === "bottom") target.y = pageY + height;
      if (horizontal === "left") target.x = pageX;
      if (horizontal === "right") target.x = pageX + width;
      setCoordinate(target);
      setVisible(true);
    });
  };

  const onClose = () => setVisible(false);

  const onItemPress = (item: MenuItem) => {
    onClose();
    return item.callback();
  };

  return (
    <View>
      <View ref={anchor}>
        <PressableIcon label="Menu" icon="dots-vertical" onPress={onOpen} />
      </View>
      <Modal visible={visible} animationType="fade" onRequestClose={onClose} transparent accessibilityViewIsModal>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={s.overlay}>
            <TouchableWithoutFeedback>
              <View style={[s.menu, { width: MENU_WIDTH, top: coordinate.y, left: coordinate.x - MENU_WIDTH }]}>
                {items.map((item) => {
                  return (
                    <Pressable
                      style={s.item}
                      key={item.label}
                      role="button"
                      aria-label={item.label}
                      accessibilityRole="button"
                      accessibilityLabel={item.label}
                      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
                      onPress={() => onItemPress(item)}
                    >
                      <Text style={s.label}>{item.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Menu;
