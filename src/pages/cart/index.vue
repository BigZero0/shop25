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
        <div class="ware-item">
          <!-- 选择按钮 -->
          <div class="choice-button" @tap="choiceGoods(index)">
            <view class="iconfont icon-xuanze" :class="{ 'icon-xuanze-fill' : item.selected }"></view>
          </div>
          <!-- 内容主体 -->
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
                  <div class="rect" @tap="calculateHandle(-1)">-</div>
                  <div class="number">{{ item.count }}</div>
                  <div class="rect" @tap="calculateHandle(1)">+</div>
                </div>
              </div>
          </div>
          </div>
        </div>
      </block>
    </div>
    <!-- 底部结算 -->
    <div class="cart-total">
      <div class="total-button" @tap="choiceAll">
        <view class="iconfont icon-xuanze-fill"></view>
      </div>
      <div class="total-center">
        <div class="colorRed">￥0.00</div>
        <div class="price-tips">
          包邮
        </div>
      </div>
      <div class="accounts" @tap="accountsHandle">
        结算
      </div>

    </div>
  </div>
</template>

<script>
export default{
  data(){
    return {
      address:{
        userName:"",
        telNumber:"",
        addr:""
      },
      cartList:{}
    }
  },
  onLoad(){
    this.address = wx.getStorageSync('address') || {};
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
    // 商品选择按钮
    choiceGoods(index){
      // console.log('商品选择按钮'+index);
      this.cartList[index].selected = !this.cartList[index].selected;
    },
    // 点击加减修改个数
    calculateHandle(type){
      console.log("点击加减"+type)
    },
    // 全选
    choiceAll(){

    },
    // 结算按钮
    accountsHandle(){

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

