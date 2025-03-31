const requiredEnvVars = ["MONGO_URI", "PORT"];

const checkEnvVars = () => {
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`FATAL ERROR: ${envVar} is not defined`);
      process.exit(1);
    }
  }
};

export default checkEnvVars;
//   "SMTP_HOST",
//   "SMTP_PORT",
//   "NODE_ENV",
//   "API_SECRET",
//   "API_KEY",
//   "PAYSTACK_SK_TEST",
//   "PAYSTACK_SK_LIVE",
//   "JWT_ACCESS_SECRET",
//   "JWT_REFRESH_SECRET",
//   "ENVIRON",
//   "VTPASS_API_KEY",
//   "VTPASS_SECRET_KEY",
//   "VTPASS_TEST_API_KEY",
//   "VTPASS_TEST_SECRET_KEY",
//   "EASYB2B_LIVE",
