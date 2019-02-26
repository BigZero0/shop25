<script>
export default {
  created () {
    wx.showTabBarRedDot({
      index:3
    });

    let carList = wx.getStorageSync('cartList');
    let cartLength = Object.keys(carList).length.toString();
    wx.setTabBarBadge({
      index: 2,
      text: cartLength
    })
  }

}
</script>

<style>
@import "style/iconfont.wxss";
</style>
