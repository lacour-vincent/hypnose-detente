# hypnose-detente
Android application that allows you to relax with self-hypnosis recordings.

https://play.google.com/store/apps/details?id=com.lacour.vincent.hypnosedetente

## Play Asset Delivery

```bash
# 1) Build your app bundle
# 2) Build your apks with assets
java -jar bundletool-all.jar build-apks --bundle=app-debug.aab --output=outputs.apks --local-testing
# 3) Install the application on connected devices
java -jar bundletool-all.jar install-apks --apks=outputs.apks
```
