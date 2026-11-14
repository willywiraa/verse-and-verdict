import { describe, expect, it } from 'vitest';
import { CONTENT } from '../src/content';
import { validateContent } from '../src/content/validate';

describe('content', () => {
  it('passes validation', () => {
    const report = validateContent(CONTENT);
    for (const warning of report.warnings) console.warn(`warning: ${warning}`);
    expect(report.errors).toEqual([]);
  });
});
