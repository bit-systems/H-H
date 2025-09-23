import Script from "next/script";

const Razorpay = ({ orderId }) => {
  return (
    <div>
      <>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </>
    </div>
  );
};

export default Razorpay;
