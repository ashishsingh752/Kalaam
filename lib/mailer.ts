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

export async function sendApprovalEmail(
  to: string,
  userName: string
): Promise<void> {
  const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}signin`;

  const mailOptions = {
    from: `"Kalaam - कवितालय" <${process.env.SMTP_USER || "noreply@kalaam.app"}>`,
    to,
    subject: "🎉 Your Account Has Been Approved - Kalaam",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1a1a1a; font-size: 28px; margin: 0;">कवितालय</h1>
          <p style="color: #666; font-size: 14px; margin-top: 4px;">Kalaam - NIT Rourkela</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="font-size: 48px;">🎉</span>
          </div>
          <h2 style="color: #1a1a1a; font-size: 20px; margin: 0 0 16px 0; text-align: center;">Account Approved!</h2>
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
            Hi <strong>${userName}</strong>,
          </p>
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
            Great news! Your account on <strong>Kalaam - कवितालय</strong> has been approved by the admin. 
            You can now log in and start exploring the platform.
          </p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${loginUrl}" 
               style="background-color: #000000; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; display: inline-block;">
              Log In Now
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 13px; line-height: 1.5; margin: 24px 0 0 0; text-align: center;">
            Welcome to the community! We're excited to have you on board.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            If the button doesn't work, copy and paste this URL into your browser:<br/>
            <a href="${loginUrl}" style="color: #3b82f6; word-break: break-all;">${loginUrl}</a>
          </p>
        </div>
      </div>
    `,
  };

  console.log(`[Account Approval] Sending approval email to ${to}`);

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    await transporter.sendMail(mailOptions);
    console.log(`[Account Approval] Email sent to ${to}`);
  } else {
    console.warn(
      "[Account Approval] SMTP not configured — email not sent."
    );
  }
}

export async function sendDenialEmail(
  to: string,
  userName: string
): Promise<void> {
  const adminEmail = process.env.SMTP_USER || "admin@kalaam.app";

  const mailOptions = {
    from: `"Kalaam - कवितालय" <${adminEmail}>`,
    to,
    subject: "Account Update - Kalaam",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1a1a1a; font-size: 28px; margin: 0;">कवितालय</h1>
          <p style="color: #666; font-size: 14px; margin-top: 4px;">Kalaam - NIT Rourkela</p>
        </div>
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px;">
          <h2 style="color: #1a1a1a; font-size: 20px; margin: 0 0 16px 0;">Account Registration Update</h2>
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
            Hi <strong>${userName}</strong>,
          </p>
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
            We regret to inform you that your account registration on <strong>Kalaam - कवितालय</strong> 
            could not be approved at this time. This may be due to incomplete or incorrect information provided during registration.
          </p>
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="color: #374151; font-size: 14px; font-weight: 600; margin: 0 0 12px 0;">
              📧 Need Help? Contact the Admin:
            </p>
            <p style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0;">
              <strong>Email:</strong> 
              <a href="mailto:${adminEmail}" style="color: #3b82f6; text-decoration: none;">${adminEmail}</a>
            </p>
          </div>
          <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0;">
            Feel free to reach out to the admin for further clarification or to re-apply with the correct details.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0; text-align: center;">
            This is an automated message from Kalaam - कवितालय, NIT Rourkela.
          </p>
        </div>
      </div>
    `,
  };

  console.log(`[Account Denial] Sending denial email to ${to}`);

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    await transporter.sendMail(mailOptions);
    console.log(`[Account Denial] Email sent to ${to}`);
  } else {
    console.warn(
      "[Account Denial] SMTP not configured — email not sent."
    );
  }
}
