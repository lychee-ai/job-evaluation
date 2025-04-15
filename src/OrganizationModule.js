import React, { useState, useEffect } from "react";

const valueChain = [
  { id: 1, label: "基础性研发", weight: 4.0 },
  { id: 2, label: "应用性研发", weight: 2.0 },
  { id: 3, label: "工程技术", weight: 1.5 },
  { id: 4, label: "采购/物流", weight: 2.0 },
  { id: 5, label: "生产制造", weight: 2.0 },
  { id: 6, label: "应用/组装", weight: 2.5 },
  { id: 7, label: "市场营销", weight: 1.0 },
  { id: 8, label: "销售", weight: 1.5 },
  { id: 9, label: "分销", weight: 1.5 },
  { id: 10, label: "服务", weight: 2.0 },
];

const economicLevels = [
  { from: 433, to: 866 },
  { from: 866, to: 1731 },
  { from: 1731, to: 3462 },
  { from: 3462, to: 6925 },
  { from: 6925, to: 13849 },
  { from: 13849, to: 27699 },
  { from: 27699, to: 48473 },
  { from: 48473, to: 84828 },
  { from: 84828, to: 148449 },
  { from: 148449, to: 259786 },
  { from: 259786, to: 454625 },
  { from: 454625, to: 681937 },
  { from: 681937, to: 1022906 },
  { from: 1022906, to: 1534359 },
  { from: 1534359, to: 2301538 },
  { from: 2301538, to: 3452307 },
  { from: 3452307, to: 5178461 },
  { from: 5178461, to: 7767691 },
  { from: 7767691, to: Infinity },
];

const employeeLevels = [
  { from: 10, to: 25 },
  { from: 25, to: 50 },
  { from: 50, to: 100 },
  { from: 100, to: 200 },
  { from: 200, to: 400 },
  { from: 400, to: 800 },
  { from: 800, to: 1400 },
  { from: 1400, to: 2500 },
  { from: 2500, to: 4000 },
  { from: 4000, to: 7000 },
  { from: 7000, to: 12000 },
  { from: 12000, to: 18000 },
  { from: 18000, to: 27000 },
  { from: 27000, to: 40000 },
  { from: 40000, to: 60000 },
  { from: 60000, to: 100000 },
  { from: 100000, to: 150000 },
  { from: 150000, to: 225000 },
  { from: 225000, to: Infinity },
];

function getLevelIndex(value, levels) {
  const index = levels.findIndex((l) => value >= l.from && value < l.to);
  return index === -1 ? 1 : index + 2;
}

function getFinalLevel(econ, emp) {
  const avg = (econ + emp) / 2;
  if (avg % 1 === 0) return avg;
  return avg < econ ? Math.ceil(avg) : Math.floor(avg); // 修正方向：靠拢经济等级
}

export default function OrganizationModule({ onLevelChange, exporting, onDetailsChange }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sales, setSales] = useState("");
  const [employees, setEmployees] = useState("");
  const [multiplier, setMultiplier] = useState(0);
  const [econLevel, setEconLevel] = useState(null);
  const [empLevel, setEmpLevel] = useState(null);
  const [finalLevel, setFinalLevel] = useState(null);

  useEffect(() => {
    const sum = selectedIds.reduce((acc, id) => {
      const item = valueChain.find((v) => v.id === id);
      return acc + (item?.weight || 0);
    }, 0);
    setMultiplier(sum);
  }, [selectedIds]);

  useEffect(() => {
    if (sales && multiplier > 0 && employees) {
      const orgScale = parseFloat(sales) * multiplier;
      const econ = getLevelIndex(orgScale, economicLevels);
      const emp = getLevelIndex(parseFloat(employees), employeeLevels);
      const final = getFinalLevel(econ, emp);
      setEconLevel(econ);
      setEmpLevel(emp);
      setFinalLevel(final);
  
      if (onLevelChange) onLevelChange(final);
  
      // ✅ 发送详细数据回父组件
      if (onDetailsChange) {
        const valueChains = valueChain
          .filter((v) => selectedIds.includes(v.id))
          .map((v) => v.label);
        onDetailsChange({
          sales,
          employees,
          valueChains,
        });
      }
    }
  }, [sales, multiplier, employees, selectedIds]); 
  

  const toggleId = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">组织规模模块</h2>
      <p className="text-sm text-gray-600 mb-2">要为“组织”作职位评估，该经营实体必须满足以下三个要求:</p>
      <p className="text-sm text-gray-600 mb-2">—包括至少一个“业务”部门，例如生产、服务研发、或市场营销和销售</p>
      <p className="text-sm text-gray-600 mb-2">—包括至少两个“支持性”部门，例如信息系统、财务和/或人力资源，并且</p>
      <p className="text-sm text-gray-600 mb-2">—具有创造附加价值的运营能力。</p>

      <p className="text-sm text-gray-600 mb-2">请参阅有关的组织规模表(另外提供)以决定组织的规模级别。每个国家的组织规模表都以当地货币表示并考虑当地通货膨胀水平和汇率变动情况(同美元相比)每年更新，为了中和您在评估中的通货膨胀因素它会考虑到当地的通货膨胀和汇率浮动(与美元相比)。</p>
     
      <p className="text-sm text-gray-600 mb-2">为了确定组织规模的级别，需要考虑以下几个步骤:</p>
      <p className="text-sm text-gray-600 mb-2">1 根据组织所创造的附加价值，确定与其相符的组织类型，即产品型(第4页)、服务型(第5页)或金融型(参见注解)。</p>
      <p className="text-sm text-gray-600 mb-2">2 选择该组织参与的价值链环节，并将这些环节的对应权重加总作为规模乘数。要把某一价值链环节归入权重总和，组织内必须有专职员工负责该环节工作，并且其结果必须可以通过带给客户的最终价值来衡量。外包的价值链环节不能算入规模乘数。</p>
      <p className="text-sm text-gray-600 mb-2">3 将规模乘数乘以该组织的净销售额、资产或成本/预算。</p>
      <p className="text-sm text-gray-600 mb-2">4 参照组织规模表，把按步骤三已调整的销售额、资产或成本/预算对应到经济规模表所列的合适范围，据此确定经济规模级别。</p>
      <p className="text-sm text-gray-600 mb-2">5 用员工数量表来验证经济规模级别。如果员工总数得出的级别和经济规模级别不同，则取两者的平均值作为组织规模。如存在小数点，应向经济规模级别倾斜取整。</p>
      
      <p className="text-sm text-gray-600 mb-2">注解:</p>
      <p className="text-sm text-gray-600 mb-2">基于金融资产的组织用1作为规模乘数。</p>
      <p className="text-sm text-gray-600 mb-2">保险公司用保险费收入和服务型价值链来确定规模乘数。</p>
      <p className="text-sm text-gray-600 mb-2">不能直接衡量营业额的组织可估算营业额，即用行业通行的营运利润和该组织的成本/预算推算出营业额。</p>
      <p className="text-sm text-gray-600 mb-2">如组织运作少于3年，请用第三年预算的营业额来确定组织规模。</p>

      <p className="text-sm text-gray-600 mb-2">以下各价值链环节是根据从事产品开发、生产、销售和服务的组织确定的。以下各价值链环节是根据从事产品开发、生产、销售和服务的组织确定的。</p>
      
      <div className="overflow-auto mb-6">
        <p className="text-sm text-gray-600 mb-2">评分细则：</p>
        <img
          src="/organizationsize.png"
          alt="OrganizationSize 评分细则表"
          className="w-full border shadow"
        />
      </div>

      <p className="text-sm text-gray-600 mb-2">*将组织营业额和价值链环节总和相乘，得出组织经济规模。</p>
      <p className="text-sm text-gray-600 mb-2">使用以上结果，参照使用当地货币的当年组织规模表，来确定组织规模级别。</p>
      <p className="text-sm text-gray-600 mb-2">同一组织内所有职位使用同一组织规模级别来评估。</p>

      <p className="text-sm text-gray-600 mb-2">请选择组织所属的价值链环节：</p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {valueChain.map((item) => (
          <label key={item.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={() => toggleId(item.id)}
            />
            <span>{item.label}（权重 {item.weight}）</span>
          </label>
        ))}
      </div>

      <div className="mb-4">
        <label className="block font-semibold">销售额 / 资产 / 成本（百万人民币）：</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={sales}
            onChange={(e) => setSales(e.target.value)}
          />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">员工人数：</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
          />
      </div>

      <div className="mt-6 space-y-2">
        <div>组织规模乘数：{multiplier}</div>
        {econLevel && <div>经济规模等级：{econLevel}</div>}
        {empLevel && <div>员工规模等级：{empLevel}</div>}
        {finalLevel && (
          <div className="text-xl font-bold">最终组织规模等级：{finalLevel}</div>
        )}
      </div>
    </div>
  );
}
