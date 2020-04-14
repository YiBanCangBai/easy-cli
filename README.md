## 全局安装

```javascript
gnpm i -g @lib/easy-cli
```



## 使用

请严格按照以下方式创建，只要保证远程仓库已存在，不要执行git clone下载，否则会导致模板下载失败！这个后续再支持！

```javascript
easy create <templateName> <projectName> // 创建包含文件名称的项目模板，如果文件名已存在可选择合并、覆盖或取消操作
  or
easy create <templateName> . // 在当前目录直接生成项目模板

cd <templateName> // 如果不在项目目录，切到项目目录下

git init // 为项目初始化git

git remote add origin <远程仓库地址> // 添加远程仓库地址关联

git push --set-upstream origin master // 关联远程分支
```

## 项目模板

项目模板目前有两个：

1.单页模板<single>or<s>

2.多页模板<multi>or<m>

可简称"s m"组合



###仓促书写，未完待续。。。

