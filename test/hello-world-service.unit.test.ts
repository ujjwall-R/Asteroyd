import { expect } from 'chai';
import { mockFunction } from '../src/mock';

describe('mockFunction', () => {
  it('should return true', () => {
    const result: boolean = mockFunction();
    expect(result).to.be.true;
  });
});
