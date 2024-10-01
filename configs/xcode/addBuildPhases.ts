import { XcodeProject } from "@expo/config-plugins";
import * as util from "util";

export const addBuildPhases = (
  xcodeProject: XcodeProject,
  {
    targetUuid,
    groupName,
    productFile,
  }: {
    targetUuid: string;
    groupName: string;
    productFile: {
      uuid: string;
      target: string;
      basename: string;
      group: string;
    };
  }
) => {
  const buildPath = `""`;
  const folderType = "app_extension";

  // Copy files build phase
  xcodeProject.addBuildPhase(
    [],
    "PBXCopyFilesBuildPhase",
    groupName,
    xcodeProject.getFirstTarget().uuid,
    folderType,
    buildPath
  );

  xcodeProject
    .buildPhaseObject("PBXCopyFilesBuildPhase", groupName, productFile.target)
    .files.push({
      value: productFile.uuid,
      comment: util.format("%s in %s", productFile.basename, productFile.group),
    });
  xcodeProject.addToPbxBuildFileSection({...productFile, settings: {
    ATTRIBUTES: ["RemoveHeadersOnCopy"],
  }});

  // Frameworks build phase
  xcodeProject.addBuildPhase(
    [],
    "PBXFrameworksBuildPhase",
    groupName,
    targetUuid,
    folderType,
    buildPath
  );

  // Resources build phase
  xcodeProject.addBuildPhase(
    [],
    "PBXResourcesBuildPhase",
    groupName,
    targetUuid,
    folderType,
    buildPath
  );
};
