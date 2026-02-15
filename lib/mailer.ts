import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
): Promise<void> {
  const mailOptions = {
    from: `"Kalaam - कवितालय" <${process.env.SMTP_USER || "noreply@kalaam.app"}>`,
    to,
    subject: "Reset Your Password - Kalaam",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1a1a1a; font-size: 28px; margin: 0;">कवितालय</h1>
          <p style="color: #666; font-size: 14px; margin-top: 4px;">Kalaam - NIT Rourkela</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px;">
          <h2 style="color: #1a1a1a; font-size: 20px; margin: 0 0 16px 0;">Password Reset Request</h2>
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
            We received a request to reset your password. Click the button below to set a new password. 
            This link will expire in <strong>1 hour</strong>.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" 
               style="background-color: #000000; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 13px; line-height: 1.5; margin: 24px 0 0 0;">
            If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            If the button doesn't work, copy and paste this URL into your browser:<br/>
            <a href="${resetUrl}" style="color: #3b82f6; word-break: break-all;">${resetUrl}</a>
          </p>
        </div>
      </div>
    `,
  };

  // Always log the reset URL for local development/debugging
  console.log(`[Password Reset] Link generated for ${to}: ${resetUrl}`);

  // Only send the email if SMTP credentials are configured
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    await transporter.sendMail(mailOptions);
    console.log(`[Password Reset] Email sent to ${to}`);
  } else {
    console.warn(
      "[Password Reset] SMTP not configured — email not sent. Use the logged URL above to reset."
    );
  }
}
