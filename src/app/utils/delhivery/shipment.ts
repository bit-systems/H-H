import { getUserById } from "@/models/user/user.repository";
import { delhiveryPost } from "./client";
import { User } from "@/models/user/user.model";

const warehouseId = process.env.DELHIVERY_PICKUP_WAREHOUSE_ID || "";
const prepareShipmentPayload = (user: User, orderId: string) => {
  return {
    shipments: [
      {
        name: user.firstName + " " + user.lastName, // Recipient name
        order: orderId, // Order ID unique
        phone: user.mobileNumber, // Recipient phone number
        add: `${user.address.address}, ${user.address.city}, ${user.address.state}`,
        pin: user.address.zipCode, // Pin code
        city: user.address.city,
        state: user.address.state,
        payment_mode: "Prepaid",
        shipping_mode: "Surface",
      },
    ],
    pickup_location: {
      name: warehouseId,
    },
  };
};

export const createDelhiveryShipment = async (
  userId: string,
  orderId: string
) => {
  const endpoint = "/api/cmu/create.json";

  const user = await getUserById(userId);
  if (!user) {
    throw new Error("User not found for creating shipment");
  }

  const payload = prepareShipmentPayload(user, orderId);
  const res = await delhiveryPost(endpoint, payload);
  console.log(JSON.stringify(res), "delhivery shipment response");
  if (!res.success) {
    console.error("Delhivery shipment creation failed", JSON.stringify(res));
    return null;
  }
  return res.packages[0].waybill;
};
