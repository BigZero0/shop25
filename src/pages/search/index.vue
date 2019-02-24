<template>
  <div>
    <!-- 搜索框分区 -->
    <view class="search-wrapper">
      <view class="search-content">
        <view class="search-input">
          <icon type="search" size="16"></icon>
          <input type="text" focus
            placeholder="请输入商品名称..."
            @input="handleInput"
            v-model="inputValue"
            confirm-type="search"
            @confirm="confirmInput"
          />
        </view>
        <button class="cancel">取消</button>
      </view>
    </view>

  </div>
</template>

<script>
export default{
  data(){
    return{
      inputValue:""
    }
  },
  methods: {
    handleInput(event){
      // console.log('测试是否绑定事件',event);
      // console.log(event.target.value);
      // console.log(this.inputValue);
    },
    // 手机端，按下完成按钮触发
    // 模拟器中按下回车键触发
    confirmInput(){
      // console.log(this.inputValue);
      wx.navigateTo({
        url:"/pages/goods_list/main?keyword="+this.inputValue
      })
    }
  }
}
</script>
<style lang="scss">
// 搜索框分区
.search-wrapper {
  background: #eee;
  padding: 20rpx;
  display: flex;
  // 搜索框主体内容
  .search-content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    position: relative;
    // 输入框部分
    .search-input {
      background: #fff;
      display: flex;
      align-items: center;
      height: 60rpx;
      flex: 1;

      icon {
        margin: 0 10px;
      }

      input {
        flex: 1;
        font-size: 14px;
        padding-right: 20rpx;
      }
    }
    // 取消按钮
    .cancel {
      width: 160rpx;
      height: 60rpx;
      padding: 0;
      line-height: 58rpx;
      margin-left: 20rpx;
    }
  }
  // 搜索建议提示
  .search-tips {
    position: fixed;
    left: 0;
    right: 0;
    top: 100rpx;
    bottom:0;
    background-color: #f5f5f5;
    padding: 20rpx;
    box-sizing: border-box;
    // 提示项
    .search-item {
      height: 60rpx;
      line-height: 60rpx;
      border-bottom: 1px #eee solid;
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.history-title {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list {
  padding: 10rpx;
  .list-item {
    display: inline-block;
    padding: 0 20rpx;
    line-height: 2;
    background: #eee;
    margin: 10rpx;
  }
}
.history {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
}

.history-list {
  display: flex;
  padding: 20rpx 10rpx;
  flex-wrap: wrap;

  .history-item {
    margin: 10rpx 10rpx;
    padding: 20rpx;
    background: #eee;
  }
}
</style>

