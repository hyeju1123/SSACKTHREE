export const convertTime = (saleEndTime: string) => {
  const date = new Date(saleEndTime);
  return `${date.getHours()}:${date.getMinutes()}`;
};

export const calcDiscountRate = (original: number, discounted: number) => {
  return ((original - discounted) / original) * 100;
};

export const formatPhoneNumber = (phoneNum: string) => {
  let cleaned = ('' + phoneNum).replace(/\D/g, '');

  let match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3];
  }

  return null;
};

export const formatPrice = (price: string) => {
  if (price.length > 3) {
    return price.slice(0, -3) + ',' + price.slice(-3);
  }
  return price;
};
