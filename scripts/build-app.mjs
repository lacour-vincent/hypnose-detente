import { exec as execCb } from "child_process";
import { promises as fs } from "fs";
import util from "util";

const exec = util.promisify(execCb);

const run = (command, options) => exec(command, options);

const ARTIFACT_NAME = "hypnose-detente";

const main = async () => {
  try {
    console.info("-----------------------------------");

    console.info("- Transpile Expo plugins...");
    await run("yarn build:plugins");

    console.info("- Build Android Application using EAS --local ...");
    await run(`eas build --local --platform android --profile production --output=${ARTIFACT_NAME}.aab`);

    console.info("-----------------------------------");
  } catch (err) {
    console.error(err);
  }
};

main();
