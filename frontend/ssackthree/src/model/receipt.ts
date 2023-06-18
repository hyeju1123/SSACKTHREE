export enum STATUS {
  READY = 'READY',
  CANCEL = 'CANCEL',
  COMPLETED = 'COMPLETED',
  BARGAIN_COMPLETED = 'BARGAIN_COMPLETED',
  BARGAIN_SUCCESS = 'BARGAIN_SUCCESS',
  BARGAIN_FAIL = 'BARGAIN_FAIL',
  BARGAIN_ACTIVE = 'BARGAIN_ACTIVE',
}

export type Receipt = {
  menuName: string;
  storeName: string;
  originalPrice: number;
  discountedPrice: number;
  status: STATUS;
};
