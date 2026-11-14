import type { Content } from '../game/types';
import daceWeller from './souls/dace-weller';
import hettieMarrow from './souls/hettie-marrow';
import ilseBrann from './souls/ilse-brann';
import kitMallow from './souls/kit-mallow';
import orrinVale from './souls/orrin-vale';
import pipArdley from './souls/pip-ardley';

export const CONTENT: Content = {
  souls: [hettieMarrow, orrinVale, daceWeller, pipArdley, kitMallow, ilseBrann],
  // GDD §4: the teaching Echo (Orrin Vale) is placed fifth automatically.
  dayOne: ['hettie-marrow', 'dace-weller', 'pip-ardley', 'kit-mallow', 'ilse-brann'],
};
