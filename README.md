## 介绍

​		easy-cli是一个简单易用的脚手架工具，可以让用户通过简单的命令行交互获取远程模板工程来快速构建本地开发环境。

## 全局安装

```javascript
npm install -g @yibancangbai/easy-cli
```

## 命令

以下是所有可用命令，您也可以通过在终端内输入easy -h来查看：

create &lt;templateName&gt; &lt;projectName&gt;: 

​		这种方式会在当前目录下创建文件名为```projectName```的项目，如果文件名已存在可选择合并、覆盖或取消操作。

​		另外， ```projectName``` 可以是 ```.``` 代表直接在当前文件目录下初始化项目，而不会再创建文件夹。如果本地当前目录下已有存在的子文件，将默认采用合并的方式处理。

list:

​		将会在终端内列出所有可用的模板列表

bind &lt;url&gt;:

​		将会从远程获取包含模板配置信息的js文件内容，并通过nodejs将其内容写入```process.env.HOME```目录下生成的easyConfig.js文件。

## 使用

  1. 在任意静态服务器上传包含模板配置信息的js文件，该文件内容格式后边会讲到；
  2. 终端中运行 esy bind &lt;远程js文件地址&gt;，将模板配置信息同步到本地；
  3. 运行 easy create  命令开始初始化本地项目；

## 模板配置文件

```javascript
module.exports = {
  templateName: {
    name: 'easy-temporary-' + templateName,
    repo: 'http://gitlab.ops...，模板项目仓库页面地址，仅供查看',
    downloadUrl: 'git@gitlab.ops...，模板项目的完整git clone地址，用于下载',
    description: '模板项目描述'
  },
  ......
}
```

​		请严格按照以上格式编写配置文件，其中```templateName```由用户自定义，在运行```easy create```命令时使用。```downloadUrl```必须是完整的git clone地址，因为easy-cli会在本地运行```git clone```来获取远程代码。```name```属性也要稍微留意下，获取完远程代码后easy-cli会在本地当前目录创建一个临时文件夹用于承载下载的文件，该文件名用的就是```name```的属性值，虽然临时文件夹很快会被自动删除，但还是要尽量保证该文件名的唯一性，避免与同级目录内文件夹产生命名冲突。

### 仓促书写，未完待续。。。

