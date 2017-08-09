// pages/post_detail/post-detail.js
var postsData = require('../../data/posts-data.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.setData({
      isAudio : app.globalData.isMusic,
      isaudio: app.globalData.isMusic && app.globalData.isNumber === postId
     
    })
      console.log(this.data.isaudio);
  
 
    this.data.currentPostId = postId;
    //获取当前的这租的数据
    var postData = postsData.postList[postId];
    //用来渲染界面
    this.setData({
      postList: postData
    });
    //获取key为postsCollected的缓存
    var postsCollected = wx.getStorageSync("postsCollected");
    //判断是否存在postsCollected
    if (postsCollected) {
      //获取当前属于这页面的缓存key
      var postCollected = postsCollected[postId];
      //把当前的缓存存到data那里用来渲染界面的
      this.setData({
        collected: postCollected
      })
    }
    else {
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("postsCollected", postsCollected)
    }




  },
  onAudio: function () {
    //先获取全局变量的isAudio
    var isaudio = this.data.isaudio;
    var isAudio = this.data.isAudio;
    //拿到当前播放音乐的地址
    var post = postsData.postList;
    var post1 = post[this.data.currentPostId];
    var music = post1.music;
    console.log(post1);
    if (!isaudio) {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg
      })

    } else {
      wx.pauseBackgroundAudio();

    }
  
    
    app.globalData.isNumber = this.data.currentPostId;
    console.log(this.data.currentPostId);
    app.globalData.isMusic=!isAudio;
    console.log(app.globalData.isMusic)
    this.setData({
      isAudio: !isAudio,

    })
    this.setData({
    
      isaudio: app.globalData.isMusic && app.globalData.isNumber === this.data.currentPostId 

    })
    console.log(app.globalData.isMusic);
    console.log(this.data.isaudio); 
  }
  ,
  share: function () {
    var itemList = ['QQ', '微信', '微博'];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        console.log(res.tapIndex);
        wx.showModal({
          title: itemList[res.tapIndex],
          content: '是否分享到' + itemList[res.tapIndex],
          success: function (res) {
            if (res.confirm) {
              wx.showToast({
                title: '分享成功',
                icon: 'success',
                duration: 1000
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
  ,
  post_collection: function () {
    //获取缓存
    var postsCollected = wx.getStorageSync("postsCollected");
    //获取缓存中当前的key值
    var postCollected = postsCollected[this.data.currentPostId];
    // 然后把key取反
    postCollected = !postCollected;
    // 然后设置data的collected用来渲染界面
    this.setData({
      collected: postCollected
    })
    // 然后在设置回缓存的key
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('postsCollected', postsCollected);



    wx.showToast({
      title: postCollected ? '收藏成功' : "取消成功",
      icon: 'success',
      duration: 1500,
      mask: true
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})