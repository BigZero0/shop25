<template>
  <div>
    <!-- 搜索框部分 -->
    <div class="search">
      <div class="search-input">
        <icon class="search-icon" type="search" size="32rpx"></icon> 搜索
      </div>
    </div>
    <!-- 首页轮播图 -->
    <swiper
      indicator-dots
      autoplay
      circular
      indicator-color="rgba(255,255,255,0.3)"
      indicator-active-color="#fff"
      class="index-slide"
    >
      <block v-for="(item,index) in imgUrl" :key="index">
        <swiper-item>
          <image :src="item.image_src" class="slide-image" mode="widthFix"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 首页分类 -->
    <div class="menu">
      <div class="menu-item" v-for="(item,index) in menus" :key="index">
        <img class="menu-img" :src="item.image_src"></img>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return{
      // 存放轮播图数据的数组
      imgUrl:[],
      // 分类数据
      menus:[]
    }
  },
  mounted () {
    // 缓存 this 对象
    let that = this;
    // 发送请求获取轮播图数据
    wx.request({
      url:"https://itjustfun.cn/api/public/v1/home/swiperdata",
      success(res){
        // 获取返回的数据
        let data = res.data.data;
        // 把数据赋值给 imgUrl
        that.imgUrl = data;
      }
    });
    wx.request({
      url:"https://www.itjustfun.cn/api/public/v1/home/catitems",
      // 箭头函数
      success:(res)=>{
        console.log(res);
        this.menus = res.data.data;
      }
    });
  }
}
</script>
<style>
  .search{
    background-color: #eb4450;
    padding: 20rpx 16rpx;
  }
  .search-input{
    height: 60rpx;
    background-color: #fff;
    border-radius: 3rpx;
    display:flex;
    justify-content: center;
    align-items: center;
    color:#bbb;
    font-size: 30rpx;
  }
  .search-icon{
    margin-right: 16rpx;
  }
  .index-slide{
    height: 340rpx;
  }
  .slide-image {
    width: 100%;
    height: 100%;
  }
  .menu{
    display: flex;
    justify-content: space-around;
    padding: 24rpx;
  }
  .menu-img{
    width: 128rpx;
    height: 140rpx;
  }

</style>
