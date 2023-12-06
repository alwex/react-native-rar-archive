import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-rar-archive' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RarArchive = NativeModules.RarArchive
  ? NativeModules.RarArchive
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function unrar(from: string, to: string): Promise<string> {
  return RarArchive.unrar(from, to);
}
