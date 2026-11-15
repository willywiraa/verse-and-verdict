import { describe, expect, it } from 'vitest';
import { MOODS, OUTFITS } from '../src/court/types';
import { CAST } from '../src/ui/rig/cast';
import { EXPRESSIONS, POSES, TAKES, fidgetFor, outfitStyle } from '../src/ui/rig/parts';

describe('the character rig', () => {
  it('has a face for every mood', () => {
    for (const mood of MOODS) expect(EXPRESSIONS[mood]).toBeDefined();
  });

  it('has a style for every outfit, and colours only the outfits that come in colours', () => {
    for (const outfit of OUTFITS) expect(outfitStyle(outfit).top).toMatch(/^#/);
    expect(outfitStyle('tee', '#123456').top).toBe('#123456');
    expect(outfitStyle('prison', '#123456').top).toBe('#f08a24');
  });

  it('gives every pose two arm angles per arm', () => {
    for (const pose of Object.values(POSES)) {
      for (const arm of [pose.l, pose.r]) {
        expect(arm).toHaveLength(2);
        for (const angle of arm) expect(Math.abs(angle)).toBeLessThanOrEqual(180);
      }
    }
  });

  it('keeps every reaction short', () => {
    for (const take of Object.values(TAKES)) {
      expect(take.duration).toBeLessThanOrEqual(1200);
      expect(take.keyframes.length).toBeGreaterThan(1);
    }
  });

  it('gives the supporting cast different faces and builds, not only different clothes', () => {
    const shapes = new Set(Object.values(CAST).map((look) => `${look.face}/${look.build}/${look.hair}`));
    expect(shapes.size).toBe(Object.keys(CAST).length);
  });

  it('lets people with a watch check it while they wait', () => {
    expect(fidgetFor({ skin: 1, hair: 'short', outfit: 'suit', extras: ['watch'] })).toBe('watch');
    expect(fidgetFor({ skin: 1, hair: 'short', outfit: 'suit' })).toBeNull();
  });
});
