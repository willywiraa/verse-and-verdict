import { SEVERITY, type Option } from '../court/types';

/** What the crowd shouts after a verdict. Too harsh or too soft depends on the punishment. */
export function crowdShout(option: Option): string {
  switch (option.crowd) {
    case 2:
      return 'Yes!';
    case 1:
      return 'Fair enough.';
    case 0:
      return 'Hmm.';
    case -1:
      return 'Really?';
    default:
      return SEVERITY[option.scene] >= 2 ? 'Too harsh!' : 'Too soft!';
  }
}
