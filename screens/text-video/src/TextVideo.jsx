import React from 'react';

import { createLayoutSwitcher } from '@micromag/core';
import * as LayoutComponents from './components';

const TextVideo = createLayoutSwitcher(LayoutComponents, LayoutComponents.Center);

export default React.memo(TextVideo);
