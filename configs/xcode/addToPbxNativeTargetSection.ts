import { XcodeProject } from "@expo/config-plugins";

export const addToPbxNativeTargetSection = (
  xcodeProject: XcodeProject,
  {
    targetName,
    targetUuid,
    productFile,
    xCConfigurationList,
  }: {
    targetName: string;
    targetUuid: string;
    productFile: { fileRef: string };
    xCConfigurationList: { uuid: string };
  }
) => {
  const target = {
    uuid: targetUuid,
    pbxNativeTarget: {
      isa: "PBXNativeTarget",
      name: targetName,
      productName: targetName,
      productReference: productFile.fileRef,
      productType: `"com.apple.product-type.app-extension"`,
      buildConfigurationList: xCConfigurationList.uuid,
      buildPhases: [],
      buildRules: [],
      dependencies: [],
      packageProductDependencies: []
    },
  };

  xcodeProject.addToPbxNativeTargetSection(target);

  return target;
}