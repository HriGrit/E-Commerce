import nodemailer from "nodemailer";

const sendVerificationMail = async (email, otp, name) => {
  try {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "aeb18e9353690f",
        pass: "99e19faf1a278c"
      }
      // service: "gmail",
      // auth: {
      //   user: process.env.SMTP_USERNAME,
      //   pass: process.env.SMTP_PASSWORD, // this should be an App Password
      // },
    });

    await transport.sendMail({
      from: `"E-Commerce Shopitly" <${process.env.SMTP_USERNAME}>`,
      to: email,
      subject: "Verification Code for your Email Address",
      html: `
        <div style="font-family: sans-serif; padding: 10px;">
          <h2>Hey ${name},</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #4CAF50;">${otp}</h1>
          <p>This code is valid for 10 minutes.</p>
          <p>Please Verify your email to be able to use your Account.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send verification email:", error.message);
    throw error;
  }
};

export default sendVerificationMail;
