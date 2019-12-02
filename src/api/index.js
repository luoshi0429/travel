import axios from 'axios';
import api from './api';
import qs from 'qs';

/**
 * 获取首页banner商品
 */
export const getBannerInfo = (params) => {
  return api.get('/shop_home/banner', { params });
};

/**
 * 获取首页分类
 */
export const getHomeType = (params) => {
  return api.get('/shop_home/type', { params });
};

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
 * @param {String} uid
 */
export const getOrderList = (uid) => {
  return api.get('/shop_order/getOrderList', { params: { uid } });
};

/**
 * 获取用户信息
 */
export const getUserInfo = (uid) => {
  return api.post('/weixin/getUser', qs.stringify({ uid }));
};

// 微信jsapi支付
export const weixinJsapi = (data) => {
  return axios.post('/shop/weixin/pay', qs.stringify(data));
};

// 获取会员列表
export const getVipList = () => {
  return api.post('/shop_user/vip');
};

// 购买会员 uid vip_id
export const buyVip = (data) => {
  return api.post('/shop_user/buy_vip', qs.stringify(data));
};

// 获取验证码
export const getSmsCode = (phone) => {
  return api.post('/weixin/getCode', qs.stringify({ phone }));
};

// 注册
export const registerPhone = (data) => {
  return api.post('/weixin/login', qs.stringify(data));
};

export const h5Pay = (orderId) => {
  return api.post('/weixinPay/pay', qs.stringify({ orderId }));
};
