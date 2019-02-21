<template>
  <!-- 搜索框部分 -->
  <div class="search">
    <div class="search-input">
      <icon class="search-icon" type="search" size="32rpx"></icon> 搜索
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .search{
    background-color: #eb4450;
    padding: 20rpx 16rpx;
  }
  .search-input{
      background-color: #333;
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
