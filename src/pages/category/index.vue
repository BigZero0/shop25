<template>
  <view>
    <!-- 3. 使用组件 -->
    <search></search>
    <view class="cate">
      <scroll-view scroll-y class="cate-left">
        <block v-for="(item,index) in cates" :key="index">
          <view
          class="cate-left-item"
          :class="{active : index == tabIndex}"
          @tap="changeTabIndex(index)"
          >
            {{ item.cat_name }}
          </view>
        </block>
      </scroll-view>
      <scroll-view scroll-y class="cate-right">
        <!-- <navigator url="/pages/goods_list/main" >跳转到搜索商品页</navigator> -->
        <block v-for="(item,index) in rightData.children" :key="index">
          <view class="floor">
            <view class="floor-head">
              {{ item.cat_name }}
            </view>
            <view class="floor-body">
              <block v-for="(subItem,subIndex) in item.children" :key="subIndex">
                <view class="floor-body-item" @tap="goToList(subItem.cat_name)">
                  <image :src="subItem.cat_icon"></image>
                  <view>{{ subItem.cat_name }}</view>
                </view>
              </block>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>
<script>
// 1. 导入组件
import Search from "@/components/search";
import { getCategories } from "@/api";

export default{
  data(){
    return{
      // 所有的分类数据
      cates:[],
      // tab栏的索引值
      tabIndex: 0,
      // 右侧品牌数据
      rightData:[]

   }
  },
  // 2. 注册组件
  components: {
    Search
  },
  methods: {
    // 跳转到列表页的方法
    goToList(name){
      // 调用微信小程序跳转页面的 api
      wx.navigateTo({
        url: '/pages/goods_list/main'+'?keyword='+ name
      })
    },
    // 点击切换 tab 栏
    changeTabIndex(index){
      this.tabIndex = index;
      // 如果数据多，可能在切换的时候是滚动到底部的
      // 数据少,肯定是在顶部
      // this.rightData = this.cates[index];
      // 解决思路：先把数据所有数据清空，再设置数据
      this.rightData = [];
      setTimeout(()=>{
        this.rightData = this.cates[index];
      },0);
    }
  },
  mounted () {
    getCategories().then(res=>{
      let {message} = res.data;
      this.cates = message;
      this.rightData = message[0];
    })
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
