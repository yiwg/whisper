var common = require('../../utils/common.js');
var stringUtils=require('../../utils/stringUtils')
var apiContant=require('../../utils/constant.js')
var app = getApp()
Page({
    data: {
        userInfo: {},
        verifySmsCode: '',
        phoneTip: '您想发给人的手机号码',
        contentTip:'写下要说的悄悄话',
        nameTip:'您在信中怎么称呼ta',
        phone:'',
        name:'',
        content:''
    },
    onLoad: function (query) {
        console.log('进入确认页面')
        console.log('参数phone:'+query.phone)
        this.setData({
            phone:query.phone,
            name:query.name,
            content:query.content
        })
        var that = this
        //调用应用实例的方法获取全局数据
        
    },
    backHandle:function(){
       wx.navigateBack({
         })  
    },
    okHandle:function(){
         wx.request({
              url: apiContant.sendMsg,
              data: {
                phone:this.data.phone,
                content:this.data.name,
                name:this.data.content,
              },
              method: 'get',
              header: { 
                'Accept': 'application/json'
                }, 
              success: function(res){
                if(res.data.success==false){
                  console.log("发送失败，请稍后再试")
                }
                else{
                 console.log("发送成功")
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
})