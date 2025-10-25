const url = "https://graph.facebook.com/v22.0/803419079527438/messages";
const accessToken = "";

const payload = {
  messaging_product: "whatsapp",
  to: "",
  type: "template",
  template: {
    name: "hello_world",
    language: {
      code: "en_US",
    },
  },
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
