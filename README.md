# Mobile

Application that allows you to relax with self-hypnosis recordings.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Requirements

`nodejs 22.15.x` ([install](https://nodejs.org/dist/v22.11.0/))

`yarn 1.22.x` ([install](https://classic.yarnpkg.com/en/docs/install))

`Android Studio` ([install](https://developer.android.com/studio/install))

## Installation

```shell
$ yarn install
```

### Android

- Install Android Sdk and Emulator from Android Studio.
- Add ANDROID_HOME to your path:

```shell
export ANDROID_HOME=[YOUR_LOCATION]/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Usage

```shell
# Generate native project files for Android
$ yarn prebuild:android
# Run the app on Android device/emulator
$ yarn android
# Build native application for Android
$ yarn build:android
# Run static type, format, and lint checks
$ yarn validate
# Run both unit and integration tests
$ yarn test
```

## Environment variables

Create a .env file in the root of your project directory and add environment-specific variables on new lines in the form of `EXPO_PUBLIC_[NAME]=VALUE`:

```dosini
EXPO_PUBLIC_PORT=1664
```

## Recommanded vscode extensions

`Prettier` ([install](https://open-vsx.org/extension/esbenp/prettier-vscode))

`ESLint` ([install](https://open-vsx.org/extension/dbaeumer/vscode-eslint))
