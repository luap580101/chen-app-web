"use client";

import React from "react";
import Link from "next/link";

const Home: React.FC = () => {
  return (
    <main>
      <div className="p-4">
        <div className="p-5 mb-4 bg-gray-100 rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold text-3xl">MERN 練習</h1>
            <p className="col-md-8 text-xl">
              本系統使用 Next.js, TypeScript 作為前端框架，
            </p>
            <p className="col-md-8 text-xl">
              Node.js、MongoDB 作為後端服務器。
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="h-full p-5 text-white bg-gray-800 rounded-3">
              <h2 className="text-2xl font-bold">作為一個學生</h2>
              <p className="mt-4 text-lg">學生可以註冊他們喜歡的課程。</p>
              <Link href="/register">
                <button className="mt-4 btn bg-transparent border-2 text-white border-white hover:bg-white hover:text-black px-6 py-2 rounded-full">
                  登錄會員、或者註冊一個帳號
                </button>
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="h-full p-5 bg-gray-100 border rounded-3">
              <h2 className="text-2xl font-bold">作為一個導師</h2>
              <p className="mt-4 text-lg">
                您可以通過註冊成為一名講師，並開始製作在線課程。
              </p>
              <Link href="register">
                <button className="mt-4 btn bg-transparent border-2 text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white px-6 py-2 rounded-full">
                  今天開始開設課程
                </button>
              </Link>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-center text-muted border-t border-gray-300 text-sm text-gray-500">
          &copy; 2025 - {new Date().getFullYear()} Chen APP
        </footer>
      </div>
    </main>
  );
};

export default Home;
