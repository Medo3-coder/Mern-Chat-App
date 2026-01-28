// Validates that all required environment variables exist
// Fails fast if anything is missing (principle: fail early, fail loud)

const validateEnv = () => {
  const requiredEnvVars = [
    "NODE_ENV",
    "PORT",
    "MONGO_URI",
    "JWT_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "EMAIL_USER",
    "EMAIL_PASSWORD",
    "EMAIL_MODE",
    "CLOUDINARY_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "FRONTEND_URL",
  ];

  const missingVars = [];

  // Check each required environment variable and collect any that are missing
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });

  // Validate specific conditions
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long");
  }

  if (
    process.env.EMAIL_MODE &&
    !["real", "mock"].includes(process.env.EMAIL_MODE)
  ) {
    throw new Error('EMAIL_MODE must be either "real" or "mock"');
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingVars.join("\n")}\n\nPlease check your .env file.`,
    );
  }

    console.log('✅ All environment variables validated successfully');
};

export default validateEnv;
