import Constants from 'expo-constants';
import type { ComponentType } from 'react';

import type { CatalogueItem } from './data';
import ExpoGoTryOn from './TryOnExpoGo';

type Props = {
  initial: CatalogueItem;
  onClose: () => void;
};

export default function TryOnScreen(props: Props) {
  const isExpoGo = Boolean(Constants.expoGoConfig) || Constants.appOwnership === 'expo';

  if (isExpoGo) {
    return <ExpoGoTryOn {...props} />;
  }

  const NativeTryOn = require('./TryOnNative').default as ComponentType<Props>;
  return <NativeTryOn {...props} />;
}
