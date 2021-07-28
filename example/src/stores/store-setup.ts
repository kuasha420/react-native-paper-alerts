import createPersistentStore from 'mst-persistent-store';
import { defaultVersion } from '~/services/version';
import RootStore from '~/stores/root-store';

export const [RootStoreProvider, useRootStore] = createPersistentStore(
  RootStore,
  {},
  {
    version: defaultVersion,
    hydrated: false,
  }
);
