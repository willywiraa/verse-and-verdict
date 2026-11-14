import type { Content } from '../game/types';
import aldousBrann from './souls/aldous-brann';
import anselReed from './souls/ansel-reed';
import bramTolley from './souls/bram-tolley';
import daceWeller from './souls/dace-weller';
import gusFerrow from './souls/gus-ferrow';
import halBrindle from './souls/hal-brindle';
import hettieMarrow from './souls/hettie-marrow';
import idrisMott from './souls/idris-mott';
import ilseBrann from './souls/ilse-brann';
import joryHale from './souls/jory-hale';
import kitMallow from './souls/kit-mallow';
import lioMarsh from './souls/lio-marsh';
import martaArdley from './souls/marta-ardley';
import nanOstry from './souls/nan-ostry';
import nellWeller from './souls/nell-weller';
import orrinVale from './souls/orrin-vale';
import pipArdley from './souls/pip-ardley';
import sabineMott from './souls/sabine-mott';
import tomasReed from './souls/tomas-reed';
import wilTanner from './souls/wil-tanner';

/** 12 root souls and 8 Echoes. Each root with an Echo is followed by it. */
export const CONTENT: Content = {
  souls: [
    // Day 1 of a first reign
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
    gusFerrow,
    halBrindle,
    tomasReed,
    anselReed,
    idrisMott,
    sabineMott,
    nanOstry,
    joryHale,
    lioMarsh,
  ],
  // GDD §4: the teaching Echo (Orrin Vale) is placed fifth automatically.
  dayOne: ['hettie-marrow', 'dace-weller', 'pip-ardley', 'kit-mallow', 'ilse-brann'],
};
