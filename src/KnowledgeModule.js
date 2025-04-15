import React, { useState, useEffect } from "react";

const knowledgeMatrix = [
  [15, 25, 35, 50, 60, 70, 75, 85, 95],
  [30, 40, 50, 65, 75, 85, 90, 100, 110],
  [60, 70, 80, 95, 105, 115, 120, 130, 140],
  [90, 100, 110, 125, 135, 145, 150, 160, 170],
  [113, 123, 133, 148, 158, 168, 173, 183, 193],
  [135, 145, 155, 170, 180, 190, 195, 205, 215],
  [158, 168, 178, 193, 203, 213, 218, 228, 238],
  [180, 190, 200, 215, 225, 235, 240, 250, 260],
];

const getKnowledgeScore = (k, t, w) => {
  if (!k || !t || !w) return null;
  const kF = Math.floor(k), tF = Math.floor(t), wF = Math.floor(w);
  const isHalf = (v) => v % 1 !== 0;

  const get = (row, col) => knowledgeMatrix[row]?.[col] ?? null;

  const teamWidthToCol = (team, width) => (team - 1) * 3 + (width - 1);

  const rows = isHalf(k) ? [kF - 1, kF] : [kF - 1];
  const cols = isHalf(t) || isHalf(w)
    ? [
        teamWidthToCol(Math.floor(t), Math.floor(w)),
        ...(isHalf(t) ? [teamWidthToCol(Math.floor(t) + 1, Math.floor(w))] : []),
        ...(isHalf(w) ? [teamWidthToCol(Math.floor(t), Math.floor(w) + 1)] : []),
        ...(isHalf(t) && isHalf(w)
          ? [teamWidthToCol(Math.floor(t) + 1, Math.floor(w) + 1)]
          : []),
      ]
    : [teamWidthToCol(t, w)];

  const values = [];
  for (let r of rows) {
    for (let c of cols) {
      const val = get(r, c);
      if (val != null) values.push(val);
    }
  }

  if (values.length === 0) return null;
  return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
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

export default function KnowledgeModule({ onScoreChange, onInputsChange }) {
  const [knowledge, setKnowledge] = useState("");
  const [team, setTeam] = useState("");
  const [width, setWidth] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    const result = getKnowledgeScore(
      Number(knowledge),
      Number(team),
      Number(width)
    );
    setScore(result);
    if (onScoreChange && result !== null) {
      onScoreChange(Number(result));
    }
    if (onInputsChange) {
      onInputsChange({
        knowLedgeLevel: knowledge,
        teamLevel: team,
        widthLevel: width
      });
    }
  }, [knowledge, team, width]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Knowledge 模块评估</h2>
      <p className="text-sm text-gray-600 mb-2">本因素是关于职位职责要求完成的王作目标和价值创造所需要具备的知识性质。知识的获得的途径既可能通过正规教育有可能通过工作经验或两者兼有。</p>
      <p className="text-sm text-gray-600 mb-2">在评分时，首先区别该职位上所应用知识的深度；然后确定职位上的任职者是团队成员，团队领袖还是多团队经理；最后确定该职位的知识应用是否具有跨地域，跨文化的背景。</p>

      <div className="overflow-auto mb-6">
        <p className="text-sm text-gray-600 mb-2">评分细则：</p>
        <img
          src="/knowledge.png"
          alt="Knowledge 评分细则表"
          className="w-full border shadow"
        />
      </div>

      <Dropdown
        label="知识等级（1~8，支持 0.5）"
        options={[1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8]}
        value={knowledge}
        onChange={setKnowledge}
      />

      <Dropdown
        label="团队角色（1~3，支持 0.5）"
        options={[1,1.5,2,2.5,3]}
        value={team}
        onChange={setTeam}
      />

      <Dropdown
        label="职责宽度（1~3，支持 0.5）"
        options={[1,1.5,2,2.5,3]}
        value={width}
        onChange={setWidth}
      />

      <div className="text-xl font-bold mt-6">
        Knowledge得分：{score !== null ? `${score} 分` : "-"}
      </div>
    </div>
  );
}
