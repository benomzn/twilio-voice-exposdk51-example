import { XcodeProject } from "@expo/config-plugins";

export const addProductFile = (
  xcodeProject: XcodeProject,
  { targetName, groupName }: { targetName: string; groupName: string }
) => {
  const options = {
    group: groupName,
    explicitFileType: "wrapper.app-extension",
    settings: {
      ATTRIBUTES: ["RemoveHeadersOnCopy"],
    },
    includeInIndex: 0,
    path: `${targetName}.appex`,
    sourceTree: "BUILT_PRODUCTS_DIR",
  };

  const productFile = xcodeProject.addProductFile(targetName, options);

  return productFile;
}