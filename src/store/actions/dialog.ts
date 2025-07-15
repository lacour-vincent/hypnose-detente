import { createPayloadAction } from "@/store/actions";

import type { DialogId } from "@/referential/dialog";

export const openDialog = createPayloadAction<{ id: DialogId }>("OPEN_DIALOG");
export const closeDialog = createPayloadAction<{ id: DialogId }>("CLOSE_DIALOG");
