const url = process.env.META_WHATSAPP_API_URL || "";
const accessToken = process.env.META_WHATSAPP_API_TOKEN;

export const invokeWhatsapp = async (payload: Record<string, unknown>) => {
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
