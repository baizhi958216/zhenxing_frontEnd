# 环境说明

## 根目录新建`.env`文件, 内容如下

```bash
VITE_GITEA_HOST=Gitea图片仓库地址

# 注意: 微信小程序WebSocket必须使用wss
VITE_BACKEND_WEBSOCKET=后端WebSocket地址
VITE_BACKEND_URL=后端地址
VITE_CHATGPTAPI=ChatGPT后端地址
```

Gitea 图片仓库地址: (eg: `http://******:3000`)  
后端 WebSocket 地址: (eg: `wss://******:1146`)  
后端地址: (eg: `https://www.*******.onlone`)
ChatGPT 后端地址: (eg: `http://******:3000/api/chat/chatgpt`)
