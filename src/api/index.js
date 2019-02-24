// 这个文件用来管理所有的请求
import request from "@/utils/request";

export const getIndexSwiper = () => request.get("home/swiperdata");
export const getIndexCat = () => request.get("home/catitems");
export const getIndexFloor = () => request.get("home/floordata");
// 商品
export const getGoodsQsearch = obj => request.get("goods/qsearch", obj);
export const getGoodsSearch = obj => request.get("goods/search", obj);
export const getGoodsDetail = obj => request.get("goods/detail", obj);
