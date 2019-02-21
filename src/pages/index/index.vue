<template>
  <div>
    <!-- 3. 使用 Search 组件 -->
    <Search></Search>
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
    <!-- 首页楼层 -->

    <div class="floor">
      <div class="floor-item" v-for="(item,index) in floors" :key="index">
        <div class="floor-head">
          <image :src="item.floor_title.image_src" mode="aspectFit"></image>
        </div>
        <div class="floor-body">
          <div class="floor-body-left">
            <image :src="item.product_list[0].image_src"></image>
          </div>
          <div class="floor-body-right">
              <image
              v-for="(subItem,subIndex) in item.product_list"
              :key="subIndex"
              v-if="subIndex != 0"
              :src="subItem.image_src">
              </image>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
// 1. 引入搜索框组件
import Search from '@/components/search';
export default{
  data(){
    return{
      // 存放轮播图数据的数组
      imgUrl:[],
      // 分类数据
      menus:[],
      floors:[]
    }
  },
  // 2. 注册搜索框组件
  components: {
    Search
  },
  mounted () {
    // 缓存 this 对象
    let that = this;
    // // 发送请求获取轮播图数据
    // wx.request({
    //   url:"https://itjustfun.cn/api/public/v1/home/swiperdata",
    //   success(res){
    //     // 获取返回的数据
    //     let data = res.data.data;
    //     // 把数据赋值给 imgUrl
    //     that.imgUrl = data;
    //   }
    // });

    // wx.request({
    //   url:"https://www.itjustfun.cn/api/public/v1/home/catitems",
    //   // 箭头函数
    //   success:(res)=>{
    //     console.log(res);
    //     this.menus = res.data.data;
    //   }
    // });
    // console.log(request);
    request("https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata").then(res=>{
      this.imgUrl = res.data.message;
    });

    request("https://www.zhengzhicheng.cn/api/public/v1/home/catitems").then(res=>{
      this.menus = res.data.message;
    });

    request("https://www.zhengzhicheng.cn/api/public/v1/home/floordata").then(res=>{
      this.floors = res.data.message;
    });
  }
}
</script>

<style lang="scss">

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
    &-img{
      width: 128rpx;
      height: 140rpx;
    }
  }

  // 楼层开始
  .floor{
    &-head{
      image{
        width: 100%;
        height: 88rpx;
      }
    }
    &-body{
      padding: 20rpx 0 20rpx 16rpx;
      display: flex;
      &-left{
        margin-right: 10rpx;
        image{
          width: 232rpx;
          height: 386rpx;
        }
      }

      &-right{
        display: flex;
        flex-wrap: wrap;
        image{
          width: 235rpx;
          height:188rpx;
          margin-right:10rpx;
        }
      }
    }
  }

</style>
