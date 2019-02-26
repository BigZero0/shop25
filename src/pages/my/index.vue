<template>
  <div>
    <view class="avatar">
    <open-data type="userAvatarUrl"></open-data>
    </view>
    <open-data type="userNickName"></open-data>

    <open-data type="userGender" lang="zh_CN"></open-data>

    <button open-type="feedback">有什么要吐槽的？</button>
    <button @tap="callSomeOne(10086)">打电话给10086</button>

    <view>
      <view>{{year}}年{{month}}月{{day}}日</view>
      <picker-view
        indicator-style="height: 50px;"
        style="width: 100%; height: 300px;"
        :value="value"
        @change="bindChange"
      >
        <picker-view-column>
          <view v-for="(item,index) in  " style="line-height: 50px">{{item}}年</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item,index) in months" style="line-height: 50px">{{item}}月</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item,index) in days" style="line-height: 50px">{{item}}日</view>
        </picker-view-column>
      </picker-view>
    </view>
    <map
  id="map"
  longitude="113.324520"
  latitude="23.099994"
  scale="14"
  :controls="controls"
  @controltap="controltap"
  :markers="markers"
  @markertap="markertap"
  :polyline="polyline"
  @regionchange="regionchange"
  show-location
  style="width: 100%; height: 300px;"
></map>
  </div>
</template>
<script>
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
export default{
  data(){
    return{
      years,
      year: date.getFullYear(),
      months,
      month: 2,
      days,
      day: 2,
      value: [9999, 1, 1],
    }
  },
  methods: {
    callSomeOne(tel){
         wx.makePhoneCall({
          phoneNumber: tel // 仅为示例，并非真实的电话号码
        })
    }
  }
}
</script>
<style lang="scss">
  .avatar{
    width: 50rpx;
    height: 50rpx;
  }
</style>
