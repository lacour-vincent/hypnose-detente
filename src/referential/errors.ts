import { AssetPackErrorCode } from "@/typings/storage";

export class AssetPackError extends Error {
  constructor(code?: AssetPackErrorCode) {
    super();
    this.name = this.constructor.name;
    const base = "Erreur lors de la récupération du fichier de la séance.";
    const error = code ?? AssetPackErrorCode.NO_ERROR;
    this.message = `${base} ${ASSET_PACK_ERROR_CODE_MAPPING[error]}`;
  }
}

export const ASSET_PACK_ERROR_CODE_MAPPING: Record<AssetPackErrorCode, string> = {
  [AssetPackErrorCode.NO_ERROR]: "Aucune erreur détectée.",
  [AssetPackErrorCode.APP_UNAVAILABLE]: "L'application n'est pas disponible.",
  [AssetPackErrorCode.PACK_UNAVAILABLE]: "Le contenu demandé n'est pas disponible.",
  [AssetPackErrorCode.INVALID_REQUEST]: "Requête invalide.",
  [AssetPackErrorCode.DOWNLOAD_NOT_FOUND]: "Le fichier est introuvable.",
  [AssetPackErrorCode.API_NOT_AVAILABLE]: "Service temporairement indisponible.",
  [AssetPackErrorCode.NETWORK_ERROR]: "Problème de connexion réseau.",
  [AssetPackErrorCode.ACCESS_DENIED]: "Accès refusé.",
  [AssetPackErrorCode.INSUFFICIENT_STORAGE]: "Espace de stockage insuffisant.",
  [AssetPackErrorCode.APP_NOT_OWNED]: "L'application n'est pas installée.",
  [AssetPackErrorCode.CONFIRMATION_NOT_REQUIRED]: "Aucune confirmation requise.",
  [AssetPackErrorCode.UNRECOGNIZED_INSTALLATION]: "Installation non reconnue.",
  [AssetPackErrorCode.INTERNAL_ERROR]: "Problème critique interne.",
};
