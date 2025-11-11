const url = "https://graph.facebook.com/v23.0/790379564168295/messages";
const accessToken = "";

const payload = {
  messaging_product: "whatsapp",
  to: "",
  type: "template",
  template: {
    name: "order_created_with_tracking_final ",
    language: { code: "en" },
    components: [
      {
        type: "body",
        parameters: [{ type: "text", text: "1" }],
      },
      {
        type: "button",
        sub_type: "URL",
        index: "0",
        parameters: [{ type: "text", text: "1" }],
      },
    ],
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
