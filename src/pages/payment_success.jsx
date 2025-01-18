import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const pidx = query.get("pidx");
  const orderId = query.get("orderId");

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Transaction ID: {pidx}</p>
      <p>Order ID: {orderId}</p>
    </div>
  );
};

export default PaymentSuccess;
