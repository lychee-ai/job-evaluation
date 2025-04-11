import React, { useState, useEffect } from "react";

const impactMatrix = {
  1: [1, 2, 3, 4, 5],
  2: [4, 5, 6, 7, 8],
  3: [7, 8, 9, 10, 11],
  4: [10, 11, 12, 13, 14],
  5: [13, 14, 15, 16, 17],
};

const orgScoreMap = {
  1: 5,
  2: 15,
  3: 25,
  4: 53,
  5: 76,
  6: 104,
  7: 127,
  8: 152,
  9: 175,
  10: 200,
  11: 223,
  12: 256,
  13: 284,
  14: 317,
  15: 346,
  16: 380,
  17: 409,
};

const getImpactScore = (impact, contribution) => {
  if (!impact || !contribution) return null;
  const contribFloor = Math.floor(contribution);
  const isHalf = contribution % 1 !== 0;

  const getMatrixValue = (i, c) => {
    const colIndex = c - 1;
    return impactMatrix[i]?.[colIndex] ?? null;
  };

  if (isHalf) {
    const lower = getMatrixValue(impact, contribFloor);
    const upper = getMatrixValue(impact, contribFloor + 1);
    if (lower == null || upper == null) return null;
    const org1 = orgScoreMap[lower];
    const org2 = orgScoreMap[upper];
    return ((org1 + org2) / 2).toFixed(1);
  } else {
    const val = getMatrixValue(impact, contribution);
    return orgScoreMap[val] ?? null;
  }
};

export default function ImpactModule() {
  const [impact, setImpact] = useState("");
  const [contribution, setContribution] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    const result = getImpactScore(Number(impact), Number(contribution));
    setScore(result);
  }, [impact, contribution]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Impact 模块评估</h2>
      <p className="text-sm text-gray-600 mb-2">本因素主要是考感职位影响力的性质及其相应的贡献程度。在评分时，首先确定职位上的影响力性质，随后确定贡献的程度是有限、部分、直接、显著、还是首要的。</p>

      <div className="overflow-auto mb-6">
        <p className="text-sm text-gray-600 mb-2">评分细则：</p>
        <img
          src="/impact.png"
          alt="Impact 评分细则表"
          className="w-full border shadow"
        />
      </div>

      <div className="mt-6">
        <label className="block font-semibold">影响等级（1~5）：</label>
        <select
          className="w-full p-2 border rounded mt-1"
          value={impact}
          onChange={(e) => setImpact(e.target.value)}
        >
          <option value="">请选择</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label className="block font-semibold mt-4">贡献等级（1~5，支持 0.5）：</label>
        <select
          className="w-full p-2 border rounded mt-1"
          value={contribution}
          onChange={(e) => setContribution(e.target.value)}
        >
          <option value="">请选择</option>
          {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="text-xl font-bold mt-6">
        Impact得分：{score !== null ? `${score} 分` : "-"}
      </div>
    </div>
  );
}
