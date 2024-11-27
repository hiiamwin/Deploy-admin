export type Order = {
  id: string;
  orderStatus: string;
  totalPrice: number;
  reduceAmount: number;
  finalAmount: number;
  orderTime: string;
  tableId: string;
  tableNumber: number;
  customerName: string;
  phoneNumber: string | null;
  feedback: string | null;
  createdDate: string;
};

export type OrderDetail = {
  orderId: string;
  orderStatus: string;
  totalPrice: number;
  orderTime: string;
  feedback: string | null;
  orderDetails: Array<{
    id: string;
    comboId: string | null;
    productId: string | null;
    comboName: string | null;
    productName: string | null;
    thumbnail: string | null;
    image: string | null;
    status: string;
    quantity: number;
    isRefund: boolean;
    refundQuantity: number;
    price: number;
    note: string;
    isAddMore: boolean;
  }>;
};
