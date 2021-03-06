const utils = require('./util');

describe('wait()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  test('should resolve after waiting for predetermined duration', async () => {
    const fn = jest.fn();
    utils.wait(100).then(fn);

    jest.runTimersToTime(50);
    await Promise.resolve();
    expect(fn).not.toHaveBeenCalled();

    jest.runTimersToTime(50);
    await Promise.resolve();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('printFailReason()', () => {
  test('should print out proper message', () => {
    const pullNumber = 1111;
    const failReason = 'something went wrong';
    utils.printFailReason(pullNumber, failReason);
    expect(console.info).toHaveBeenLastCalledWith(
      'LOG >',
      `Won't update #${pullNumber}, the reason:\n      > ${failReason}`,
    );
  });
});

describe('log()', () => {
  test('should print out proper message', () => {
    const msg = 'something went wrong';
    utils.log(msg);
    expect(console.info).toHaveBeenLastCalledWith('LOG >', msg);
  });
});
