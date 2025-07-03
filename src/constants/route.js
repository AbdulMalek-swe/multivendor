export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  PRODUCTS: "/products",
  CART: "/cart",
  PRODUCT_DETAILS: (id) => `/products/${id}`,
  CATEGORY: "/category",
  // ORDER PROCESS 
  CHECKOUT:"/checkout",
  //   auth route
  LOGIN: "/auth/login",
  REGISTER: "/register",
  //   user dashboard route
  DASHBOARD: "/dashboard",
  DASHBOARD_ORDERS: "/dashboard/orders",
  DASHBOARD_SETTINGS: "/dashboard/settings",
  TRACK: "/dashboard/my-order",
};
