import { v4 as uuidv4 } from 'uuid'

export default {
  '1280_720': [{
    id: uuidv4(),
    width: 1280,
    height: 720,
    preview_width: 300,
    preview_height: 169,
    name: '字右-居中对齐',
    pic: 'https://alicdn.madaomall.com/feima-uploaded/images/08/b7/08b741761f5b801da12d39c0bd906776.png',
    layouts: {
      scale: 1, // 缩放比
      width: 1280,
      height: 720,
      // 背景
      background: {
        id: uuidv4(),
        type: 'background',
        color: '#F8F8F8',
        image: null
      },
      // 主要元素标签
      elements: [{
        id: uuidv4(),
        type: 'image',
        url: 'https://alicdn.madaomall.com/feima-uploaded/images/ef/78/ef7895904cc9becbbc10f2043f6138db.png',
        zIndex: 1,
        draggable: true, // 是否可调整
        lock: false, // 锁定图层
        opacity: 1,
        rotate: 0,
        width: 720,
        height: 720,
        x: 0,
        y: 0
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-center"><span style="font-size: 100px;">{{title}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-06',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 560,
        height: 165,
        x: 720,
        y: 277.5
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-center"><span style="font-size: 72px; color: rgb(231, 11, 24);">{{subtitle}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-06',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 560,
        height: 125,
        x: 720,
        y: 190
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-center"><span style="color: rgb(0, 0, 0); font-size: 60px;">{{copywriting}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-03',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 560,
        height: 109,
        x: 720,
        y: 410
      }]
    }
  }, {
    id: uuidv4(),
    width: 1280,
    height: 720,
    preview_width: 300,
    preview_height: 169,
    name: '字左-居中对齐',
    pic: 'https://alicdn.madaomall.com/feima-uploaded/images/11/12/1112018268acf788c06d916db9b43f68.png',
    layouts: {
      scale: 1, // 缩放比
      width: 1280,
      height: 720,
      // 背景
      background: {
        id: uuidv4(),
        type: 'background',
        color: '#F8F8F8',
        image: null
      },
      // 主要元素标签
      elements: [{
        id: uuidv4(),
        type: 'image',
        url: 'https://alicdn.madaomall.com/feima-uploaded/images/ef/78/ef7895904cc9becbbc10f2043f6138db.png',
        zIndex: 1,
        draggable: true, // 是否可调整
        lock: false, // 锁定图层
        opacity: 1,
        rotate: 0,
        width: 720,
        height: 720,
        x: 560,
        y: 0
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-center"><span style="font-size: 100px;">{{title}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-06',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 560,
        height: 165,
        x: 0,
        y: 277.5
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-center"><span style="font-size: 72px; color: rgb(231, 11, 24);">{{subtitle}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-06',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 560,
        height: 125,
        x: 0,
        y: 190
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-center"><span style="color: rgb(0, 0, 0); font-size: 60px;">{{copywriting}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-03',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 560,
        height: 109,
        x: 0,
        y: 410
      }]
    }
  }, {
    id: uuidv4(),
    width: 1280,
    height: 720,
    preview_width: 300,
    preview_height: 169,
    name: '字右-右对齐',
    pic: 'https://alicdn.madaomall.com/feima-uploaded/images/b1/9c/b19c3eff54c6cd9bd32a0a9241ac02ef.png',
    layouts: {
      scale: 1, // 缩放比
      width: 1280,
      height: 720,
      // 背景
      background: {
        id: uuidv4(),
        type: 'background',
        color: '#F8F8F8',
        image: null
      },
      // 主要元素标签
      elements: [{
        id: uuidv4(),
        type: 'image',
        url: 'https://alicdn.madaomall.com/feima-uploaded/images/ef/78/ef7895904cc9becbbc10f2043f6138db.png',
        zIndex: 1,
        draggable: true, // 是否可调整
        lock: false, // 锁定图层
        opacity: 1,
        rotate: 0,
        width: 720,
        height: 720,
        x: 0,
        y: 0
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-right"><span style="color: rgb(231, 11, 24); font-size: 130px;">{{title}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-06',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1270,
        height: 207,
        x: 0,
        y: 150
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-right"><span style="font-size: 76px;">{{subtitle}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-06',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1270,
        height: 131,
        x: 0,
        y: 316.5
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-right"><span style="color: rgb(0, 0, 0); font-size: 64px;">{{copywriting}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-06',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1270,
        height: 114,
        x: 0,
        y: 426
      }]
    }
  }, {
    id: uuidv4(),
    width: 1280,
    height: 720,
    preview_width: 300,
    preview_height: 169,
    name: '字左-左对齐',
    pic: 'https://alicdn.madaomall.com/feima-uploaded/images/fc/86/fc860e32574d6f5d34aaf8092397dad7.png',
    layouts: {
      scale: 1, // 缩放比
      width: 1280,
      height: 720,
      // 背景
      background: {
        id: uuidv4(),
        type: 'background',
        color: '#F8F8F8',
        image: null
      },
      // 主要元素标签
      elements: [{
        id: uuidv4(),
        type: 'image',
        url: 'https://alicdn.madaomall.com/feima-uploaded/images/ef/78/ef7895904cc9becbbc10f2043f6138db.png',
        zIndex: 1,
        draggable: true, // 是否可调整
        lock: false, // 锁定图层
        opacity: 1,
        rotate: 0,
        width: 720,
        height: 720,
        x: 560,
        y: 0
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p><span style="color: rgb(0, 0, 0); font-size: 130px;">{{title}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-06',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1260,
        height: 207,
        x: 10,
        y: 150
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p><span style="font-size: 76px;">{{subtitle}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-06',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1260,
        height: 131,
        x: 10,
        y: 316.5
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p><span style="font-size: 64px; color: rgb(255, 255, 255); background-color: rgb(14, 108, 15);"> {{copywriting}} </span></p>',
        style: {
          'font-family': 'SourceHanSansCN-03',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1260,
        height: 114,
        x: 10,
        y: 426
      }]
    }
  }, {
    id: uuidv4(),
    width: 1280,
    height: 720,
    preview_width: 300,
    preview_height: 169,
    name: '字右上',
    pic: 'https://alicdn.madaomall.com/feima-uploaded/images/49/78/4978ef3fd950a6d8f1b52529c4835f20.png',
    layouts: {
      scale: 1, // 缩放比
      width: 1280,
      height: 720,
      // 背景
      background: {
        id: uuidv4(),
        type: 'background',
        color: '#F8F8F8',
        image: null
      },
      // 主要元素标签
      elements: [{
        id: uuidv4(),
        type: 'image',
        url: 'https://alicdn.madaomall.com/feima-uploaded/images/73/da/73dab82b685bf7aae5652968d9bfab39.png',
        zIndex: 1,
        draggable: true, // 是否可调整
        lock: false, // 锁定图层
        opacity: 1,
        rotate: 0,
        width: 1280,
        height: 720,
        x: 0,
        y: 0
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-right"><span style="color: rgb(0, 0, 0); font-size: 120px;">{{title}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-06',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1250,
        height: 193,
        x: 0,
        y: 20
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-right"><span style="font-size: 72px; color: rgb(255, 255, 255); background-color: rgb(14, 108, 15);"> {{subtitle}} </span></p>',
        style: {
          'font-family': 'SourceHanSansCN-03',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1250,
        height: 125,
        x: 0,
        y: 190
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-right"><span style="color: rgb(0, 0, 0); font-size: 60px;">{{copywriting}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-03',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1250,
        height: 109,
        x: 0,
        y: 310
      }]
    }
  }, {
    id: uuidv4(),
    width: 1280,
    height: 720,
    preview_width: 300,
    preview_height: 169,
    name: '字左上',
    pic: 'https://alicdn.madaomall.com/feima-uploaded/images/c3/02/c302541fa22d21893f2d4555d50f038d.png',
    layouts: {
      scale: 1, // 缩放比
      width: 1280,
      height: 720,
      // 背景
      background: {
        id: uuidv4(),
        type: 'background',
        color: '#F8F8F8',
        image: null
      },
      // 主要元素标签
      elements: [{
        id: uuidv4(),
        type: 'image',
        url: 'https://alicdn.madaomall.com/feima-uploaded/images/65/5b/655bc0367f38b8aa157c955040ab487d.png',
        zIndex: 1,
        draggable: true, // 是否可调整
        lock: false, // 锁定图层
        opacity: 1,
        rotate: 0,
        width: 1280,
        height: 720,
        x: 0,
        y: 0
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p><span style="color: rgb(0, 0, 0); font-size: 120px;">{{title}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-06',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1250,
        height: 193,
        x: 30,
        y: 20
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p><span style="font-size: 72px; color: rgb(255, 255, 255); background-color: rgb(14, 108, 15);"> {{subtitle}} </span></p>',
        style: {
          'font-family': 'SourceHanSansCN-03',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1250,
        height: 125,
        x: 30,
        y: 190
      }, {
        id: uuidv4(),
        type: 'text',
        content: '<p><span style="color: rgb(0, 0, 0); font-size: 60px;">{{copywriting}}</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-03',
          'letter-spacing': 0,
          'line-height': 1.4
        },
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width: 1250,
        height: 109,
        x: 30,
        y: 310
      }]
    }
  }, {
    id: uuidv4(),
    width: 1280,
    height: 720,
    preview_width: 300,
    preview_height: 169,
    name: '字下',
    pic: 'https://alicdn.madaomall.com/feima-uploaded/images/03/f7/03f7dabbb202e5e378ba7dafdfd61c8f.png',
    layouts: null
  }, {
    id: uuidv4(),
    width: 1280,
    height: 720,
    preview_width: 300,
    preview_height: 169,
    name: '字上',
    pic: 'https://alicdn.madaomall.com/feima-uploaded/images/05/e6/05e6df65826029ea09d3ba938d230331.png',
    layouts: null
  }]
}
