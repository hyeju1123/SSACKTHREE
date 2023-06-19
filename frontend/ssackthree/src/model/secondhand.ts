export type SecondProduct = {
  productId: number;
  price: number;
  title: string;
  hopingPlaceAddress: string;
  createdDate: string;
  imagePath: string;
  distance: string;
};

export type OtherSecondProduct = {
  title: string;
  price: number;
};

export type SecondProductDetail = {
  writerId: number;
  title: string;
  status: string;
  price: number;
  hopingPlaceAddress: string;
  createdDate: string;
  content: string;
  imagePath: string;
  townOtherProductResponseDtoList: OtherSecondProduct[];
};
