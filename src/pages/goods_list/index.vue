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
        <view class="goods-item" @tap="goToDetail(item.goods_id)">
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
import { getGoodsSearch } from "@/api";
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
  },
  onShow(){
    this.initDate();
  },
  // 触底事件
  onReachBottom(){
    // 从新发送请求获取数据
    // 拼接数据，显示到页面中
    this.getDate();
  },
  // 下拉刷新事件
  onPullDownRefresh(){
    this.initDate();
  },
  methods: {
    initDate(){
     // 初始化数据
      this.lists = [];
        this.pagenum = 1;
        this.hasMore = true;
        // 重新发送请求
      this.getDate();
    },
    changeTab(index){
      this.tabIndex = index;
    },
    // 跳转到详情页
    goToDetail(id){
      wx.navigateTo({
        url:"/pages/goods_detail/main" + "?goods_id="+id
      })
    },
    getDate(){

      if(!this.hasMore){
        return;
      }

      // 在发送请求的时候，提示加载中
      wx.showLoading({
        title: '加载中',
      });

      getGoodsSearch({
        query: this.keyword,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res=>{
        // 获取商品数据
        let {goods} = res.data.message;
        // 两个数组用 ...语法展开，再合并再一起
        this.lists = [...this.lists, ...goods];
        // this.lists = this.lists.concat(goods);
        console.log(this.pagenum);
        // 页数加 1
        this.pagenum += 1;
        // 在加载成功后应该还要取消提示
        wx.hideLoading();
        // 当数据加载成功后，如果是下拉的情况，就隐藏下拉动画
        wx.stopPullDownRefresh();
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

