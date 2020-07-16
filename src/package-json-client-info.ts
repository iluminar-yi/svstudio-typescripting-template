import { capitalCase } from 'change-case';
import { ClientInfo } from 'svstudio-scripts-typing';

import packageJson from '../package.json';

export default function packageJsonClientInfo(): ClientInfo {
  return {
    name: capitalCase(packageJson.name),
    category: 'Tests',
    author: packageJson.author,
    versionNumber: Number(packageJson.version.split('.').join('')),
    minEditorVersion: 0,
  };
}
