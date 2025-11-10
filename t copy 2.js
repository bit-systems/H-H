const url =
  "https://graph.facebook.com/v22.0/1165058968455646/message_templates";
const accessToken = "";

const payload = {
  name: "otp_verification_code",
  language: "en_US",
  category: "AUTHENTICATION",
  components: [
    {
      type: "BODY",
      text: "Hey {{1}}, {{2}} is your verification code.",
      example: {
        body_text: [["John", "432156"]],
      },
    },
  ],
};

try {
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(async (response) => {
    console.log("✅ WhatsApp API response:", await response.json());
  });

  // const data = await response.json();
} catch (error) {
  console.error("❌ Error sending WhatsApp message:", error);
}
