import { useMemo } from "react";

import { useRouter as useExpoRouter, useLocalSearchParams, usePathname } from "expo-router";

interface RouterParams<Params> {
  params: Params;
  pathname: string;
  navigate: (href: string) => void;
  replace: (href: string) => void;
}

const useRouter = <Params = never>(): RouterParams<Params> => {
  const router = useExpoRouter();
  const params = useLocalSearchParams() as Params;
  const pathname = usePathname();

  return useMemo(() => {
    return { params, pathname, navigate: router.navigate, replace: router.replace };
  }, [router, params, pathname]);
};

export default useRouter;
