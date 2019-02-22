<template>
  <div>
    商品详情页{{ goodsId }}
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data(){
    return{
      goodsId:0
    }
  },
  onLoad(query){
    this.goodsId = query.goods_id;


    // request("")

    request.get("goods/detail",{goods_id : this.goodsId})

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
