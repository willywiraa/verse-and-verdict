import { describe, expect, it } from 'vitest';
import { CASES, CASE_IDS, courtFor } from '../src/shared/cases';
import { validateCourt } from '../src/shared/cases/validate';
import { DOCKET_SIZE, docketFor } from '../src/shared/daily';
import type { Case, CourtContent } from '../src/shared/court/types';
import { OPTION, makeCase, makeCourt } from './court-fixtures';

function errorsFor(c: Case): string[] {
  return validateCourt({ cases: [c], day: [c.id] }).errors;
}

describe('the cases', () => {
  it('pass validation', () => {
    const report = validateCourt(courtFor(docketFor(1, CASE_IDS)));
    for (const warning of report.warnings) console.warn(`warning: ${warning}`);
    expect(report.errors).toEqual([]);
  });

  it('give every day three different cases that exist', () => {
    for (let day = 1; day <= 120; day++) {
      const docket = docketFor(day, CASE_IDS);
      expect(docket).toHaveLength(DOCKET_SIZE);
      expect(new Set(docket).size).toBe(DOCKET_SIZE);
      for (const id of docket) expect(CASE_IDS).toContain(id);
    }
  });

  it('use every case before repeating one', () => {
    const firstPass = new Set<string>();
    for (let day = 2; firstPass.size < CASES.length && day < 40; day++) for (const id of docketFor(day, CASE_IDS)) firstPass.add(id);
    expect(firstPass.size).toBe(CASES.length);
  });
});

describe('the case validator', () => {
  it('accepts a well-formed day', () => {
    expect(validateCourt(makeCourt(6)).errors).toEqual([]);
    expect(validateCourt(makeCourt(6)).warnings).toEqual([]);
  });

  it('warns about a short day and rejects a broken one', () => {
    const court: CourtContent = makeCourt(2);
    expect(validateCourt({ ...court, day: ['case-1', 'case-1', 'nobody'] }).errors).toEqual([
      'The Court Day lists a case twice',
      'The Court Day lists nobody, which does not exist',
    ]);
    expect(validateCourt(makeCourt(7)).errors).toContain('The Court Day lists 7 cases (most 6)');
  });

  it('enforces the word limits', () => {
    const c = makeCase('wordy', 1000);
    c.crime = 'Took all of the money twice';
    c.options[0] = { ...OPTION.prison, headline: 'A very long headline that goes on and on' };
    expect(errorsFor(c)).toEqual([
      'wordy: crime has 6 words (limit 5)',
      'wordy: option 1 (prison) headline has 9 words (limit 7)',
    ]);
  });

  it('warns about hard words', () => {
    const c = makeCase('hard', 1000);
    c.evidence[0] = { picture: 'document', text: 'He embezzled the funds.' };
    expect(validateCourt({ cases: [c], day: [c.id] }).warnings).toContain('hard: evidence 1 uses the hard word “embezzled”');
  });

  it('needs 3 or 4 punishments, each a different scene', () => {
    expect(errorsFor(makeCase('two', 1000, ['prison', 'seize']))).toContain('two: needs 3 or 4 punishments');
    const twice = makeCase('twice', 1000);
    twice.options[2] = { ...OPTION.prison, headline: 'Prison again' };
    expect(errorsFor(twice)).toContain('twice: each punishment must use a different scene');
  });

  it('rejects an option that is best on every count', () => {
    const c = makeCase('easy', 1000);
    c.options[1] = { ...OPTION.seize, crowd: 2 };
    expect(errorsFor(c)).toContain('easy: “Take wealth” is best on every count, so the choice is too easy');
  });

  it('needs the crowd to split and a surprise note', () => {
    const happy = makeCase('happy', 1000, ['prison', 'seize', 'repay']);
    expect(errorsFor(happy)).toContain(
      "happy: needs at least one punishment the crowd likes (+1 or more) and one it doesn't (0 or less)",
    );
    const plain = makeCase('plain', 1000, ['ban', 'seize', 'service']);
    expect(errorsFor(plain)).toContain('plain: at least one punishment needs a surprise note');
  });

  it('checks scene details', () => {
    const c = makeCase('details', 1000);
    c.options[0] = { ...OPTION.prison, years: 0 };
    c.options[1] = { ...OPTION.seize, items: [] };
    expect(errorsFor(c)).toEqual(['details: option 1 (prison) years must be 1–50', 'details: option 2 (seize) must take 1 to 4 things']);
  });
});
