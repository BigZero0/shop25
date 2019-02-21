<template>
  <view>
    <!-- 3. 使用组件 -->
    <search></search>
    <view class="cate">
      <view class="cate-left">
        <block v-for="(item,index) in cates" :key="index">
          <view>
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
      cates:["大家电","小家电",'其他的',"大家电","小家电",'其他的',"大家电","小家电",'其他的',"大家电","小家电",'其他的',"大家电","小家电",'其他的']
    }
  },
  // 2. 注册组件
  components: {
    Search
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
      background-color:#ccc;
      width: 200rpx;
      height: 100%;
    }

    &-right{
      background-color:#fff;
      flex:1;
      height: 100%;
    }
  }
</style>
