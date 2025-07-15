import React, { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { Sample } from "@/typings/recording";

import { closeDialog } from "@/store/actions/dialog";
import { isDialogOpen } from "@/store/selectors/dialog";

import { DialogId } from "@/referential/dialog";

import Dialog, { type DialogAction } from "@ui/Dialog";

interface Props {
  sample: Sample;
}

const SampleInformationDialog: FC<Props> = ({ sample }) => {
  const dispatch = useDispatch();
  const visible = useSelector(isDialogOpen(DialogId.SAMPLE_INFORMATION));
  const handleClose = () => dispatch(closeDialog({ id: DialogId.SAMPLE_INFORMATION }));
  const actions: DialogAction[] = [{ label: "OK", callback: handleClose }];
  return (
    <Dialog
      title={sample.label}
      description={sample.description}
      actions={actions}
      visible={visible}
      onClose={handleClose}
    />
  );
};

export default SampleInformationDialog;
