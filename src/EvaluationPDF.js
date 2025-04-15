import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import NotoSansSC from "./fonts/NotoSansSC-Regular.ttf";

Font.register({
  family: "NotoSansSC",
  src: NotoSansSC,
});

// 样式定义
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "NotoSansSC",
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 12,
    marginLeft: 10,
  },
  bullet: {
    marginLeft: 16,
  },
});

export default function EvaluationPDF({
  info,
  scores,
  orgLevel,
  positionClass,
  timestamp,
  orgDetails,
  impactInputs,
  communicationInputs,
  innovationInputs,
  knowledgeInputs,
}) {
  const total =
    scores.impact + scores.communication + scores.innovation + scores.knowledge;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 基本信息 */}
        <View style={styles.section}>
          <Text style={styles.label}>职位名称：</Text>
          <Text style={styles.value}>{info.jobTitle || "未填写"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>填写人姓名：</Text>
          <Text style={styles.value}>{info.evaluator || "未填写"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>填写时间：</Text>
          <Text style={styles.value}>{timestamp}</Text>
        </View>

        {/* 组织模块信息 */}
        <View style={styles.section}>
          <Text style={styles.label}>组织模块信息：</Text>
          <Text style={styles.value}>组织等级：{orgLevel ?? "未评估"}</Text>
          <Text style={styles.value}>销售额（百万）：{orgDetails?.sales || "未填写"}</Text>
          <Text style={styles.value}>员工人数：{orgDetails?.employees || "未填写"}</Text>
          <Text style={styles.value}>价值链环节：</Text>
          <View style={styles.value}>
            {orgDetails?.valueChains?.length > 0 ? (
              orgDetails.valueChains.map((item, idx) => (
                <Text key={idx} style={styles.bullet}>• {item}</Text>
              ))
            ) : (
              <Text style={styles.bullet}>无</Text>
            )}
          </View>
        </View>

        {/* Impact 模块输入 */}
        <View style={styles.section}>
          <Text style={styles.label}>Impact 模块输入：</Text>
          <Text style={styles.value}>影响等级：{impactInputs?.impactLevel || "未填写"}</Text>
          <Text style={styles.value}>贡献等级：{impactInputs?.contributionLevel || "未填写"}</Text>
        </View>

        {/* Communication 模块输入 */}
        <View style={styles.section}>
          <Text style={styles.label}>Communication 模块输入：</Text>
          <Text style={styles.value}>沟通等级：{communicationInputs?.communicationLevel || "未填写"}</Text>
          <Text style={styles.value}>架构等级：{communicationInputs?.frameLevel || "未填写"}</Text>
        </View>

        {/* Innovation 模块输入 */}
        <View style={styles.section}>
          <Text style={styles.label}>Innovation 模块输入：</Text>
          <Text style={styles.value}>创新等级：{innovationInputs?.innovationLevel || "未填写"}</Text>
          <Text style={styles.value}>复杂性等级：{innovationInputs?.complexityLevel || "未填写"}</Text>
        </View>

        {/* Knowledge 模块输入 */}
        <View style={styles.section}>
          <Text style={styles.label}>Knowledge 模块输入：</Text>
          <Text style={styles.value}>知识等级：{knowledgeInputs?.knowledgeLevel || "未填写"}</Text>
          <Text style={styles.value}>团队角色：{knowledgeInputs?.teamLevel || "未填写"}</Text>
          <Text style={styles.value}>职责宽度：{knowledgeInputs?.widthLevel || "未填写"}</Text>
        </View>

        {/* 分数信息 */}
        <View style={styles.section}>
          <Text style={styles.label}>评分详情：</Text>
          <Text style={styles.value}>Impact：{scores.impact}</Text>
          <Text style={styles.value}>Communication：{scores.communication}</Text>
          <Text style={styles.value}>Innovation：{scores.innovation}</Text>
          <Text style={styles.value}>Knowledge：{scores.knowledge}</Text>
          <Text style={styles.value}>总分：{total}</Text>
        </View>

        {/* 职级 */}
        <View style={styles.section}>
          <Text style={styles.label}>职位等级：</Text>
          <Text style={styles.value}>P{positionClass}</Text>
        </View>
      </Page>
    </Document>
  );
}
