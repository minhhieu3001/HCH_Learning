import {View, Text} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';

export default function PaymentScreen() {
  const vnp_Version = ' 2.0.1';
  const vnp_TmnCode = 'QP8WT05F';
  const vnp_Amount = 1000000;
  const vnp_CreateDate = '20230320133200';
  const vnp_IpAddr = '210.245.113.71';
  const vnp_OrderInfo = 'naptien';
  const vnp_ReturnUrl = 'http://127.0.0.1:3000';
  const vnp_TxnRef = '1234';
  const vnp_SecureHash = 'HCPOJMPPSGPPZDNAKXXKHZJNPALWGXPL';

  return (
    <WebView
      source={{
        uri: `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=${vnp_Amount}&vnp_Command=pay&vnp_CreateDate=${vnp_CreateDate}&vnp_CurrCode=VND&vnp_IpAddr=${vnp_IpAddr}&vnp_Locale=vn&vnp_OrderInfo=${vnp_OrderInfo}&vnp_ReturnUrl=${vnp_ReturnUrl}&vnp_TmnCode=${vnp_TmnCode}&vnp_TxnRef=${vnp_TxnRef}&vnp_Version=${vnp_Version}&vnp_SecureHash=${vnp_SecureHash}`,
      }}
    />
  );
}
