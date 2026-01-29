// Logger utility - SINGLETON PATTERN
// Single instance of logger used throughout entire application
// Provides consistent logging format with timestamps and log levels

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, 'app.log');

// Singleton logger instance
const logger = {
  /**
   * Log info level messages (general information)
   * @param {string} message - Message to log
   * @param {any} data - Optional additional data
   */
  info: (message, data = '') => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ℹ️  INFO: ${message} ${data ? JSON.stringify(data) : ''}`;
    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage + '\n');
  },

  /**
   * Log error level messages (errors that need attention)
   * @param {string} message - Error message
   * @param {Error} error - Error object or string
   */
  error: (message, error = '') => {
    const timestamp = new Date().toISOString();
    const errorMsg = error?.message || error;
    const logMessage = `[${timestamp}] ❌ ERROR: ${message} - ${errorMsg}`;
    console.error(logMessage);
    fs.appendFileSync(logFile, logMessage + '\n');
  },

  /**
   * Log warning level messages (warnings that should be noted)
   * @param {string} message - Warning message
   * @param {any} data - Optional additional data
   */
  warn: (message, data = '') => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ⚠️  WARN: ${message} ${data ? JSON.stringify(data) : ''}`;
    console.warn(logMessage);
    fs.appendFileSync(logFile, logMessage + '\n');
  },

  /**
   * Log debug level messages (only in development mode)
   * @param {string} message - Debug message
   * @param {any} data - Optional additional data
   */
  debug: (message, data = '') => {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] 🐛 DEBUG: ${message} ${data ? JSON.stringify(data) : ''}`;
      console.log(logMessage);
      fs.appendFileSync(logFile, logMessage + '\n');
    }
  },

  /**
   * Log success messages
   * @param {string} message - Success message
   * @param {any} data - Optional additional data
   */
  success: (message, data = '') => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ✅ SUCCESS: ${message} ${data ? JSON.stringify(data) : ''}`;
    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage + '\n');
  },
};

export default logger;