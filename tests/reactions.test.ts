import { describe, expect, it } from 'vitest';
import { gazeAtCard, reactionTo } from '../src/ui/reactions';

describe('how a defendant reacts to a card', () => {
  it('sweats more the harsher the punishment', () => {
    expect(reactionTo('prison')).toEqual({ mood: 'nervous', take: 'gulp' });
    expect(reactionTo('ban').mood).toBe('worried');
    expect(reactionTo('seize').mood).toBe('worried');
    expect(reactionTo('service').mood).toBe('relieved');
    expect(reactionTo('chance').mood).toBe('happy');
  });

  it('looks down at the card, further right for later cards', () => {
    const first = gazeAtCard(0, 4);
    const last = gazeAtCard(3, 4);
    expect(first.y).toBeGreaterThan(0);
    expect(last.x).toBeGreaterThan(first.x);
    expect(gazeAtCard(0, 1).x).toBe(0.5);
  });
});
