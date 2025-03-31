import nodemailer, { TransportOptions, Transporter } from "nodemailer";

export const transporter: Transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  // auth: {
  //   user: process.env.SMTP_USER,
  //   pass: process.env.SMTP_PASS,
  // },
  secure: false,
} as TransportOptions);

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Connection Error:", error.message);
  } else {
    console.log("Server is ready to take messages:", success);
  }
});
