# Hypnose — Détente

Application that allows you to relax with self-hypnosis recordings.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Specifications

| Common  | Version |     | Android             | Version |
| ------- | ------- | --- | ------------------- | ------- |
| Node.js | 24.12.x |     | Android Studio      | latest  |
| Yarn    | 1.22.2  |     | Java                | 18      |
|         |         |     | Kotlin              | 2.1.x   |
|         |         |     | Android SDK         | 36      |
|         |         |     | Android Min SDK     | 24      |
|         |         |     | Android Build Tools | 37.0.0  |
|         |         |     | Android NDK         | 27.x    |

## Installation

```shell
$ yarn install
```

### Android

- Install Android Sdk, Ndk, and Emulator from Android Studio.
- Add ANDROID_HOME to your path:

```shell
export ANDROID_HOME=[YOUR_LOCATION]/Android/Sdk
export ANDROID_NDK_HOME=[YOUR_LOCATION]/Android/Sdk/ndk/[VERSION]
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Bundletool

- Download the latest version of bundletool from the official GitHub releases ([install](https://github.com/google/bundletool/releases))
- Rename the downloaded file to bundletool-all.jar.
- Place the bundletool-all.jar file in the root folder of this project.

### Credentials

- Create a file named credentials.json in the root folder of the project with the following structure:

```json
{
  "android": {
    "keystore": {
      "path": "path/to/your/keystore.jks",
      "password": "your_keystore_password",
      "keyAlias": "your_key_alias",
      "keyPassword": "your_key_password"
    }
  }
}
```

### Adding MP3 Assets

Place your MP3 files in the following directory:

```
your-project/
└── samples/
    └── example/
        └── example.mp3
```

### How to contribute Android native module

Open the android/ directory with Android Studio:

```shell
yarn prebuild:android
cd android/
open -a "Android Studio" .
```

## Usage

```shell
# Generate native project files for Android
$ yarn prebuild:android
# Run the app on Android device/emulator
$ yarn android
# Build native application for Android
$ yarn build-app
# Install Android native application on device or emulator
$ yarn install-app
# Run static type, format, and lint checks
$ yarn validate
# Run both unit and integration tests
$ yarn test
```

## Recommanded vscode extensions

`Prettier` ([install](https://open-vsx.org/extension/esbenp/prettier-vscode))

`ESLint` ([install](https://open-vsx.org/extension/dbaeumer/vscode-eslint))
