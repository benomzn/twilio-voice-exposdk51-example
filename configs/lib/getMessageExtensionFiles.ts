import * as fs from "fs";
import * as path from "path";

export type MessageFilterFiles = {
  swiftFiles: string[];
  plistFiles: string[];
};

export const getMessageFilterFiles = (
  messageFilterPath: string,
  targetPath: string
): MessageFilterFiles => {
  console.log("Writing files from: ", messageFilterPath);
  
  const messageFilterFiles: MessageFilterFiles = {
    swiftFiles: [],
    plistFiles: [],
  };

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  if (fs.lstatSync(messageFilterPath).isDirectory()) {
    const files = fs.readdirSync(messageFilterPath);

    files.forEach((file) => {
      const fileExtension = file.split(".").pop();

      if (fileExtension === "swift") {
        messageFilterFiles.swiftFiles.push(file);
      } else if (fileExtension === "plist") {
        messageFilterFiles.plistFiles.push(file);
      }
    });
  }

  [...messageFilterFiles.swiftFiles, ...messageFilterFiles.plistFiles].forEach(
    (file) => {
      const source = path.join(messageFilterPath, file);
      copyFileSync(source, targetPath);
    }
  );

  return messageFilterFiles;
};

export const copyFileSync = (source: string, target: string) => {
  let targetFile = target;

  if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
    targetFile = path.join(target, path.basename(source));
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
};
