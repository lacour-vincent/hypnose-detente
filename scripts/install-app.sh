#!/usr/bin/env bash
set -euo pipefail

ARTIFACT_NAME="hypnose-detente"

echo "-----------------------------------"
echo "- Build apks for local testing using bundletool..."

[ -f "${ARTIFACT_NAME}.apks" ] && rm "${ARTIFACT_NAME}.apks"

java -jar bundletool-all.jar build-apks --local-testing \
  --bundle="${ARTIFACT_NAME}.aab" \
  --output="${ARTIFACT_NAME}.apks"

echo "- Install application on connected device..."
java -jar bundletool-all.jar install-apks --apks="${ARTIFACT_NAME}.apks"

echo "- ${ARTIFACT_NAME} ✅"
echo "-----------------------------------"