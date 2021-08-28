import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;
const users = JSON.parse(localStorage.getItem("user_details"))
const headers = {
  "Content-Type": "application/json",
};


axios.defaults.baseURL = URL;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

export const LoginAPI = data => {
  return axios
    .post(`${URL}/users/login`, data, headers)
    .then(res => res)
    .catch(err => err);
};

export const TrainerRegisterAPI = data => {
  return axios
    .post(`${URL}/users/register`, data, headers)
    .then(res => res)
    .catch(err => err);
};

export const AddCategoryAPI = data => {
  return axios
    .post(`${URL}/products/add-category`, data, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

export const ListCategoryAPI = () => {
  return axios
    .get(`${URL}/products/list-category`, headers)
    .then(res => res)
    .catch(err => err);
};

export const ListMealCategoryAPI = () => {
  return axios
    .get(`${URL}/meals/list-category`, headers)
    .then(res => res)
    .catch(err => err);
};

export const ListCategoryByLimitAPI = data => {
  return axios
    .post(`${URL}/products/list-category-bylimit`, data, headers)
    .then(res => res)
    .catch(err => err);
};

export const AddProductAPI = data => {
  return axios
    .post(`${URL}/products/create-product`, data, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

export const UpdateProductAPI = (productId,data) => {
  return axios
    .post(`${URL}/products/update-product/${productId}`, data, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

export const DeleteProductAPI = (productId) => {
  return axios
    .get(`${URL}/products/delete-product/${productId}`, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

export const ListProductsAPI = (pageNo) => {
  const users = localStorage.getItem("user_details") && JSON.parse(localStorage.getItem("user_details"));
  return axios
    .get(`${URL}/products/list-products/${pageNo}`, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

export const ListAllProductsByLimitAPI = data => {
  return axios
    .post(`${URL}/products/list-all-products-bylimit`, data, headers)
    .then(res => res)
    .catch(err => err);
};



export const AddVideoAPI = data => {
  return axios
    .post(`${URL}/users/add-video`, data, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

export const UpdateVideoAPI = (videoId,data) => {
  return axios
    .post(`${URL}/users/update-video/${videoId}`, data, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

export const ListVideoAPI = data => {
  return axios
    .get(`${URL}/users/list-video`, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

// Amit's Changes
export const UserRegisterAPI = data => {
  return axios
    .post(`${URL}/users/register`, data, headers)
    .then(res => res)
    .catch(err => err);
};


export const GetSubscriptionAPI = data => {
  return axios
    .post(`${URL}/users/subscription-payment`, data, headers)
    .then(res => res)
    .catch(err => err);
};

export const SubscriptionCompleteAPI = data => {
  return axios
    .post(`${URL}/users/subscription-complete`, data, headers)
    .then(res => res)
    .catch(err => err);
};

export const CalculatorAPI = data => {
  return axios
    .post(`${URL}/users/calculator`, data, headers)
    .then(response => response)
    .catch(err => err);
}

// DietPlan Purchasing API

export const GetLeadData = data => {
  return axios
    .post(`${URL}/users/leads`, data, headers)
    .then(res => res)
    .catch(err => err);
};

export const GetDietPlanAPI = data => {
  return axios
    .post(`${URL}/users/dierplan-payment`, data, headers)
    .then(res => res)
    .catch(err => err);
};

export const DietPurchaseCompleteAPI = data => {
  return axios
    .post(`${URL}/users/dierplan-payment-complete`, data, headers)
    .then(res => res)
    .catch(err => err);
};

export const GetAllProductsAPI = (data) => {
  return axios
    .post(`${URL}/products/list-all-products`, data, headers)
    .then(res => res)
    .catch(err => err);
}

export const GetAllMealsAPI = (data) => {
  return axios
    .post(`${URL}/meals/list-all-meals`, data, headers)
    .then(res => res)
    .catch(err => err);
}

export const ListSingleMealAPI = (data) => {
  return axios
    .post(`${URL}/meals/list-single-meal`, data, headers)
    .then(res => res)
    .catch(err => err);
}


export const GetProductDetailAPI = (prof_id) => {
  return axios
    .post(`${URL}/products/list-single-product?product_id=` + prof_id, headers)
    .then(res => res)
    .catch(err => err);
}

export const GetCatProductsAPI = (data) => {
  return axios
    .post(`${URL}/products/list-all-products-bycat`, data, headers)
    .then(res => res)
    .catch(err => err);
}

export const GetCatMealsAPI = (data) => {
  return axios
    .post(`${URL}/meal/list-all-meals-bycat`, data, headers)
    .then(res => res)
    .catch(err => err);
}

export const GetFeaturedProductsAPI = () => {
  return axios
    .get(`${URL}/products/list-featured-products`, headers)
    .then(res => res)
    .catch(err => err);
}

export const ListSingleProductAPI = data => {
  return axios
    .post(`${URL}/products/list-single-product`, data, headers)
    .then(res => res)
    .catch(err => err);
};

export const BuyProductsAPI = data => {
  return axios
    .post(`${URL}/orders/payment`, data, headers)
    .then(res => res)
    .catch(err => err);
}

export const ProdPaymentsAPI = data => {
  return axios
    .post(`${URL}/orders/payment-complete`, data, headers)
    .then(res => res)
    .catch(err => err);
}

export const AddWishAPI = data => {
  return axios
    .post(`${URL}/products/add-wish`, data, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

export const RemoveWishAPI = data => {
  return axios
    .post(`${URL}/products/remove-wish`, data, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

export const ListWishAPI = data => {
  return axios
    .post(`${URL}/products/list-wish-products`, data, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

export const AddRatingAPI = data => {
  const users = localStorage.getItem("user_details") && JSON.parse(localStorage.getItem("user_details"));
  return axios
    .post(`${URL}/products/create-rating`, data, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
};

export const ListRatingAPI = data => {
  return axios
    .post(`${URL}/products/list-rating`, data, headers)
    .then(res => res)
    .catch(err => err);
};
export const CoupanAPI = coupon => {
  return axios
    .post(`${URL}/products/check-coupon`, coupon, headers)
    .then(res => res)
    .catch(err => err);
}

export const GetTrainerListAPI = (data) => {
  let url;
  if(!data.search && data.search === undefined && !data.category_id && data.category_id === undefined){
    url = `/users/fetch-trainer?page_no=${data.page_no}`;
  }else if(!data.search && data.search === undefined && data.category_id === ''){
    url = `/users/fetch-trainer?page_no=${data.page_no}`;
  }else if(!data.search && data.search === undefined && data.category_id !== undefined){
    url = `/users/fetch-trainer?page_no=${data.page_no}&category_id=${data.category_id}`;
  }else if(data.search && data.category_id === ''){
    url = `/users/fetch-trainer?page_no=${data.page_no}&keyword=${data.search}`;
  }else{
    url = `/users/fetch-trainer?page_no=${data.page_no}&category_id=${data.category_id}&keyword=${data.search}`;
  }

  return axios
    // .get(`${URL}/users/fetch-trainer?page_no=${data.page_no}`, headers)
    .get(`${URL}${url}`, headers)
    .then(res => res)
    .catch(err => err);
}

export const GetTrainerCatAPI = (page_no) => {
  return axios
    .get(`${URL}/users/fetch-trainer-categories`, headers)
    .then(res => res)
    .catch(err => err);
}

export const FilterTrainerAPI = (data) => {
  return axios
    .get(`${URL}/users/fetch-trainer?page_no=${data.page_no}&category_id=${data.category_id}`, headers)
    .then(res => res)
    .catch(err => err);
}

export const SearchTrainerAPI = (data) => {
  return axios
    .get(`${URL}/users/fetch-trainer?page_no=${data.page_no}&category_id=${data.category_id}&search=${data.search}`, headers)
    .then(res => res)
    .catch(err => err);
}

export const TrainerVideosAPI = (data) => {
  return axios
    .get(`${URL}/users/fetch-trainer-video?trainerId=${data.trainerId}&pageNo=${data.pageNo}`, headers)
    .then(res => res)
    .catch(err => err);
}

export const TrainerProfileAPI = (trainer_id) => {
  return axios
    .get(`${URL}/users/fetch-trainer?trainerId=${trainer_id}`, headers)
    .then(res => res)
    .catch(err => err);
}
export const DeleteVideoAPI = (videoId) => {
  return axios
    .get(`${URL}/users/delete-trainer-video/${videoId}`, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
}

export const GetNotificationAPI = (page_no) => {
  const users = localStorage.getItem("user_details") && JSON.parse(localStorage.getItem("user_details"));
  return axios
    .get(`${URL}/notification/fetch-notification?pageno=${page_no}`, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
}

export const GetOrderListAPI = (page_no) => {
  const users = localStorage.getItem("user_details") && JSON.parse(localStorage.getItem("user_details"));
  return axios
    .get(`${URL}/order?page_no=${page_no}`, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
}

export const GetCalculationAPI = () => {
  const users = localStorage.getItem("user_details") && JSON.parse(localStorage.getItem("user_details"));
  return axios
    .get(`${URL}/fetch-calculator`, {
      headers: {
        'token': `bearer ${users.token}`
      },
    })
    .then(res => res)
    .catch(err => err);
}

export const RemoveOrderAPI = async (orderId) => {
  return axios.get(`${URL}/remove-order?orderId=${orderId}`, {
    headers: {
      'token': `bearer ${users.token}`
    },
  })
  .then(res => res)
  .catch(err => err);
}