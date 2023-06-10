import { BASE_URL } from "../constant/app";

export const getImageProduct = (imgName) => {
  if (imgName !== undefined)
    return `${BASE_URL}/assets/uploads/products/${imgName}`;
  return 'https://semantic-ui.com/images/wireframe/square-image.png'
};

export const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
