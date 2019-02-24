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
      ￥ {{ detail.goods_price }}
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
      <view class="ft-left">
        <span class="iconfont icon-gouwuche"></span>
        购物车
      </view>
      <view class="ft-right">
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
