import React, { useState, useEffect } from "react";

const impactMatrix = {
  1: [1, 2, 3, 4, 5],
  2: [4, 5, 6, 7, 8],
  3: [7, 8, 9, 10, 11],
  4: [10, 11, 12, 13, 14],
  5: [13, 14, 15, 16, 17],
};

// 从图表动态获取分数
const getOrgScoreMap = (orgLevel) => {
  const orgScores = [
    [5, 15, 25, 37, 44, 56, 63, 80, 87, 104, 111, 128, 135, 147, 155, 168, 176],
    [5, 15, 25, 39, 48, 62, 71, 89, 98, 116, 125, 144, 153, 167, 177, 192, 202],
    [5, 15, 25, 41, 52, 68, 79, 98, 109, 128, 139, 160, 171, 187, 199, 216, 228],
    [5, 15, 25, 43, 56, 74, 87, 107, 120, 140, 153, 176, 189, 207, 221, 240, 254],
    [5, 15, 25, 45, 60, 80, 95, 116, 131, 152, 167, 192, 207, 227, 243, 264, 285],
    [5, 15, 25, 47, 64, 86, 103, 125, 142, 164, 181, 208, 225, 247, 265, 293, 316],
    [5, 15, 25, 49, 68, 92, 111, 134, 153, 176, 195, 224, 243, 267, 292, 322, 347],
    [5, 15, 25, 51, 72, 98, 119, 143, 164, 188, 209, 240, 261, 292, 319, 351, 378],
    [5, 15, 25, 53, 76, 104, 127, 152, 175, 200, 223, 256, 284, 317, 346, 380, 409],
    [5, 15, 25, 55, 80, 110, 135, 161, 186, 212, 237, 277, 307, 342, 373, 409, 440],
    [5, 15, 25, 57, 84, 116, 143, 170, 197, 224, 256, 298, 330, 367, 395, 438, 471],
    [5, 15, 25, 59, 88, 122, 151, 179, 208, 241, 275, 319, 353, 392, 422, 467, 497],
    [5, 15, 25, 61, 92, 128, 159, 188, 224, 258, 294, 340, 376, 417, 449, 491, 523],
    [5, 15, 25, 63, 96, 134, 167, 202, 240, 275, 313, 361, 394, 437, 471, 515, 549],
    [5, 15, 25, 65, 100, 140, 180, 216, 256, 292, 327, 377, 412, 457, 493, 539, 575],
    [5, 15, 25, 67, 104, 151, 193, 230, 267, 304, 341, 393, 430, 477, 515, 563, 601],
    [5, 15, 25, 69, 108, 162, 201, 239, 278, 316, 355, 409, 448, 497, 537, 587, 627],
    [5, 15, 25, 71, 117, 168, 209, 248, 289, 328, 369, 425, 466, 517, 559, 611, 653],
    [5, 15, 25, 78, 121, 174, 217, 257, 300, 340, 383, 441, 484, 537, 581, 635, 679],
    [5, 15, 25, 80, 125, 180, 225, 266, 311, 352, 397, 457, 502, 557, 603, 659, 705],
  ];

  return orgScores[orgLevel - 1]; // 获取对应列
};

const getImpactScore = (impact, contribution, orgLevel) => {
  if (!impact || !contribution || !orgLevel) return null;

  const orgScoreMap = getOrgScoreMap(orgLevel);

  const contribFloor = Math.floor(contribution);
  const isHalf = contribution % 1 !== 0;

  const getMatrixValue = (i, c) => {
    const colIndex = c - 1;
    return impactMatrix[i]?.[colIndex] ?? null;
  };

  if (isHalf) {
    const lower = getMatrixValue(impact, contribFloor) - 1;
    const upper = getMatrixValue(impact, contribFloor + 1) - 1;
    if (lower == null || upper == null) return null;
    const org1 = orgScoreMap[lower];
    const org2 = orgScoreMap[upper];
    return ((org1 + org2) / 2).toFixed(1);
  } else {
    const val = getMatrixValue(impact, contribution) - 1;
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

export default function ImpactModule({orgLevel, onScoreChange, onInputsChange }) {
  const [impact, setImpact] = useState("");
  const [contribution, setContribution] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    const result = getImpactScore(Number(impact), Number(contribution), orgLevel);
    setScore(result);
    if (onScoreChange && result !== null) {
      onScoreChange(Number(result));
    }
    if (onInputsChange) {
      onInputsChange({
        impactLevel: impact,
        contributionLevel: contribution
      });
    }
  }, [impact, contribution, orgLevel]);

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
