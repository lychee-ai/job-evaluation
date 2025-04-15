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

export default function InnovationModule({ onScoreChange, onInputsChange }) {
  const [level, setLevel] = useState("");
  const [complexity, setComplexity] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    const result = getInnovationScore(Number(level), Number(complexity));
    setScore(result);
    if (onScoreChange && result !== null) {
      onScoreChange(Number(result));
    }
    if (onInputsChange) {
      onInputsChange({
        innovationLevel: level,
        complexityLevel: complexity
      });
    }
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

      <Dropdown
        label="创新等级（1~6，支持 0.5）"
        options={[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]}
        value={level}
        onChange={setLevel}
      />

      <Dropdown
        label="复杂性等级（1~4，支持 0.5）"
        options={[1, 1.5, 2, 2.5, 3, 3.5, 4]}
        value={complexity}
        onChange={setComplexity}
      />

      <div className="text-xl font-bold mt-6">
        Innovation得分：{score !== null ? `${score} 分` : "-"}
      </div>
    </div>
  );
}
