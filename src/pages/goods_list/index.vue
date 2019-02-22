<template>
  <div>
    <!-- 搜索框 -->
    <view class="search-wrapper">
      <view class="search-input">
        <icon type="search" size="16"></icon> {{keyword}}
      </view>
    </view>
    <!-- tab 筛选 -->
    <view class="tab">
      <block v-for="(item,index) in tabs" :key="index">
        <view class="tab-item"
        :class="{ active : index == tabIndex }"
        @tap="changeTab(index)"
        >
          {{item}}
        </view>
      </block>
    </view>
    <!-- 列表布局 -->
    <view class="goods-list">
      <block v-for="(item,index) in lists" :key="index">
        <view class="goods-item">
        <image :src="item.goods_small_logo"></image>
        <view class="goods-right">
          <view class="goods-title">{{ item.goods_name }}</view>
          <view class="price">￥{{ item.goods_price }}.00</view>
        </view>
      </view>
      </block>
    </view>
    <!-- 底部状态的文字提示 -->
    <view class="loading" v-show="hasMore == false">
      我也是有底线的...
    </view>
  </div>
</template>

<script>
import request from "@/utils/request";
export default{
  data(){
    return{
      keyword:"",
      tabs:["综合","销量","价格"],
      tabIndex:0,
      lists:[],
      pagenum:1,
      pagesize:20,
      hasMore: true
    }
  },
  // 只有 onLoad 生命周期函数才能获取页面参数
  onLoad(query){
    this.keyword = query.keyword;

    this.getDate();

  },

  onReachBottom(){
    // 从新发送请求获取数据
    // 拼接数据，显示到页面中
    this.getDate();
  },
  methods: {
    changeTab(index){
      this.tabIndex = index;
    },
    getDate(){

      if(!this.hasMore){
        return;
      }

      // 在发送请求的时候，提示加载中
      wx.showLoading({
        title: '加载中',
      });
      request('https://www.zhengzhicheng.cn/api/public/v1/goods/search','GET',{
        query: this.keyword,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res=>{
        let {goods} = res.data.message;
        this.lists = [...this.lists, ...goods];
        // this.lists = this.lists.concat(goods);
        console.log(this.pagenum);
        this.pagenum += 1;
        // 在加载成功后应该还要取消提示
        wx.hideLoading();
        // 判断是否还要加载更多
        if(goods.length < this.pagesize){
          this.hasMore = false;
        }
      })

    }
  }
}
</script>
<style lang="scss">
.search-wrapper{
    background: #eee;
    padding:20rpx;

    .search-input{
        background:#fff;
        height:60rpx;
        font-size:15px;
        color:#999;
        display: flex;
        align-items: center;
        padding: 0 20rpx;
    }

    .search-input icon{
    margin-right:5px;
    }
}

.tab{
    display: flex;
    border-bottom:1px #eee solid;
    .tab-item{
        flex:1;
        text-align: center;
        line-height: 100rpx;
    }

    .active{
        color:red;
    }
}

.goods-list{
    padding-left:20rpx;

    .goods-item{
        padding:20rpx 20rpx 20rpx 0;
        display: flex;
        border-bottom:1px #eee solid;

        image{
            display: block;
            width:200rpx;
            height:200rpx;
            flex-shrink: 0;
            margin-right: 20rpx;
        }

        .goods-right{
            flex:1;
            display: flex;
            flex-direction:column;
            justify-content: space-between;

          .goods-title{
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
          }

          .price{
              color:red;
              font-size: 14px;
              span{
                  font-size: 22px;
              }
          }
        }

    }
}

.loading{
    line-height: 80rpx;
    text-align: center;
    font-size:14px;
    color:#999;
}
</style>

