import { exec as execCb } from "child_process";
import { promises as fs } from "fs";
import util from "util";

const exec = util.promisify(execCb);

const run = (command, options) => exec(command, options);

const ARTIFACT_NAME = "hypnose-detente";

const main = async () => {
  try {
    console.info("-----------------------------------");

    console.info("- Builds apks for local testing using bundletool...");
    await run(`rm --force ${ARTIFACT_NAME}.apks`);
    await run(`java -jar bundletool-all.jar build-apks --local-testing \
      --bundle=${ARTIFACT_NAME}.aab \
      --output=${ARTIFACT_NAME}.apks`);

    console.info("- Install apks on emulator or connected device...");
    await run(`java -jar bundletool-all.jar install-apks --apks=${ARTIFACT_NAME}.apks`);

    console.info("-----------------------------------");
  } catch (err) {
    console.error(err);
  }
};

main();
