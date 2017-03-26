var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var stringUtils=require('../../utils/stringUtils')
var app = getApp()
Page({
    data: {
        userInfo: {},
        verifySmsCode: '',
        phoneTip: '您想发给人的手机号码',
        contentTip:'写下要说的悄悄话',
        nameTip:'您在信中怎么称呼ta',
        warnMsg:''
    },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            console.log(userInfo)
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    sendSms: function (event) {
        var that = this
        var phone = event.detail.value.phone;
        var content=event.detail.value.content;
        var name=event.detail.value.name;
        this.checkparam(content,name,phone);
       wx.navigateTo({
            url: '../showSms/showSms?phone='+phone+"&content="+content+"&name="+name
         })

    },
    checkparam:function(content,name,phone){
        var msgs=['内容长度应该为3-50之间','称呼长度应该1-5之间','手机号码格式错误']
        var warnFlag=1;
        var warnMsg=[];
        console.log(content.length+'/'+name.length)
        if(stringUtils.checkLength(content,50,3)!=1){
            warnMsg.push(msgs[0])
            console.log('内容长度不符合')
            warnFlag=0;
        }
        if(stringUtils.checkLength(name,5,1)!=1){
            warnMsg.push(msgs[1])
            console.log('称呼长度不符合')
            warnFlag=0;
        }
        if(!stringUtils.checkPhone(phone)){
           warnMsg.push(msgs[2])
           console.log('手机号码格式错误')
            warnFlag=0;
        }
        if(warnFlag==0){
            var text='';
            for(var i=0;i<warnMsg.length;i++){
                if(i==0){
                    text=warnMsg[i]
                }
                else{
                    text=text+','+warnMsg[i];
                }
                
            }
            
        }
        else {
            text=''
        }
        this.setData({
                warnMsg:text
            })
    }
})