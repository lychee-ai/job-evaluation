import React, { useState, useEffect } from "react";

const communicationMatrix = {
  1: [10, 25, 30, 45],
  2: [25, 40, 45, 60],
  3: [40, 55, 60, 75],
  4: [55, 75, 80, 100],
  5: [70, 90, 95, 115],
};

const getCommunicationScore = (comm, frame) => {
  if (!comm || !frame) return null;
  const floor = Math.floor(comm);
  const isHalf = comm % 1 !== 0;

  const getMatrixValue = (c, f) => {
    const colIndex = f - 1;
    return communicationMatrix[c]?.[colIndex] ?? null;
  };

  if (isHalf) {
    const lower = getMatrixValue(floor, frame);
    const upper = getMatrixValue(floor + 1, frame);
    if (lower == null || upper == null) return null;
    return ((lower + upper) / 2).toFixed(1);
  } else {
    return getMatrixValue(comm, frame);
  }
};

export default function CommunicationModule({ onScoreChange }) {
  const [comm, setComm] = useState("");
  const [frame, setFrame] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    const result = getCommunicationScore(Number(comm), Number(frame));
    setScore(result);
    if (onScoreChange && result !== null) {
      onScoreChange(Number(result));
    }
  }, [comm, frame]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Communication 模块评估</h2>
      <p className="text-sm text-gray-600 mb-2">本因素者眼于职位中经常需要用到的沟通技巧。首先，决定任职者日常工作中经常需要用到的最具挑战性的沟通类型，然后再依据该沟通类型中最困难的场景作相应调整。</p>
      <p className="text-sm text-gray-600 mb-2">如果此类沟通的出现并不频繁或只是偶然发生，应从评估结果减去半分。相反，如果此如果此类沟类沟通持续出现，则在评估结果上加半分。</p>

      <div className="overflow-auto mb-6">
        <p className="text-sm text-gray-600 mb-2">评分细则：</p>
        <img
          src="/communication.png"
          alt="Communication 评分细则表"
          className="w-full border shadow"
        />
      </div>

      <div className="mt-6">
        <label className="block font-semibold">沟通等级（1~5，支持 0.5）：</label>
        <select
          className="w-full p-2 border rounded mt-1"
          value={comm}
          onChange={(e) => setComm(e.target.value)}
        >
          <option value="">请选择</option>
          {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label className="block font-semibold mt-4">架构等级（1~4）：</label>
        <select
          className="w-full p-2 border rounded mt-1"
          value={frame}
          onChange={(e) => setFrame(e.target.value)}
        >
          <option value="">请选择</option>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="text-xl font-bold mt-6">
        Communication得分：{score !== null ? `${score} 分` : "-"}
      </div>
    </div>
  );
}
