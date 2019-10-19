import api from './api';
import qs from 'qs';

/**
 * 获取产品列表
 * @param {Object} params
 */
export const getProductList = (params) => {
  return api.get('/getProductList', { params });
};

/**
 * 获取产品详情信息
 * @param {Number} id 产品id
 */
export const getProductDetail = (id) => {
  return api.get('/getProductByID', { params: { id } });
};

/**
 * 产品规格详情接口
 * @param {Object} params product_id、sku_id
 */
export const getProductSku = (params) => {
  return api.get('/getProductSku', { params });
};

/**
 * 产品校验接口
 * @param {Object} params product_id、sku_id
 */
export const productVerification = (params) => {
  return api.get('/productVerification', { params });
};

/**
 * 下单
 * @param {String} orders 分销订单号，多个订单用,分开
 */
export const submitOrder = (orders) => {
  return api.get('/submitOrder', { params: { orders } });
};

/**
 * 确认订单
 * @param {Object} data
 */
export const confirmOrder = (data) => {
  return api.post('submitOrder', { data: qs.stringify(data) });
};

/**
 * 订单列表接口
 * @param {String} orderIds 订单id
 */
export const getOrderList = (orderIds) => {
  return api.get('/getOrderList', { params: { orderIds } });
};
