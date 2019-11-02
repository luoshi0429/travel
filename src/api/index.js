import axios from 'axios';
import api from './api';
import qs from 'qs';

/**
 * 获取产品列表
 * @param {Object} params
 */
export const getProductList = (params) => {
  return api.get('/shop/getProductList', { params });
};

/**
 * 获取产品详情信息
 * @param {Number} id 产品id
 */
export const getProductDetail = (id) => {
  return api.get('/shop/getProductByID', { params: { id } });
};

/**
 * 产品规格详情接口
 * @param {Object} params product_id、sku_id
 */
export const getProductSku = (params) => {
  return api.get('/shop/getProductSku', { params });
};

/**
 * 产品校验接口
 * @param {Object} params product_id、sku_id
 */
export const productVerification = (params) => {
  return api.get('/shop/productVerification', { params });
};

/**
 * 确认订单
 * @param {Object} data
 */
export const confirmOrder = (data) => {
  return api.post('/shop_order/submitOrder', qs.stringify(data));
};

/**
 * 订单列表接口
 * @param {String} orderIds 订单id
 */
export const getOrderList = (orderIds) => {
  return api.get('/shop_order/getOrderList', { params: { orderIds } });
};

/**
 * 获取用户信息
 */
export const getUserInfo = (uid) => {
  return api.post('/weixin/getUser', qs.stringify({ uid }));
};

// 微信jsapi支付
export const weixinJsapi = (openid) => {
  return axios.post('/shop/weixin/pay', qs.stringify({ openid }));
};
