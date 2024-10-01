import { XcodeProject } from "@expo/config-plugins";

export const addXCConfigurationList = (
  xcodeProject: XcodeProject,
  {
    targetName,
    currentProjectVersion,
    bundleIdentifier,
    marketingVersion,
  }: {
    targetName: string;
    currentProjectVersion: string;
    bundleIdentifier: string;
    marketingVersion?: string;
  }
) => {
  const commonBuildSettings: any = {
		ASSETCATALOG_COMPILER_GENERATE_SWIFT_ASSET_SYMBOL_EXTENSIONS: "YES",
		CLANG_ANALYZER_NONNULL: "YES",
		CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION: "YES_AGGRESSIVE",
		CLANG_CXX_LANGUAGE_STANDARD: `"gnu++20"`,
		CLANG_ENABLE_OBJC_WEAK: "YES",
		CLANG_WARN_DOCUMENTATION_COMMENTS: "YES",
		CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER: "YES",
		CLANG_WARN_UNGUARDED_AVAILABILITY: "YES_AGGRESSIVE",
		CODE_SIGN_STYLE: "Automatic",
		CURRENT_PROJECT_VERSION: `"${currentProjectVersion}"`,
		ENABLE_USER_SCRIPT_SANDBOXING: "YES",
		GCC_C_LANGUAGE_STANDARD: "gnu17",
		GENERATE_INFOPLIST_FILE: "YES",
		INFOPLIST_FILE: `${targetName}/Info.plist`,
		INFOPLIST_KEY_CFBundleDisplayName: targetName,
		INFOPLIST_KEY_NSHumanReadableCopyright: `""`,
		IPHONEOS_DEPLOYMENT_TARGET: "18.0",
		LD_RUNPATH_SEARCH_PATHS:
        `"$(inherited) @executable_path/Frameworks @executable_path/../../Frameworks"`,
		//LD_RUNPATH_SEARCH_PATHS: `(\n"$(inherited),\n"@executable_path/Frameworks",\n"@executable_path/../../Frameworks",`,
		LOCALIZATION_PREFERS_STRING_CATALOGS: "YES",
		MARKETING_VERSION: `"${marketingVersion}"`,
		MTL_FAST_MATH: "YES",
		PRODUCT_BUNDLE_IDENTIFIER: `"${bundleIdentifier}"`,
    PRODUCT_NAME: `"$(TARGET_NAME)"`,
		SKIP_INSTALL: "YES",
		SWIFT_EMIT_LOC_STRINGS: "YES",
    SWIFT_VERSION: "5.0",
    TARGETED_DEVICE_FAMILY: `"1,2"`,
  };

  const buildConfigurationsList = [
    {
      name: "Debug",
      isa: "XCBuildConfiguration",
      buildSettings: {
        ...commonBuildSettings,
				DEBUG_INFORMATION_FORMAT: "dwarf",
				MTL_ENABLE_DEBUG_INFO: "INCLUDE_SOURCE",
				SWIFT_ACTIVE_COMPILATION_CONDITIONS: `"DEBUG $(inherited)"`,
				SWIFT_OPTIMIZATION_LEVEL: `"-Onone"`
      },
    },
    {
      name: "Release",
      isa: "XCBuildConfiguration",
      buildSettings: {
        ...commonBuildSettings,
				COPY_PHASE_STRIP: "NO",
				DEBUG_INFORMATION_FORMAT: "dwarf-with-dsym",
				SWIFT_COMPILATION_MODE: "wholemodule"
      },
    },
  ];

  const xCConfigurationList = xcodeProject.addXCConfigurationList(
    buildConfigurationsList,
    "Release",
    `Build configuration list for PBXNativeTarget "${targetName}"`
  );

  return xCConfigurationList;

};
