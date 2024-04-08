import { DateFromDateTimePipe } from './date-from-date-time.pipe';

describe('DateFromDateTimePipe', () => {
  it('create an instance', () => {
    const pipe = new DateFromDateTimePipe();
    expect(pipe).toBeTruthy();
  });
});
