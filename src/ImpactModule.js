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

const Dropdown = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <div
        className="p-2 border rounded cursor-pointer bg-white"
        onClick={() => setOpen(!open)}
      >
        {value || "请选择"}
      </div>
      {open && (
        <ul className="absolute z-10 bg-white border rounded shadow w-full max-h-60 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function ImpactModule({ onScoreChange }) {
  const [impact, setImpact] = useState("");
  const [contribution, setContribution] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    const result = getImpactScore(Number(impact), Number(contribution));
    setScore(result);
    if (onScoreChange && result !== null) {
      onScoreChange(Number(result));
    }
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

      <Dropdown
        label="影响等级（1~5）"
        options={[1, 2, 3, 4, 5]}
        value={impact}
        onChange={setImpact}
      />

      <Dropdown
        label="贡献等级（1~5，支持 0.5）"
        options={[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]}
        value={contribution}
        onChange={setContribution}
      />

      <div className="text-xl font-bold mt-6">
        Impact得分：{score !== null ? `${score} 分` : "-"}
      </div>
    </div>
  );
}
