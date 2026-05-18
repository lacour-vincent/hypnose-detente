#!/usr/bin/env bash
set -euo pipefail

ARTIFACT_NAME="hypnose-detente.aab"

echo "-----------------------------------"
echo "- Installing dependencies..."
yarn install --frozen-lockfile

echo "- Running prebuild..."
yarn prebuild:android

echo "- Building release bundle..."
cd android
./gradlew :app:bundleRelease

echo "- Moving artifact..."
mv app/build/outputs/bundle/release/app-release.aab "../${ARTIFACT_NAME}"

echo "- ${ARTIFACT_NAME} ✅"
echo "-----------------------------------"