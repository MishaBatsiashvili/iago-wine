import customAxios from "./customAxios";

export const getProducts = () => {
   return customAxios.get('?action=get_products')
      .then(res => {
         return res.data;
      })
}

export const getDeliveryMethods = () => {
   return customAxios.get('?action=get_delivery_methods')
      .then(res => {
         return {
            status: res.data.status,
            methods: res.data.methods.map(el => {
               return {
                  id: el.id,
                  name: el.name,
                  price: el.price,
                  type: el.type,
               }
            })
         };
      })
}