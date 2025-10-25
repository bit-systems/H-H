const url = process.env.META_WHATSAPP_API_URL || "";
const accessToken = process.env.META_WHATSAPP_API_TOKEN;

export const sendSms = async (phoneNumber: string) => {
  const payload = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "template",
    template: {
      name: "hello_world",
      language: {
        code: "en_US",
      },
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    console.error("❌ Error sending WhatsApp message:", error);
  }
};
