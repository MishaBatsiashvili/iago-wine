import customAxios from "./customAxios";

window.axios = customAxios;

export const imagePathGenerator = (imageName, folderName) => {
    return process.env.REACT_APP_IMAGE_PREPATH + folderName + '/' + imageName;
}

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
                        name_en: el.name_en,
                        name_ge: el.name_ge,
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
                    name_en: el.name_en,
                    name_ge: el.name_ge,
                }))
            }
        })
}

export const sendFormToCheckout = (formData) => {
    return customAxios.post('?action=checkout', formData).then(res => {
        return res.data;
    })
}

export const sendVerifCodeApi = (phone, cartId) => {
    return customAxios.post('?action=send_verification_code', {
        phone: phone,
        cartId: cartId,
    }).then(res => {
        return res.data;
    });
}

export const getAllSections = () => {
    return customAxios.get('?action=get_all_sections').then(res => {
        return res.data;
    });
}

export const getAllSlides = () => {
    return customAxios.get('?action=get_all_slides').then(res => {
        return res.data;
    });
}

export const getDynamicPage = (pageName) => {
    return customAxios.post('?action=get_page', {
        page_name: pageName
    }).then(res => {
        return res.data;
    });
}

export const getDynamicPageNames = () => {
    return customAxios.get('?action=get_page_names').then(res => {
        return res.data;
    });
}

export const  getAllStrings = () => {
    return customAxios.get('?action=get_all_strings').then(res => {
        return res.data;
    });
}

export const fetchGeneralInfo = () => {
    return customAxios.get('?action=get_general_info').then(res => {
        return res.data;
    });
}