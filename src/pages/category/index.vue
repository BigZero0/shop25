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
      <view class="cate-right">右边</view>
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
    }
  }
</style>
