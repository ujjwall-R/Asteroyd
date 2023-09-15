import { expect } from 'chai';
import { mockFunction } from '../src/mock';
var assert = require('assert');

describe('mockFunction', () => {
  it('should return true', () => {
    const result: boolean = mockFunction();
    expect(result).to.be.true;
  });
  it('2 + 2 should return 4', function() {
    assert.equal(2+2, 4);
});
});
