const url =
  "https://graph.facebook.com/v22.0/1165058968455646/message_templates";
const accessToken = "";

const payload = {
  name: "otp_confirmation",
  language: "en",
  category: "AUTHENTICATION",
  parameter_format: "NAMED",
  components: [
    {
      type: "BODY",
      text: "Your OTP is {{otp_number}}.",
      example: {
        body_text_named_params: [
          {
            param_name: "otp_number",
            example: "860198",
          },
        ],
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
