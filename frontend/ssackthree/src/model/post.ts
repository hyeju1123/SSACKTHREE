export type MenuOther = {
  name: string;
  originamlPrice: number;
  discountedPrice: number;
  imagePath: string;
};

export type MenuDetail = {
  name: string;
  isBargainning: string;
  bargainLimitTime: number;
  saleEndTime: string;
  originalPrice: number;
  discountedPrice: number;
  imagePath: string;
  isMenuLike: string;
};

export type MenuStore = {
  storeName: string;
  startTime: string;
  endTime: string;
  holiday: string;
  phoneNumber: string;
  latitude: number;
  longitude: number;
  mainAddress: string;
  detailAddress: string;
  storeImagePath: string;
};

export type DetailPost = {
  writerId: number;
  menuDetail: MenuDetail;
  menuOther: MenuOther[];
  menuStore: MenuStore;
};
