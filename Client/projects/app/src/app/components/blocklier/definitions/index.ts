import 'blockly/blocks'; // default blocks

import { BlocklierCustomBlock } from '../blocklier-models';
import {
  AppAutojsBlock,
  AppEditFileBlock,
  AppGetAppNameBlock,
  AppGetPackageNameBlock,
  AppLaunchAppBlock,
  AppLaunchBlock,
  AppOpenAppSettingBlock,
  AppOpenUrlBlock,
  AppSendEmailBlock,
  AppStartActivityBlock,
  AppUninstallBlock,
  AppVersionCodeBlock,
  AppVersionNameBlock,
  AppViewFileBlock,
} from './app.blocks';
import {
  AutoRootBlock,
  AutoRootInActiveWindowBlock,
  AutoServiceBlock,
  AutoSetFlagsBlock,
  AutoSetModeBlock,
  AutoSetWindowFilterBlock,
  AutoWaitForBlock,
  AutoWindowsBlock,
} from './auto.blocks';
import { ListsGetBlock, ListsSetBlock } from './lists.blocks';

BlocklierCustomBlock.use([
  ListsGetBlock,
  ListsSetBlock,
  AppVersionCodeBlock,
  AppVersionNameBlock,
  AppAutojsBlock,
  AppLaunchBlock,
  AppLaunchAppBlock,
  AppGetPackageNameBlock,
  AppGetAppNameBlock,
  AppOpenAppSettingBlock,
  AppViewFileBlock,
  AppEditFileBlock,
  AppUninstallBlock,
  AppOpenUrlBlock,
  AppSendEmailBlock,
  AppStartActivityBlock,
  AutoWaitForBlock,
  AutoSetModeBlock,
  AutoSetFlagsBlock,
  AutoServiceBlock,
  AutoWindowsBlock,
  AutoRootBlock,
  AutoRootInActiveWindowBlock,
  AutoSetWindowFilterBlock,
]);
