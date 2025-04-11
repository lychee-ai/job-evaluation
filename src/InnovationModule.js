import React, { useState, useEffect } from "react";

const innovationMatrix = {
  1: [10, 15, 20, 25],
  2: [25, 30, 35, 40],
  3: [40, 45, 50, 55],
  4: [65, 70, 75, 80],
  5: [90, 95, 100, 105],
  6: [115, 120, 125, 130],
};

const getInnovationScore = (level, complexity) => {
  if (!level || !complexity) return null;
  const lFloor = Math.floor(level);
  const cFloor = Math.floor(complexity);
  const lHalf = level % 1 !== 0;
  const cHalf = complexity % 1 !== 0;

  const getMatrixValue = (l, c) => {
    const colIndex = c - 1;
    return innovationMatrix[l]?.[colIndex] ?? null;
  };

  if (lHalf && cHalf) {
    const vals = [
      getMatrixValue(lFloor, cFloor),
      getMatrixValue(lFloor + 1, cFloor),
      getMatrixValue(lFloor, cFloor + 1),
      getMatrixValue(lFloor + 1, cFloor + 1),
    ];
    if (vals.some((v) => v == null)) return null;
    return (vals.reduce((a, b) => a + b, 0) / 4).toFixed(1);
  } else if (lHalf) {
    const v1 = getMatrixValue(lFloor, complexity);
    const v2 = getMatrixValue(lFloor + 1, complexity);
    if (v1 == null || v2 == null) return null;
    return ((v1 + v2) / 2).toFixed(1);
  } else if (cHalf) {
    const v1 = getMatrixValue(level, cFloor);
    const v2 = getMatrixValue(level, cFloor + 1);
    if (v1 == null || v2 == null) return null;
    return ((v1 + v2) / 2).toFixed(1);
  } else {
    return getMatrixValue(level, complexity);
  }
};

export default function InnovationModule() {
  const [level, setLevel] = useState("");
  const [complexity, setComplexity] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    const result = getInnovationScore(Number(level), Number(complexity));
    setScore(result);
  }, [level, complexity]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Innovation 模块评估</h2>
      <p className="text-sm text-gray-600 mb-2">本因素着眼于职位所需要的创新水平。首先确定对职位期望的创新水平，然后决定该创新水平的复杂程度。</p>
      
      <div className="overflow-auto mb-6">
        <p className="text-sm text-gray-600 mb-2">评分细则：</p>
        <img
          src="/innovation.png"
          alt="Innovation 评分细则表"
          className="w-full border shadow"
        />
      </div>

      <div className="mt-6">
        <label className="block font-semibold">创新等级（1~6，支持 0.5）：</label>
        <select
          className="w-full p-2 border rounded mt-1"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="">请选择</option>
          {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label className="block font-semibold mt-4">复杂性等级（1~4，支持 0.5）：</label>
        <select
          className="w-full p-2 border rounded mt-1"
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
        >
          <option value="">请选择</option>
          {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="text-xl font-bold mt-6">
        Innovation得分：{score !== null ? `${score} 分` : "-"}
      </div>
    </div>
  );
}
