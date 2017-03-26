//app.js
var Bmob = require('utils/bmob.js')
Bmob.initialize("4195da08a4bfe3814a4284de579fd8c0", "f0fd39c21b7ffab76c530eb5d63b3415");
var apiContant=require('utils/constant.js')
App({
  onLaunch: function () {
    console.log('app start....')
    var newOpenid = wx.getStorageSync('openId');
    console.log('openId.['+newOpenid+']');
    if (!newOpenid) {
      console.log('storage中不存在该用户.向后端请求');
      this.getUserInfo(
        function(userInfo){
             wx.request({
              url: apiContant.login,
              data: {
                userInfo:userInfo
              },
              method: 'get',
              header: { 
                'Accept': 'application/json'
                }, 
              success: function(res){
                if(res.data.success==false){
                  console.log("登录失败.openId["+res.data.openId+"]")
                }
                else{
                  console.log("登录成功.openId["+res.data.openId+"]")
                  //保存sessionId到storage中
                  wx.setStorage({
                      key:"openId",
                      data:res.data.openId
                    })
                }
              },
              fail: function() {
                console.log("网络请求失败")
              },
              complete: function() {
              console.log("网络请求完成")
              }
            })
        }
       
      );
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {

          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  getOpenId:function(){
     return wx.getStorageSync(KEY);
  },
  globalData: {
    userInfo: null
  }
})