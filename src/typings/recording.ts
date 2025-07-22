import type { AssetPack } from "./storage";

export interface Sample {
  id: string;
  rid: string;
  title: string;
  label: string;
  description: string;
  duration: number;
  pack: AssetPack;
}
