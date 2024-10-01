import { ConfigPlugin, withXcodeProject, IOSConfig } from "@expo/config-plugins";
import { getMessageFilterFiles } from "./lib/getMessageExtensionFiles";
import * as path from "path";
import { addTargetDependency } from "./xcode/addTargetDependency";
import { addXCConfigurationList } from "./xcode/addXCConfigurationList";
import { addProductFile } from "./xcode/addProductFile";
import { addToPbxNativeTargetSection } from "./xcode/addToPbxNativeTargetSection";
import { addToPbxProjectSection } from "./xcode/addToPbxProjectSection";
import { addBuildPhases } from "./xcode/addBuildPhases";
import { addPbxGroup } from "./xcode/addPbxGroup";

export const withXcode: ConfigPlugin<{
  targetName: string;
  bundleIdentifier: string;
  folderFiles: string;
  teamId: string;
}> = (config, { targetName, bundleIdentifier, folderFiles, teamId }) => {
  return withXcodeProject(config, (config) => {
    const xcodeProject = config.modResults;
    const messageFilterPath = path.join(config.modRequest.projectRoot, folderFiles);

    const targetUuid = xcodeProject.generateUuid();
    const groupName = "Embed Foundation Extensions";
    const { platformProjectRoot } = config.modRequest;
    const marketingVersion = config.version;

    const targetPath = path.join(platformProjectRoot, targetName);

    const messageFilterFiles = getMessageFilterFiles(
      messageFilterPath,
      targetPath
    );

    const xCConfigurationList = addXCConfigurationList(xcodeProject, {
      targetName,
      currentProjectVersion: config.ios!.buildNumber || "1",
      bundleIdentifier,
      marketingVersion,
    });

    const productFile = addProductFile(xcodeProject, {
      targetName,
      groupName,
    });

    const target = addToPbxNativeTargetSection(xcodeProject, {
      targetName,
      targetUuid,
      productFile,
      xCConfigurationList,
    });

    addToPbxProjectSection(xcodeProject, target);

    addTargetDependency(xcodeProject, target);

    addBuildPhases(xcodeProject, {
      targetUuid,
      groupName,
      productFile
    });

    addPbxGroup(xcodeProject, {
      targetName,
      messageFilterFiles,
    });

    const applyDevelopmentTeamIdToTargets = () => {
      const targets = IOSConfig.Target.findSignableTargets(xcodeProject);
      
      targets.forEach(([_, nativeTarget]) => {
        IOSConfig.XcodeUtils.getBuildConfigurationsForListId(
          xcodeProject,
          nativeTarget.buildConfigurationList
        ).forEach((config) => {
          const [_, item] = config;
          item.buildSettings.DEVELOPMENT_TEAM = teamId;
        });
      });
    }
    
    applyDevelopmentTeamIdToTargets();
    return config;
  });
};
