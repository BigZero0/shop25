<template>
  <view>
    <!-- 3. 使用组件 -->
    <search></search>
    <view class="cate">
      <view class="cate-left">
        <block v-for="(item,index) in cates" :key="index">
          <view
          class="cate-left-item"
          :class="{active : index == tabIndex}"
          @tap="changeTabIndex(index)"
          >
            {{ item }}
          </view>
        </block>
      </view>
      <view class="cate-right">
        <view class="floor">
          <view class="floor-head">
            电视
          </view>
          <view class="floor-body">
            <block v-for="(item,index) in [1,2,3,34,1,1,1,1,11,1,11]" :key="index">
              <view class="floor-body-item">
                <image src="https://img.alicdn.com/i2/2/TB1VcxuJVXXXXXEXpXXSutbFXXX.jpg_90x90q90.jpg"></image>
                <view>品牌名称</view>
              </view>
            </block>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
// 1. 导入组件
import Search from "@/components/search";

export default{
  data(){
    return{
      cates:["大家电","小家电",'其他的',"大家电","小家电",'其他的',"大家电","小家电",'其他的',"大家电","小家电",'其他的',"大家电","小家电",'其他的'],
      // tab栏的索引值
      tabIndex: 0

   }
  },
  // 2. 注册组件
  components: {
    Search
  },
  methods: {
    // 点击切换 tab 栏
    changeTabIndex(index){
      this.tabIndex = index;
    }
  }
}
</script>
<style lang="scss">
  .cate{
    background-color: pink;
    position: fixed;
    // width: 100%;
    // height: 100%;
    left:0;
    right:0;
    top:98rpx;
    bottom:0;
    display: flex;

    &-left{
      background-color:#f4f4f4;
      width: 200rpx;
      height: 100%;
      &-item{
        line-height: 100rpx;
        text-align: center;
        font-size:28rpx;
        &.active{
          color:red;
          background-color: #fff;
          position: relative;
          &::before{
            content: "";
            background-color: red;
            position: absolute;
            left:0;
            width: 7rpx;
            top:15rpx;
            bottom:15rpx;
          }
        }
      }
    }

    &-right{
      background-color:#fff;
      flex:1;
      height: 100%;
      .floor{
        &-head{
          text-align: center;
          font-size:28rpx;
          padding: 20rpx 0;
          &::before,&::after{
            content:'/';
            color:#ccc;
          }
        }
        &-body{
          display: flex;
          flex-wrap: wrap;

          &-item{
            width: 33.33%;
            text-align: center;
            padding: 10rpx 0;
            image{
              width: 120rpx;
              height:90rpx;
            }
            view{
              font-size:24rpx;
            }
          }
        }
      }
    }
  }
</style>
