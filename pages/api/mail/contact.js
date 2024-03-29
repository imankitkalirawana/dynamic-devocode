import { transporter, mailOptions } from "@/utils/nodemailer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { firstname, lastname, phoneNumber, email, message } = req.body;
      if (!firstname || !email || !message) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
      const htmlTemplate = `
        <html>
          <body>
            <h1>Contact Form Submission</h1>
            <p><strong>Name:</strong> ${firstname}</p>
            <p><strong>Email:</strong> ${lastname}</p>
            <p><strong>Email:</strong> ${phoneNumber}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
          </body>
        </html>
      `;
      await transporter.sendMail({
        ...mailOptions,
        subject: "Contact Form from Devocode",
        html: htmlTemplate,
      });
      res.status(200).json({ message: "Message sent" });
    } catch (e) {
      console.log("error", e.message);
      res.status(400).json({ message: e.message });
    }
  }
};

export default handler;
