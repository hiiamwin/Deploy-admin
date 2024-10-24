export type Combo = {
  id: string;
  restaurantId: string;
  comboName: string;
  comboPrice: number;
  comboThumbnail: string;
  createdDate: string;
  status: number;
};

export type CreateCombo = {
  productInCombos: {
    productId: string;
    quantity: number;
  }[];
  comboName: string;
  isActive: boolean;
  comboDescription: string;
  price: number;
  thumbnail: string;
};
