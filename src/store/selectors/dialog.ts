import type { State } from "@/store/reducers";

import type { DialogId } from "@/referential/dialog";

export const isDialogOpen = (dialogId: DialogId) => (state: State) => state.dialog.includes(dialogId);
