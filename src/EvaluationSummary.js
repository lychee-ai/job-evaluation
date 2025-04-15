import React, { useState } from "react";
import OrganizationModule from "./OrganizationModule";
import ImpactModule from "./ImpactModule";
import CommunicationModule from "./CommunicationModule";
import InnovationModule from "./InnovationModule";
import KnowledgeModule from "./KnowledgeModule";
import { PDFDownloadLink } from "@react-pdf/renderer";
import EvaluationPDF from "./EvaluationPDF";

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
  const roundedTotal = Math.floor(total);
  const match = positionClassMap.find(
    (item) => roundedTotal >= item.min && roundedTotal <= item.max
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

  const [info, setInfo] = useState({ jobTitle: "", evaluator: "" });
  const [timestamp] = useState(new Date().toLocaleString());
  const [orgLevel, setOrgLevel] = useState(9);
  const [exporting, setExporting] = useState(false);


  const total =
    Number(scores.impact) +
    Number(scores.communication) +
    Number(scores.innovation) +
    Number(scores.knowledge);

  const positionClass = getPositionClass(total);

  const [orgDetails, setOrgDetails] = useState({
    sales: "",
    employees: "",
    valueChains: [],
  });
  
  const [impactInputs, setImpactInputs] = useState({
    impactLevel: "",
    contributionLevel: ""
  });

  const [communicationInputs, setCommunicationInputs] = useState({
    communicationLevel: "",
    frameLevel: ""
  });

  const [innovationInputs, setInnovationInputs] = useState({
    innovationLevel: "",
    complexityLevel: ""
  });

  const [knowledgeInputs, setKnowledgeInputs] = useState({
    knowledgeLevel: "",
    teamLevel: "",
    widthLevel:""
  });
  

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">职位评估汇总</h1>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">职位名称：</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="请输入职位名称"
            value={info.jobTitle}
            onChange={(e) => setInfo({ ...info, jobTitle: e.target.value })}
          />
        </div>
        <div>
          <label className="block font-semibold">填写人姓名：</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="请输入您的姓名"
            value={info.evaluator}
            onChange={(e) => setInfo({ ...info, evaluator: e.target.value })}
          />
        </div>
      </div>

      <OrganizationModule 
        exporting={exporting}
        onLevelChange={setOrgLevel}
        onDetailsChange={setOrgDetails}
      />
      <ImpactModule
        orgLevel={orgLevel}
        onScoreChange={(val) =>
          setScores((s) => ({ ...s, impact: val }))
        }
        onInputsChange={setImpactInputs}
      />
      <CommunicationModule
        onScoreChange={(val) =>
          setScores((s) => ({ ...s, communication: val }))
        }
        onInputsChange={setCommunicationInputs}
      />
      <InnovationModule
        onScoreChange={(val) =>
          setScores((s) => ({ ...s, innovation: val }))
        }
        onInputsChange={setInnovationInputs}
      />
      <KnowledgeModule
        onScoreChange={(val) =>
          setScores((s) => ({ ...s, knowledge: val }))
        }
        onInputsChange={setKnowledgeInputs}
      />

      <div className="text-xl font-bold mt-10 text-center">
        <p>💼 职位：{info.jobTitle || "未填写"}</p>
        <p>🏢 组织规模等级：{orgLevel ?? "未评估"}</p>
        <p>🧮 四项评分总分：{total} 分</p>
        <p>🏅 对应职位等级（Position Class）：P{positionClass}</p>
        <p className="mt-2 text-sm text-gray-500">📋 由 {info.evaluator || "未填写"} 填写</p>
        <p className="text-sm text-gray-400">🕒 填写时间：{timestamp}</p>
      </div>

      <div className="text-center mt-6 space-x-4">
        <PDFDownloadLink
          document={
            <EvaluationPDF
            info={info}
            scores={scores}
            orgLevel={orgLevel}
            positionClass={positionClass}
            timestamp={timestamp}
            orgDetails={orgDetails}
            impactInputs={impactInputs}
            communicationInputs={communicationInputs}
            innovationInputs={innovationInputs}
            knowledgeInputs={knowledgeInputs}
          />
          }
          fileName={`${info.jobTitle || "职位评估"}.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <button className="bg-gray-400 text-white px-6 py-2 rounded" disabled>
                正在生成 PDF...
              </button>
            ) : (
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                下载 PDF 报告
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}
