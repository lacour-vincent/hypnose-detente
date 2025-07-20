import React, { type FC } from "react";
import { Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { closeDialog } from "@/store/actions/dialog";
import { isDialogOpen } from "@/store/selectors/dialog";

import { DialogId } from "@/referential/dialog";

import Dialog, { type DialogAction } from "@ui/Dialog";

const description = `Si vous souhaitez soutenir notre application, vous pouvez nous laisser une note sur le Store. Merci !`;

const RateApplicationDialog: FC = () => {
  const dispatch = useDispatch();
  const visible = useSelector(isDialogOpen(DialogId.RATE_APPLICATION));
  const handleClose = () => dispatch(closeDialog({ id: DialogId.RATE_APPLICATION }));

  const handleOpenPlayStore = () => {
    Linking.openURL(`market://details?id=com.lacour.vincent.hypnosedetente`);
    return handleClose();
  };

  const actions: DialogAction[] = [
    { label: "PLUS TARD", callback: handleClose },
    { label: "NOTATION", callback: handleOpenPlayStore },
  ];

  return (
    <Dialog
      title="Donnez-nous votre avis !"
      description={description}
      actions={actions}
      visible={visible}
      onClose={handleClose}
    />
  );
};

export default RateApplicationDialog;
