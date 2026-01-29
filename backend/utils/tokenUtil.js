// JWT Token Utility - Factory Pattern
// Creates and verifies JWT tokens for authentication
// Handles access tokens, verification tokens, and reset tokens

import jwt from "jsonwebtoken";
import logger from "./logger";

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = "15m"; // Access tokens expire in 15 minutes
const VERIFICATION_TOKEN_EXPIRY = "1d"; // Verification tokens expire in 1 day
const RESET_TOKEN_EXPIRY = "1h"; // Reset tokens expire in 1 hour

/**
 * Generate JWT Access Token
 * Used after successful login/registration
 * @param {string} userId - MongoDB user _id
 * @param {string} email - User email
 * @returns {string} JWT token
 */

export const generateAccessToken = (userId, email) => {
  try {
    const token = jwt.sign(
      {
        userId,
        email,
        type: "access",
      },
      JWT_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRY,
        issuer: "my-chat-app",
        audience: "web",
      },
    );

    logger.debug("Access token generated", { userId });
    return token;
  } catch (error) {
    logger.error("Failed to generate access token", error);
    throw new Error("Token generation failed");
  }
};

/**
 * Generate Email Verification Token
 * Used in email verification link
 * @param {string} userId - MongoDB user _id
 * @returns {string} Verification token
 */
export const generateVerificationToken = (userId) => {
  try {
    const token = jwt.sign(
      {
        userId,
        type: "verification",
      },
      JWT_SECRET,
      {
        expiresIn: VERIFICATION_TOKEN_EXPIRY,
      },
    );
    logger.debug("Verification token generated", { userId });
    return token;
  } catch (error) {
    logger.error("Failed to generate verification token", error);
    throw new Error("Verification token generation failed");
  }
};

/**
 * Generate Password Reset Token
 * Used for password reset functionality
 * @param {string} userId - MongoDB user _id
 * @returns {string} Reset token
 */

export const generateResetToken = (userId) => {
    try{
        const token = jwt.sign(
            {
                userId,
                type: "reset",
            },
            JWT_SECRET,
            {
                expiresIn: RESET_TOKEN_EXPIRY,
            }
        );

        logger.debug('Reset token generated', { userId });
        return token;
    } catch (error) {
        logger.error('Failed to generate reset token', error);
        throw new Error('Reset token generation failed');
    }
}
