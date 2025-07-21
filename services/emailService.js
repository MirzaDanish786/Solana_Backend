import transporter from "../config/mailConfig.js";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Solona 👨‍💻" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📨 Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
