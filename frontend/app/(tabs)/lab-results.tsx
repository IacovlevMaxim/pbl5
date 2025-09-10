import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function LabResultsView() {
  const labResults = [
    {
      id: 1,
      test: "Complete Blood Count (CBC)",
      date: "2024-09-03",
      status: "normal",
      doctor: "Dr. Sarah Johnson",
      new: true,
      urgent: false,
      results: [
        { name: "White Blood Cells", value: "7.2", unit: "K/μL", range: "4.0-10.0", status: "normal" },
        { name: "Red Blood Cells", value: "4.8", unit: "M/μL", range: "4.2-5.4", status: "normal" },
        { name: "Hemoglobin", value: "14.2", unit: "g/dL", range: "12.0-16.0", status: "normal" },
        { name: "Platelets", value: "285", unit: "K/μL", range: "150-450", status: "normal" }
      ]
    },
    {
      id: 2,
      test: "Lipid Panel",
      date: "2024-08-28",
      status: "abnormal",
      doctor: "Dr. Michael Chen",
      new: false,
      urgent: true,
      results: [
        { name: "Total Cholesterol", value: "245", unit: "mg/dL", range: "<200", status: "high" },
        { name: "LDL Cholesterol", value: "165", unit: "mg/dL", range: "<100", status: "high" },
        { name: "HDL Cholesterol", value: "42", unit: "mg/dL", range: ">40", status: "normal" },
        { name: "Triglycerides", value: "190", unit: "mg/dL", range: "<150", status: "high" }
      ]
    },
    {
      id: 3,
      test: "Thyroid Function Panel",
      date: "2024-08-15",
      status: "normal",
      doctor: "Dr. Lisa Wang",
      new: false,
      urgent: false,
      results: [
        { name: "TSH", value: "2.1", unit: "mIU/L", range: "0.4-4.0", status: "normal" },
        { name: "Free T4", value: "1.3", unit: "ng/dL", range: "0.8-1.8", status: "normal" },
        { name: "Free T3", value: "3.2", unit: "pg/mL", range: "2.3-4.2", status: "normal" }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <Feather name="check-circle" size={20} color="#4F8EF7" />;
      case "abnormal":
        return <Feather name="alert-circle" size={20} color="#E53935" />;
      default:
        return <Feather name="file-text" size={20} color="#888" />;
    }
  };

  const getResultStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return { color: "#4F8EF7" };
      case "high":
        return { color: "#E53935" };
      case "low":
        return { color: "#FFC107" };
      default:
        return { color: "#888" };
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Lab Results</Text>
            <Text style={styles.headerSubtitle}>View and manage your test results</Text>
          </View>
          <View style={styles.headerIcon}>
            <Feather name="file-text" size={24} color="#4F8EF7" />
          </View>
        </View>
      </View>

      {/* Results List */}
      <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        {labResults.map((result) => (
          <View key={result.id} style={styles.resultCard}>
            {result.urgent && (
              <View style={styles.urgentBanner}>
                <Feather name="alert-circle" size={16} color="#E53935" style={{ marginRight: 6 }} />
                <Text style={styles.urgentText}>Requires attention - Contact your doctor</Text>
              </View>
            )}
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                {getStatusIcon(result.status)}
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.testTitle}>{result.test}</Text>
                  <Text style={styles.testSub}>Ordered by {result.doctor}</Text>
                  <Text style={styles.testSub}>Date: {result.date}</Text>
                </View>
              </View>
              <View style={styles.badgeRow}>
                {result.new && (
                  <View style={styles.badgeNew}>
                    <Text style={styles.badgeNewText}>New</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.badge,
                    result.status === "normal"
                      ? { backgroundColor: "#4F8EF7" }
                      : { backgroundColor: "#E53935" }
                  ]}
                >
                  <Text style={styles.badgeText}>{result.status}</Text>
                </View>
              </View>
            </View>
            {/* Individual Results */}
            <View style={{ marginBottom: 12 }}>
              {result.results.map((item, idx) => (
                <View key={idx} style={styles.resultRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.resultName}>{item.name}</Text>
                    <Text style={styles.resultRange}>Normal: {item.range}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={[styles.resultValue, getResultStatusColor(item.status)]}>
                      {item.value} {item.unit}
                    </Text>
                    <Text style={styles.resultStatus}>{item.status}</Text>
                  </View>
                </View>
              ))}
            </View>
            {/* Actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="download" size={16} color="#4F8EF7" style={{ marginRight: 6 }} />
                <Text style={styles.actionText}>Download PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="share" size={16} color="#4F8EF7" style={{ marginRight: 6 }} />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="trending-up" size={16} color="#4F8EF7" style={{ marginRight: 6 }} />
                <Text style={styles.actionText}>Trends</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Feather name="alert-circle" size={24} color="#4F8EF7" style={{ marginRight: 10, marginTop: 2 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.infoCardTitle}>Understanding Your Results</Text>
          <Text style={styles.infoCardDesc}>
            Results marked as "abnormal" don't always indicate a serious problem.
            Always consult with your healthcare provider for proper interpretation.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  header: {
    backgroundColor: "#dbeafe",
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#222", marginBottom: 4 },
  headerSubtitle: { color: "#888", fontSize: 15 },
  headerIcon: {
    width: 48, height: 48, backgroundColor: "#e3e8f0", borderRadius: 24,
    alignItems: "center", justifyContent: "center"
  },
  resultCard: {
    backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 24,
    shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, elevation: 2
  },
  urgentBanner: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#FDECEA",
    padding: 8, borderRadius: 8, marginBottom: 8
  },
  urgentText: { color: "#E53935", fontWeight: "bold", fontSize: 13 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  cardHeaderLeft: { flexDirection: "row", alignItems: "flex-start" },
  testTitle: { fontWeight: "bold", fontSize: 16, color: "#222" },
  testSub: { fontSize: 13, color: "#888" },
  badgeRow: { flexDirection: "row", alignItems: "center" },
  badgeNew: {
    backgroundColor: "#FFC107", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginRight: 6
  },
  badgeNewText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  badge: {
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4,
    alignItems: "center", justifyContent: "center"
  },
  badgeText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  resultRow: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#e3e8f0",
    borderRadius: 8, padding: 10, marginBottom: 6
  },
  resultName: { fontWeight: "bold", fontSize: 14, color: "#222" },
  resultRange: { fontSize: 12, color: "#888" },
  resultValue: { fontWeight: "bold", fontSize: 15 },
  resultStatus: { fontSize: 12, color: "#888", textTransform: "capitalize" },
  actionsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  actionButton: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#fff",
    borderRadius: 8, padding: 10, flex: 1, marginHorizontal: 2, borderWidth: 1, borderColor: "#e3e8f0"
  },
  actionText: { color: "#222", fontWeight: "bold", fontSize: 13 },
  infoCard: {
    flexDirection: "row", alignItems: "flex-start", backgroundColor: "#dbeafe",
    borderRadius: 12, padding: 16, margin: 16
  },
  infoCardTitle: { fontWeight: "bold", color: "#4F8EF7", fontSize: 16, marginBottom: 4 },
  infoCardDesc: { color: "#222", fontSize: 13 }
});