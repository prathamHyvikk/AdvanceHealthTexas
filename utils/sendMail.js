import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

const sendMail = async ({ to, subject, data }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const html = await ejs.renderFile(
      path.resolve("./views/leadEmail.ejs"),
      data,
    );

    const info = await transporter.sendMail({
      from: '"Advance Health Texas" <no-reply@aht.com>',
      to,
      subject,
      html,
    });

    console.log("Mail sent:", info.messageId);
  } catch (error) {
    console.error("Mail error:", error);
    throw error;
  }
};

export default sendMail;
