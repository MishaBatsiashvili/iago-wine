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
                  id: parseInt(el.id),
                  name: el.name,
                  price: parseFloat(el.price),
                  type: parseInt(el.type),
               }
            })
         };
      })
}


export const getPaymentMethods = () => {
   return customAxios.get('?action=get_payment_methods')
      .then(res => {
         return {
            status: res.data.status,
            methods: res.data.methods.map(el => ({
               id: parseInt(el.id),
               name: el.name,
            }))
         }
      })
}

export const sendFormToPdf = () => {
   customAxios.post('?action=get_payment_methods', {
      firstName: 'mish',
      lastName: 'bats',
      address: 'myaddress',
      phone: '12222',
      email: 'd@d.com',
      comment: 'asdasd',
      cartId: 3,
      verif: 'NJ05',
      deliveryMethod: 1,
      paymentMethod: 2,
   }).then(res => {
         // return {
         //    status: res.data.status,
         //    methods: res.data.methods.map(el => ({
         //       id: parseInt(el.id),
         //       name: el.name,
         //    }))
         // }
      })
}