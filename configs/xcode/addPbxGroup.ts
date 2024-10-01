import { XcodeProject } from "@expo/config-plugins";

import { MessageFilterFiles } from "../lib/getMessageExtensionFiles";

export const addPbxGroup = (
  xcodeProject: XcodeProject,
  {
    targetName,
    messageFilterFiles,
  }: {
    targetName: string;
    messageFilterFiles: MessageFilterFiles;
  }
) => {
  const {
    swiftFiles,
    plistFiles,
  } = messageFilterFiles;

  // Add PBX group
  const { uuid: pbxGroupUuid } = xcodeProject.addPbxGroup(
    [
      ...swiftFiles,
      ...plistFiles,
    ],
    targetName,
    `../${targetName}`
  );

  // Add PBXGroup to top level group
  const groups = xcodeProject.hash.project.objects["PBXGroup"];
  if (pbxGroupUuid) {
    Object.keys(groups).forEach(function (key) {
      if (groups[key].name === undefined && groups[key].path === undefined) {
        xcodeProject.addToPbxGroup(pbxGroupUuid, key);
      }
    });
  }
}
