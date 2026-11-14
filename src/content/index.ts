import type { Content } from '../game/types';
import aldousBrann from './souls/aldous-brann';
import bramTolley from './souls/bram-tolley';
import daceWeller from './souls/dace-weller';
import gerritVosk from './souls/gerrit-vosk';
import gusFerrow from './souls/gus-ferrow';
import halBrindle from './souls/hal-brindle';
import hettieMarrow from './souls/hettie-marrow';
import ilkaDorn from './souls/ilka-dorn';
import ilseBrann from './souls/ilse-brann';
import kitMallow from './souls/kit-mallow';
import martaArdley from './souls/marta-ardley';
import nanOstry from './souls/nan-ostry';
import nellWeller from './souls/nell-weller';
import orrinVale from './souls/orrin-vale';
import oswinHarrow from './souls/oswin-harrow';
import pipArdley from './souls/pip-ardley';
import tamsinCrow from './souls/tamsin-crow';
import tomasReed from './souls/tomas-reed';
import wilTanner from './souls/wil-tanner';
import yaraPike from './souls/yara-pike';

export const CONTENT: Content = {
  souls: [
    // Day 1 of a first reign, with their Echoes
    hettieMarrow,
    orrinVale,
    daceWeller,
    nellWeller,
    pipArdley,
    martaArdley,
    kitMallow,
    wilTanner,
    ilseBrann,
    aldousBrann,
    // Everyone else
    bramTolley,
    gerritVosk,
    gusFerrow,
    halBrindle,
    oswinHarrow,
    tamsinCrow,
    yaraPike,
    nanOstry,
    tomasReed,
    ilkaDorn,
  ],
  // GDD §4: the teaching Echo (Orrin Vale) is placed fifth automatically.
  dayOne: ['hettie-marrow', 'dace-weller', 'pip-ardley', 'kit-mallow', 'ilse-brann'],
};
