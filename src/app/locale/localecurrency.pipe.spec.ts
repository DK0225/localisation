import { LocaleCurrencyPipe } from './localecurrency.pipe';

describe('LocaleCurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new LocaleCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
