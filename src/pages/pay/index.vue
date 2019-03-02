<template>
  <div>
    <!-- 头部选择地址 -->
    <view class="cart-top" @tap="chooseAddress">
      <block v-if="address.userName">
        <view class="user">
          <view>收件人：{{address.userName}}</view>
          <view>{{address.telNumber}}</view>
        </view>
        <view class="address">
          收件地址：{{ address.addr }}
        </view>
      </block>
      <block v-else>
        <view class="add-addresss">新增收货地址 +</view>
      </block>
      <view class="address-border"></view>
    </view>
    <!-- 购物车商品列表 -->
    <div class="list-title">
      优购生活馆
    </div>
    <div class="ware-list">
      <block v-for="(item,index) in cartList" :key="index">
        <div class="ware-item" @tap="goToDetail(index)">
          <div class="ware-content">
            <!-- 主体左图片 -->
            <div class="ware-image">
              <img :src="item.goods_small_logo" alt="" />
            </div>
              <!-- 主体右信息 -->
            <div class="ware-info">
              <view>{{ item.goods_name }}</view>
              <div class="ware-info-btm">
                <!-- 价格 -->
                <div class="ware-price">￥{{item.goods_price}}</div>
                <!-- 计数器 -->
                <div class="calculate">
                  <div class="number">x {{ item.count }}</div>
                </div>
              </div>
          </div>
          </div>
        </div>
      </block>
    </div>
    <!-- <view class="red">该项目仅为教学使用，点击支付不会发生真正的交易</view> -->
    <!-- 支付按钮 -->
    <button type="warn" @tap="payOrder">教学案例，已关闭支付功能</button>


  </div>
</template>

<script>
import { orderPay,orderAll } from "@/api"
export default{
  data(){
    return {
      address:{
        userName:"",
        telNumber:"",
        addr:""
      },
      cartList:{},
      allCount:0,
      cartLength: 0,
      order_number: ""
    }
  },
  computed: {
    allPrice(){
      let allPrice = 0;
      let allCount = 0;
      let cartList = this.cartList;
      for(let key in cartList){
        if(cartList[key].selected){
          allPrice += cartList[key].count * cartList[key].goods_price;
          allCount++;
        }
      }
      this.cartLength = Object.keys(this.cartList).length;
      this.allCount = allCount;
      return allPrice;
    },

  },
  onLoad(query){
    this.address = wx.getStorageSync('address') || {};
    this.order_number = query.order_number;
  },
  onShow(){
    this.cartList = wx.getStorageSync('cartList') || {};
  },
  methods: {
    // 选择收货地址
    chooseAddress(){
      wx.chooseAddress({
        success:(res)=> {
          this.address = {
            userName:res.userName,
            telNumber:res.telNumber,
            addr:`${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`
          }
          wx.setStorageSync('address',this.address);
        }
      })
    },
    // 点击商品实现跳转
    goToDetail(index){
      wx.navigateTo({ url: '/pages/goods_detail/main?goods_id='+index });
    },
    payOrder(){
      wx.showToast({
        title: '已关闭支付功能', //提示的内容,
        icon: 'success', //图标,
        duration: 2000, //延迟时间,
        mask: true, //显示透明蒙层，防止触摸穿透,
        success: res => {}
      });
      return;
      orderPay({
        "order_number": this.order_number
      }).then(res=>{
        // const {signType,timeStamp,nonceStr,package,signType,paySign} = res.data.message.wxorder
        const { wxorder  } = res.data.message
        wx.requestPayment({
          ...wxorder,
          success:(res)=> {
            console.log("支付成功");
            for(let key in this.cartList){
              if(this.cartList[key].selected){
                delete this.cartList[key];
              }
            }
            this.cartList = JSON.parse(JSON.stringify(this.cartList));
            wx.setStorageSync('cartList',this.cartList);
          },
          fail:(res)=> {
            console.log("支付失败");
          }
        })
      });




    }
  }
}
</script>
<style lang="scss">
.cart-top {
  min-height: 180rpx;
  position: relative;
  .user {
    display: flex;
    padding: 20rpx;
    justify-content: space-between;
    position: relative;
    padding-right: 50rpx;

    &:after {
      display: block;
      content: "";
      width: 12px;
      height: 12px;
      border-top: 1px #999 solid;
      border-right: 1px #999 solid;
      transform: rotate(45deg);
      position: absolute;
      right: 20rpx;
      top: 20rpx;
      margin-top: 6px;
    }
  }

  .address {
    padding: 20rpx;
    padding-top: 0;
  }

  .address-border {
    width: 100%;
    height: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: red;
  }

  .add-addresss {
    height: 180rpx;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.list-title {
  padding: 20rpx;
  border-bottom: 1px #eee solid;
  border-top: 10px #eee solid;
}

.ware-list {
  padding-bottom: 100rpx;
}

.icon-xuanze-fill {
  color: #ff2d4a;
}

.ware-item {
  padding: 20rpx;
  padding-bottom: 0;
  display: flex;
  align-items: center;

  .choice-button {
    flex-shrink: 0;
    text-align: center;
    margin-right: 20rpx;
    font-size: 32rpx;
  }
}

.ware-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.ware-content {
  display: flex;
  flex: 1;
  justify-content: space-between;
  border-bottom: 1px #eee solid;
  padding-bottom: 20rpx;
}

.ware-image {
  img {
    display: block;
    width: 200rpx;
    height: 200rpx;
  }
}

.ware-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ware-info-btm {
  display: flex;
  justify-content: space-between;

  .ware-price {
    color: red;
  }
}

.calculate {
  display: flex;
}

.rect {
  width: 20px;
  text-align: center;
  border: 1px #999 solid;
  line-height: 1.2;
}

.number {
  margin: 0 10px;
}

.cart-total {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;

  .total-button {
    padding-left: 20px;
    icon {
      margin-right: 10px;
    }
  }

  .total-center {
    flex: 1;
    padding: 20rpx;
    text-align: right;

    .colorRed {
      color: red;
    }

    .price-tips {
      font-size: 14px;
      color: #666;
    }
  }

  .accounts {
    width: 30%;
    height: 100rpx;
    background: red;
    color: #fff;
    line-height: 100rpx;
    text-align: center;
  }
}
</style>

