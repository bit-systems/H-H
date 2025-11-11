import { invokeWhatsapp } from "@/app/utils/whatsapp/invoker";

export const sendSms = async (phoneNumber: string, code: string) => {
  const payload = {
    messaging_product: "whatsapp",
    to: `91${phoneNumber}`,
    type: "template",
    template: {
      name: "authentication_code_copy_code_button",
      language: { code: "en_US" },
      components: [
        {
          type: "body",
          parameters: [{ type: "text", text: code }],
        },
        {
          type: "button",
          sub_type: "URL",
          index: "0",
          parameters: [{ type: "text", text: code }],
        },
      ],
    },
  };
  await invokeWhatsapp(payload);
};
