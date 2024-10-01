import { XcodeProject } from "@expo/config-plugins";

export const addTargetDependency = (
  xcodeProject: XcodeProject,
  target: { uuid: string }
) => {
  if (!xcodeProject.hash.project.objects["PBXTargetDependency"]) {
    xcodeProject.hash.project.objects["PBXTargetDependency"] = {};
  }
  if (!xcodeProject.hash.project.objects["PBXContainerItemProxy"]) {
    xcodeProject.hash.project.objects["PBXContainerItemProxy"] = {};
  }

  xcodeProject.addTargetDependency(xcodeProject.getFirstTarget().uuid, [target.uuid]);
};
