import { XcodeProject } from "@expo/config-plugins";

export const addToPbxProjectSection = (
  proj: XcodeProject,
  target: any
) => {
  proj.addToPbxProjectSection(target);

  // Add target attributes to project section
  if (
    !proj.pbxProjectSection()[proj.getFirstProject().uuid].attributes
      .TargetAttributes
  ) {
    proj.pbxProjectSection()[
      proj.getFirstProject().uuid
    ].attributes.TargetAttributes = {};
  }

  proj.pbxProjectSection()[proj.getFirstProject().uuid].attributes.LastSwiftUpdateCheck = 1600;
  
  proj.pbxProjectSection()[
    proj.getFirstProject().uuid
  ].attributes.TargetAttributes[target.uuid] = {
    CreatedOnToolsVersion: "16.0",
  };
}
