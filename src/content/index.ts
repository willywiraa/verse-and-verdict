import type { Content } from '../game/types';
import adaQuell from './souls/ada-quell';
import aldousBrann from './souls/aldous-brann';
import anselReed from './souls/ansel-reed';
import bramTolley from './souls/bram-tolley';
import corranReese from './souls/corran-reese';
import daceWeller from './souls/dace-weller';
import dellaThorne from './souls/della-thorne';
import edrinDorn from './souls/edrin-dorn';
import fenwickLusk from './souls/fenwick-lusk';
import garrickFell from './souls/garrick-fell';
import gerritVosk from './souls/gerrit-vosk';
import gusFerrow from './souls/gus-ferrow';
import halBrindle from './souls/hal-brindle';
import hesperWynne from './souls/hesper-wynne';
import hettieMarrow from './souls/hettie-marrow';
import idrisMott from './souls/idris-mott';
import ilkaDorn from './souls/ilka-dorn';
import ilseBrann from './souls/ilse-brann';
import joryHale from './souls/jory-hale';
import kitMallow from './souls/kit-mallow';
import lioMarsh from './souls/lio-marsh';
import magsTull from './souls/mags-tull';
import martaArdley from './souls/marta-ardley';
import nanOstry from './souls/nan-ostry';
import nedTallow from './souls/ned-tallow';
import nellWeller from './souls/nell-weller';
import odileLusk from './souls/odile-lusk';
import orrinVale from './souls/orrin-vale';
import oswinHarrow from './souls/oswin-harrow';
import pietHalloran from './souls/piet-halloran';
import pipArdley from './souls/pip-ardley';
import rosaFenn from './souls/rosa-fenn';
import sabineMott from './souls/sabine-mott';
import tamsinCrow from './souls/tamsin-crow';
import tobiasOstry from './souls/tobias-ostry';
import tobinGray from './souls/tobin-gray';
import tomasReed from './souls/tomas-reed';
import wilTanner from './souls/wil-tanner';
import wrenTull from './souls/wren-tull';
import yaraPike from './souls/yara-pike';

/** Each root followed by its Echo. */
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
    gerritVosk,
    gusFerrow,
    halBrindle,
    oswinHarrow,
    tamsinCrow,
    yaraPike,
    pietHalloran,
    nanOstry,
    tobiasOstry,
    tomasReed,
    anselReed,
    ilkaDorn,
    edrinDorn,
    joryHale,
    corranReese,
    adaQuell,
    rosaFenn,
    tobinGray,
    dellaThorne,
    hesperWynne,
    nedTallow,
    magsTull,
    wrenTull,
    fenwickLusk,
    odileLusk,
    idrisMott,
    sabineMott,
    lioMarsh,
    garrickFell,
  ],
  // GDD §4: the teaching Echo (Orrin Vale) is placed fifth automatically.
  dayOne: ['hettie-marrow', 'dace-weller', 'pip-ardley', 'kit-mallow', 'ilse-brann'],
};
