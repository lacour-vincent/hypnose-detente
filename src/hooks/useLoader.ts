import { useSelector } from "react-redux";

import type { RequestAction } from "@/store/actions";
import { createRequestSelector } from "@/store/selectors/actions";

const useLoader = (actions: unknown[]) => {
  const isActionLoading = useSelector(createRequestSelector(actions as RequestAction[]));
  return isActionLoading;
};

export default useLoader;
