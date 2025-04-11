import React, { useState } from "react";
import ImpactModule from "./ImpactModule";
import CommunicationModule from "./CommunicationModule";
import InnovationModule from "./InnovationModule";
import KnowledgeModule from "./KnowledgeModule";

const positionClassMap = [
  { min: 26, max: 50, level: 40 },
  { min: 51, max: 75, level: 41 },
  { min: 76, max: 100, level: 42 },
  { min: 101, max: 125, level: 43 },
  { min: 126, max: 150, level: 44 },
  { min: 151, max: 175, level: 45 },
  { min: 176, max: 200, level: 46 },
  { min: 201, max: 225, level: 47 },
  { min: 226, max: 250, level: 48 },
  { min: 251, max: 275, level: 49 },
  { min: 276, max: 300, level: 50 },
  { min: 301, max: 325, level: 51 },
  { min: 326, max: 350, level: 52 },
  { min: 351, max: 375, level: 53 },
  { min: 376, max: 400, level: 54 },
  { min: 401, max: 425, level: 55 },
  { min: 426, max: 450, level: 56 },
  { min: 451, max: 475, level: 57 },
  { min: 476, max: 500, level: 58 },
  { min: 501, max: 525, level: 59 },
  { min: 526, max: 550, level: 60 },
  { min: 551, max: 575, level: 61 },
  { min: 576, max: 600, level: 62 },
  { min: 601, max: 625, level: 63 },
  { min: 626, max: 650, level: 64 },
  { min: 651, max: 675, level: 65 },
  { min: 676, max: 700, level: 66 },
  { min: 701, max: 725, level: 67 },
  { min: 726, max: 750, level: 68 },
  { min: 751, max: 775, level: 69 },
  { min: 776, max: 800, level: 70 },
  { min: 801, max: 825, level: 71 },
  { min: 826, max: 850, level: 72 },
  { min: 851, max: 875, level: 73 },
  { min: 876, max: 900, level: 74 },
  { min: 901, max: 925, level: 75 },
  { min: 926, max: 950, level: 76 },
  { min: 951, max: 975, level: 77 },
  { min: 976, max: 1000, level: 78 },
  { min: 1001, max: 1025, level: 79 },
  { min: 1026, max: 1050, level: 80 },
  { min: 1051, max: 1075, level: 81 },
  { min: 1076, max: 1100, level: 82 },
  { min: 1101, max: 1125, level: 83 },
  { min: 1126, max: 1150, level: 84 },
  { min: 1151, max: 1175, level: 85 },
  { min: 1176, max: 1200, level: 86 },
  { min: 1201, max: 1225, level: 87 },
];

function getPositionClass(total) {
  const match = positionClassMap.find(
    (item) => total >= item.min && total <= item.max
  );
  return match ? match.level : "未知";
}

export default function EvaluationSummary() {
  const [scores, setScores] = useState({
    impact: 0,
    communication: 0,
    innovation: 0,
    knowledge: 0,
  });

  const total =
    Number(scores.impact) +
    Number(scores.communication) +
    Number(scores.innovation) +
    Number(scores.knowledge);

  const positionClass = getPositionClass(total);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">职位评估汇总</h1>

      <ImpactModule onScoreChange={(val) => setScores((s) => ({ ...s, impact: val }))} />
      <CommunicationModule onScoreChange={(val) => setScores((s) => ({ ...s, communication: val }))} />
      <InnovationModule onScoreChange={(val) => setScores((s) => ({ ...s, innovation: val }))} />
      <KnowledgeModule onScoreChange={(val) => setScores((s) => ({ ...s, knowledge: val }))} />

      <div className="text-xl font-bold mt-10 text-center">
        <p>💡 四项评分总分：{total} 分</p>
        <p>🏅 对应职位等级（Position Class）：P{positionClass}</p>
      </div>
    </div>
  );
}
