/**
 * A logger interface
 */
export interface Logger {
  /**
   * Log a message at the DEBUG level.
   *
   * @param message - Message body to log.
   * @param args - Additional data to append to the log message.
   */
  debug(message: string, ...args: unknown[]): void;

  /**
   * Log a message at the INFO level.
   *
   * @param message - Message body to log.
   * @param args - Additional data to append to the log message.
   */
  info(message: string, ...args: unknown[]): void;

  /**
   * Log a message at the WARNING level.
   *
   * @param message - Message body to log.
   * @param args - Additional data to append to the log message.
   */
  warning(message: string, ...args: unknown[]): void;

  /**
   * Log a message at the ERROR level.
   *
   * @param message - Message body to log.
   * @param args - Additional data to append to the log message.
   */
  error(message: string, ...args: unknown[]): void;
}
