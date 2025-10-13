# Hypnose — Détente

Application that allows you to relax with self-hypnosis recordings.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Requirements

`nodejs 22.15.x` ([install](https://nodejs.org/dist/v22.15.0/))

`java 18.0.x` ([install](https://www.oracle.com/java/technologies/javase/jdk18-archive-downloads.html))

`yarn 1.22.x` ([install](https://classic.yarnpkg.com/en/docs/install))

`Android Studio` ([install](https://developer.android.com/studio/install))

## Installation

```shell
$ yarn install
$ yarn global add eas-cli@16.20.x
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

## Usage

```shell
# Transpile plugin TypeScript files
$ yarn build:plugins
# Generate native project files for Android
$ yarn prebuild:android
# Run the app on Android device/emulator
$ yarn android
# Build native application for Android using EAS
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
