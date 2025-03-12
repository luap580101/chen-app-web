# MERN Stack 課程管理平台

## 架構簡介

本專案採用 **MERN 全端架構**，分為前端、後端與資料庫三大部分，整合成一套簡單易用的課程管理平台。

### 技術組成

- **MongoDB（數據庫）**  
  MongoDB 是一款 NoSQL 資料庫，使用 BSON（Binary JSON）格式儲存資料，適合處理大規模非結構化或半結構化資料。本專案中負責儲存用戶資訊、課程等資料。

- **Express.js（後端伺服器）**  
  Express.js 是基於 Node.js 的 Web 應用框架，簡化 HTTP 請求處理與 API 架設。專案負責處理 API、用戶認證、課程邏輯等。

- **React（前端用戶界面）**  
  React 是由 Meta 開發的前端框架，採用組件化設計，提升 UI 維護效率。本專案負責用戶互動、顯示課程、註冊登入等介面。

- **Node.js（伺服器環境）**  
  Node.js 作為執行 Express.js 的伺服器端環境，提供事件驅動與非同步能力，讓後端高效穩定運行。

---

## 專案功能介紹

本專案是一個針對線上授課平台所設計的應用，具備以下功能：

- **帳號系統（學生 / 講師）**
  - 註冊帳號時可選擇身分（學生或講師）
  - 講師可新增課程
  - 學生可瀏覽與報名課程

- **JWT 身份驗證**  
  後端採用 JWT (JSON Web Token) 作為帳號登入、驗證機制，確保安全性。

- **課程管理功能**
  - 課程建立、編輯、刪除（限講師）
  - 課程列表、報名（學生）

- **資料儲存**  
  使用 MongoDB 儲存所有帳號與課程相關資料。

---

## 安裝與使用方式

### 環境需求

- Node.js **v20.9.0** 或以上版本
- Docker（用於 MongoDB 建立容器）

### 前端 (React + Next.js)

```bash
# Clone 前端專案
git clone https://github.com/luap580101/chen-app-web.git

# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev
```

### 後端 (Express.js + Node.js)

```bash
# Clone 後端專案
git clone https://github.com/luap580101/chen-app-api.git

# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev
```

### 資料庫 (MongoDB)
MongoDB 部署於 /mongodb 資料夾，使用 Docker 進行架設：

```bash
# 啟動 MongoDB
cd mongodb

docker-compose up -d

```


### 前後端 Repo 連結
- 前端： https://github.com/luap580101/chen-app-web
- 後端： https://github.com/luap580101/chen-app-api

