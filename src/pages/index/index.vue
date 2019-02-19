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
    >
      <block v-for="(item,index) in imgUrl" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" />
        </swiper-item>
      </block>
    </swiper>

  </div>
</template>
<script>
export default{
  data(){
    return{
      imgUrl:[
        "https://img.alicdn.com/tfs/TB1N7tuGY2pK1RjSZFsXXaNlXXa-520-280.jpg",
        "https://aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg",
        "https://img.alicdn.com/tfs/TB1nZhAG7voK1RjSZFNXXcxMVXa-520-280.jpg"
      ]
    }
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
</style>
