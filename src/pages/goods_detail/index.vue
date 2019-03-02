<template>
  <view>
    <!-- 轮播图分区 -->
    <swiper indicator-dots autoplay circular>
        <block v-for="(item,index) in detail.pics" :key="index">
            <swiper-item>
                <image @tap="previewbigImg(item.pics_big)" class="slide-image" mode="aspectFill" :src="item.pics_big"></image>
            </swiper-item>
        </block>
    </swiper>
    <!-- 商品价格和商品信息 -->
    <view class="goods-price">
      ￥ 商品仅为展示使用，不提供购买
    </view>
    <!-- 商品信息 -->
    <view class="goods-info">
      <view class="info-left">
        {{ detail.goods_name }}
      </view>
      <view class="info-right">
        <span class="iconfont icon-shoucang"></span>
        收藏
      </view>
    </view>
    <!-- 商品详情 -->
    <view class="detail">
      <view class="detail-title">商品详情</view>
      <view class="detail-content" v-html="detail.goods_introduce">
        <!-- {{ detail.goods_introduce }} -->
        <!-- <rich-text type="node" :nodes="detail.goods_introduce"></rich-text> -->
      </view>
    </view>
    <!-- 底部固定栏 -->
    <view class="footer">
      <button class="contact" open-type="contact">打开客服聊天窗口</button>
      <view class="ft-left">
        <span class="iconfont icon-kefu"></span>
        客服
      </view>
      <navigator open-type="switchTab" url="/pages/cart/main" class="ft-left">
        <span class="iconfont icon-gouwuche"></span>
        购物车
      </navigator>
      <view class="ft-right" @tap="addToCartList(detail.goods_id)">
        加入购物车
      </view>
      <view class="ft-right">
        立即购买
      </view>

    </view>

  </view>
</template>

<script>
import { getGoodsDetail } from "@/api";
export default {
  data(){
    return{
      goodsId:0,
      detail:{}
    }
  },
  onLoad(query){
    this.goodsId = query.goods_id;

    getGoodsDetail({
      goods_id: this.goodsId
    }).then(res=>{
      this.detail = res.data.message;
      // 因为小程序暂时还不支持 webp 图片格式，我们利用正则把 webp 图片改成 jpg
      this.detail.goods_introduce = this.detail.goods_introduce.replace(/jpg?.+?.webp/g,'jpg');
    })


  },
  methods: {
    previewbigImg(url){
      // console.log(this.detail.pics)
      let imgUrls = [];
      this.detail.pics.forEach(v=>{
        imgUrls.push(v.pics_big);
      });
      // console.log(imgUrls);
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: imgUrls // 需要预览的图片http链接列表
      })
    },
    // 点击加入购物车，把商品加入购物车列表中
    addToCartList(id){
      // 如果数据还没加载到，就没有商品id和详细数据，直接返回，不运行加入购物车的逻辑
      if(!id) return;
      // 获取本地的购物车数据
      let cartList = wx.getStorageSync('cartList') || {};

      // 当前商品详情添加选中状态
      this.detail.selected = true;
      // 当前商品详情添加数量
      this.detail.count = 1;

      // 把当前商品详情数据，添加到本地存储中是有条件
      // 条件1：如果本地存储中没有改商品，直接添加
      // 条件2：如果本地存储中已经存在过该商品，该数量应该是相加
      if(!cartList[id]){
        cartList[id] = this.detail;
      }else{
        // 如果存在相加
        cartList[id].count += this.detail.count;
      }

      // 把修改过的数据重新设置到本地存储
      wx.setStorageSync('cartList',cartList);

      // 添加成功后给用户提示
      wx.showToast({
        title: '加入成功', //提示的内容,
        icon: 'success',  //图标,
        duration: 1000,   //延迟时间,
        mask: true,       //显示透明蒙层，防止触摸穿透,
      });
    }
  }
}
</script>

<style lang="scss">

swiper{
    height:720rpx;
}

.slide-image{
    height:720rpx;
    width:750rpx;
}

.goods-price{
    padding:20rpx;
    color:red;
    font-size:22px;
}

.goods-info{
    padding:20rpx;
    padding-top:0;
    display: flex;
    .info-left{display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      -webkit-box-orient: vertical;
      //想要显示的行数
      -webkit-line-clamp: 2;
    }
    .info-right{
        width:160rpx;
        text-align: center;
        color:#999;
        border-left:1px #999 solid;
        font-size:14px;
        margin-left:20rpx;

        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
    }
}

.detail{
    border-top:20rpx #eee solid;
    padding-bottom:120rpx;
    .detail-title{
        padding:20rpx;
        border-bottom:1px #eee solid;
    }
    // 解决富文本图片间的缝隙
    .detail-content{
      font-size:0;
    }
}

.footer{
    position: fixed;
    width:100%;
    left:0;
    bottom:0;
    height:100rpx;
    background:#fff;
    display: flex;

    .contact{
        width:20%;
        height:100rpx;
        padding:0;
        margin:0;
        position: absolute;
        left:0;
        top:0;
        opacity: 0;
    }

    .ft-left{
        width:20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color:#666;
        font-size: 14px;

        span{
            font-size:18px;
        }
    }

    .ft-right{
        width:30%;
        background: orange;
        line-height: 100rpx;
        text-align: center;
        color:#fff;

        &:last-child{
            background: red;
        }
    }

}

</style>
