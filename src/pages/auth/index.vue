<template>
  <div>
    <!-- 需要使用 button 来授权登录 -->
    <button v-if="canIUse"
      open-type="getUserInfo"
      @getuserinfo="bindGetUserInfo"
    >
      授权登录
    </button>
    <view v-else>请升级微信版本</view>
  </div>
</template>

<script>
import { getToken } from "@/api";
export default {
  data(){
    return{
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    }
  },
  methods: {
    bindGetUserInfo(e) {
      // 在微信小程序中，要获取用户信息需要 e.mp 获取
      // console.log(e.mp.detail)
      // 获取登录接口需要的 4 个数据
      const { encryptedData,iv,rawData,signature } = e.mp.detail
      // 继续获取 login 的 code 信息
      wx.login({
        success(res) {
          if (res.code) {
            // 获取 login 接口的 code 数据
            const { code } = res;
            // 按要求准备发送的 data 数据
            getToken({
              encryptedData,
              iv,
              rawData,
              signature,
              code
            }).then(res=>{
              // 发送成功后，获取 token 值
              const { token } = res.data.message;
              // 如果有 token 值
              if(token){
                // 把 token 值存储到本地
                wx.setStorageSync('token',token);
                // 返回上一页
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  }
}
</script>

<style>

</style>
