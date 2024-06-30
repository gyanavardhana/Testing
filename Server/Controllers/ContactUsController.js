const Resend = require('resend').Resend; // Import Resend class explicitly
const resend = new Resend('re_XuCpAM91_DuDTAS1SzL7ACfvN2s7eS1m8');

const contactUs = async (req, res) => {
    try {
        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: ["gyanavardhanmamidisetti@gmail.com"],
          subject: "Contact Us Form Submission",
          html: `
            <div style="font-family: Arial, sans-serif;">
              <h2>Contact Us Form Submission</h2>
              <p><strong>Name:</strong> ${req.body.name}</p>
              <p><strong>Email:</strong> ${req.body.email}</p>
              <p><strong>Message:</strong></p>
              <p>${req.body.message}</p>
            </div>
          `,
        });
    
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Error sending email" });
        } else {
          console.log("Email sent successfully:", data);
          res.status(200).json({ message: "Message sent successfully" });
        }
      } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal server error" });
      }
}

module.exports = {
    contactUs
}
