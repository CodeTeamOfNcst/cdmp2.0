# IconFont 方案
## 准备
1.注册 阿里矢量图标库账号 http://www.iconfont.cn
2.在 图标管理》我的项目 内添加或加入一个项目

## 使用
1.在图标库内可以通过搜索中文或英文找到相应的图标
2.将图标添加入库，然后从库中添加相应的项目（类似加入购物车操作）
3.在项目内切换到 Font Class 模式，修改好图标的class
4.点击 “查看在线链接” 来动态生成css文件（注意：每次添加新的图标到项目内到应该点击 “更新链接”）
5.生成或更新链接后要同步修改 nuxt.config.js 内的 link

```
head: {
    link: [
        { rel: 'stylesheet', href: '//at.alicdn.com/t/font_631064_ft6ks1tpzo1aif6r.css' }
    ]
}
```

6.使用 `<i class="iconfont icon-user">` 标签引入图标

## 建议
1.图标大致可以分为两种：实心和线性，在搜索选择图标的时候请保证项目内的图标风格统一。