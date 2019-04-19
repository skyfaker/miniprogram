//index.js
var app = getApp();
var currentIndex;
var str = "";
var name = "";
var score = "";
var description = "";
var result1 = "";
var result2 = "";

var names = "";
var scores = "";

Page({
  data: {
    name: "",
    score: "",
    motto: '动物识别',
    currentIndex: 0,

    imageList: [
      {
        name: "斑点狗",
        imagePath: "/images/bdg.jpg",
      },
      {
        name: "金毛",
        imagePath: "/images/jm.jpg",
      },
      {
        name: "美系杜宾",
        imagePath: "/images/db.jpg",
      },
      {
        name: "斗牛犬",
        imagePath: "/images/dn.jpg",
      },
      {
        name:"雪猫",
        imagePath: "/images/xuemao.jpg"
      },
      {
        name: "双面猫",
        imagePath: "/images/shuang.jpg"
      },
      {
        name: "mao",
        imagePath: "/images/mao.jpg",
      },
    ]
  },

  swiperChange: function(e) {
    this.setData({
      currentIndex: e.detail.current
    })

    if (e.detail.source == 'touch') {
      this.setData({
        currentIndex: e.detail.current //获取当前轮播图片的下标
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '识宠',
      path: 'pages/index/index',
      success: function(res) {
        // 转发成功
        if (res.errMsg == 'shareAppMessage:ok') {
          wx.showToast({
            title: '分享成功',
            icon: 'success',
            duration: 500
          });
        }
      },
      fail: function(res) {
        // 转发失败
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          wx.showToast({
            title: '分享取消',
            icon: 'loading',
            duration: 500
          })
        }
      }
    }
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    console.log('onLoad')
    this.setData({
      //currentIndex : 0,
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      console.info(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo,
        //currentIndex : 0,
      })
    })
  },
  // 选择并上传图片
  choose_animalpicture: function() {
    var that = this;
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        //console.log(res)
        // that.setData({
        //   tempFilePaths: res.tempFilePaths[0],
        //   name: '',
        //   score: ''
        // }),
        wx.showLoading({
          title: '分析中。。',
          mask: true
        }),
        wx.uploadFile({
          url: '********',
          filePath: res.tempFilePaths[0],
          header: {
            'content-type': 'multipart/form-data',
          },
          name: 'photo',
          formData: {
            'user': 'test'
          },
          success: function(res) {
            wx.hideLoading();
            var str = JSON.parse(res.data);
            result1 = str[0];
            result2 = str[1];
            console.log(result1);
            that.setData({
              names: result1.name,
              scores: result1.score,
            })
            console.log(name)
            wx.navigateTo({
              url: '/pages/detect/detect?name=' + result1.name +
                '&score=' + result1.score +
                '&description=' + result1.baike_info.description +
                '&imgurl=' + result1.baike_info.image_url,
            })
          },
          fail: function(res) {
            wx.hideLoading();
            console.log('上传失败')
            that.setData({
             info: '小程序离家出走了稍后再试',
            })
          },
        })
      },
    })
  },
})