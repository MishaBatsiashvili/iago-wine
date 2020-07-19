import customAxios from "./customAxios";

export const getProducts = () => {
   return customAxios.get('?action=get_products')
      .then(res => {
         return res.data;
      })
}