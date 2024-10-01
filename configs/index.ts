import { ConfigPlugin, withPlugins } from "@expo/config-plugins";
import { withXcode } from "./withXcode";
import { withEASTargets } from "./withEasConfig";

const withXcodeTargets: ConfigPlugin<{
  teamId: string;
}> = (config, { teamId }) => {
  const folderFiles = "MessageFilterExtension";
  const bundleIdentifier = `${config.ios?.bundleIdentifier}.${folderFiles}`;

  return withPlugins(config, [
    [
      withXcode,
      {
        targetName: folderFiles,
        bundleIdentifier,
        folderFiles,
        teamId,
      },
    ],
    [
      withEASTargets,
      {
        bundleIdentifier,
        targetName: folderFiles,
      },
    ],
  ]);
};

export default withXcodeTargets;
