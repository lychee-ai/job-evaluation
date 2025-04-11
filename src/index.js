import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import EvaluationSummary from "./EvaluationSummary";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <EvaluationSummary />
      </main>
      <footer className="text-center text-sm text-gray-500 mb-4">
        © 2025 职位评估工具 | Developed by Lychee
      </footer>
    </div>
  </React.StrictMode>
);



/*
import React from "react";
import ReactDOM from "react-dom/client";
import ImpactModule from "./ImpactModule";
import CommunicationModule from "./CommunicationModule";
import InnovationModule from "./InnovationModule";
import KnowledgeModule from "./KnoledgeModule";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">职位评估系统</h1>
      <ImpactModule />
      <CommunicationModule />
      <InnovationModule />
      <KnowledgeModule />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
*/
/*
你需要创建如下文件结构：
- src/
  - index.js （即此文件）
  - ImpactModule.js （你之前那段模块代码）
  - index.css （包含 Tailwind 基础样式）

index.html 中需要设置 id="root" 的挂载点。
*/
