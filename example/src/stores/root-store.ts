import { flow, types } from 'mobx-state-tree';
import getLatestVersion, { defaultVersion } from '~/services/version';

/**
 * Example of a Appwide Global Store
 */

const RootStore = types
  .model('RootStore', {
    version: defaultVersion,
    latestVersion: defaultVersion,
    userColorScheme: types.maybeNull(types.union(types.literal('light'), types.literal('dark'))),
    hydrated: false,
  })
  .actions((self) => ({
    setUserColorScheme(colorScheme: typeof self.userColorScheme | 'auto') {
      if (colorScheme === 'auto') {
        self.userColorScheme = null;
      } else {
        self.userColorScheme = colorScheme;
      }
    },
    hydrate: flow(function* hydrate() {
      try {
        const version: string = yield getLatestVersion();
        self.latestVersion = version;
        self.hydrated = true;
      } catch (error) {
        console.error(error);
        self.hydrated = true;
      }
    }),
  }))
  .views((self) => ({
    get outdated() {
      return self.version !== self.latestVersion;
    },
    get currentColorScheme() {
      if (self.userColorScheme) {
        return self.userColorScheme;
      }
      return 'auto';
    },
  }));

export default RootStore;
