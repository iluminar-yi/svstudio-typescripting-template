import MockSV from '../mock/mock-sv';

import { SvLogger } from './sv-logger';
import { Logger } from './types';

const METHODS: (keyof Logger)[] = ['debug', 'info', 'warning', 'error'];
const MESSAGE = 'test message';
const ARG_0 = 'arg0';
const ARG_1 = 'arg 1';

jest.mock('../mock/mock-sv');
const mockedSv = MockSV as jest.Mocked<typeof MockSV>;

describe('sv logger', (): void => {
  METHODS.forEach((method): void => {
    describe(`for level "${method}"`, (): void => {
      [false, true].forEach((svShouldThrow): void => {
        describe(`when SV ${svShouldThrow ? 'throws' : 'does not throw'}`, (): void => {
          const logger = new SvLogger(mockedSv);

          it('should work and not throw when called with no args', (): void => {
            expect.assertions(1);
            // eslint-disable-next-line jest/no-if
            if (svShouldThrow) {
              mockedSv.showMessageBoxAsync.mockImplementation((): never => {
                throw new Error();
              });
            }

            logger[method](MESSAGE);

            expect(mockedSv.showMessageBoxAsync).toHaveBeenCalledWith(method.toUpperCase(), MESSAGE);
            mockedSv.showMessageBoxAsync.mockClear();
          });

          it('should work and not throw when called with 1 arg', (): void => {
            expect.assertions(1);
            // eslint-disable-next-line jest/no-if
            if (svShouldThrow) {
              mockedSv.showMessageBoxAsync.mockImplementation((): never => {
                throw new Error();
              });
            }

            logger[method](MESSAGE, ARG_0);

            expect(mockedSv.showMessageBoxAsync).toHaveBeenCalledWith(
              method.toUpperCase(),
              `${MESSAGE}:
[
  "${ARG_0}"
]`,
            );
            mockedSv.showMessageBoxAsync.mockClear();
          });

          it('should work and not throw when called with 2 arg', (): void => {
            expect.assertions(1);
            // eslint-disable-next-line jest/no-if
            if (svShouldThrow) {
              mockedSv.showMessageBoxAsync.mockImplementation((): never => {
                throw new Error();
              });
            }

            logger[method](MESSAGE, ARG_0, ARG_1);

            expect(mockedSv.showMessageBoxAsync).toHaveBeenCalledWith(
              method.toUpperCase(),
              `${MESSAGE}:
[
  "${ARG_0}",
  "${ARG_1}"
]`,
            );
            mockedSv.showMessageBoxAsync.mockClear();
          });
        });
      });
    });
  });
});
