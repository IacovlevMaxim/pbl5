import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function MedicalHistoryView() {
  const medicalHistory = [
    {
      id: 1,
      date: "2024-08-15",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      visitType: "Follow-up",
      diagnosis: "Hypertension - Well Controlled",
      summary: "Blood pressure stable on current medication. Continue monitoring.",
      recommendations: [
        "Continue current medication (Lisinopril 10mg daily)",
        "Regular exercise 30 min/day",
        "Low sodium diet",
        "Follow-up in 3 months"
      ],
      prescriptions: [
        { name: "Lisinopril", dosage: "10mg", frequency: "Daily", duration: "90 days" }
      ]
    },
    {
      id: 2,
      date: "2024-07-22",
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      visitType: "Consultation",
      diagnosis: "Seborrheic Dermatitis",
      summary: "Mild skin condition affecting scalp and face. Responding well to treatment.",
      recommendations: [
        "Use medicated shampoo 2-3 times per week",
        "Apply topical cream as directed",
        "Avoid harsh soaps and detergents",
        "Return if symptoms worsen"
      ],
      prescriptions: [
        { name: "Ketoconazole Shampoo", dosage: "2%", frequency: "2-3x weekly", duration: "30 days" },
        { name: "Hydrocortisone Cream", dosage: "1%", frequency: "Twice daily", duration: "14 days" }
      ]
    },
    {
      id: 3,
      date: "2024-06-10",
      doctor: "Dr. Lisa Wang",
      specialty: "Endocrinology",
      visitType: "Annual Check-up",
      diagnosis: "Type 2 Diabetes - Good Control",
      summary: "HbA1c levels improved. Diabetes management is effective.",
      recommendations: [
        "Continue current diabetes medication",
        "Monitor blood glucose daily",
        "Maintain healthy diet and exercise",
        "Annual eye exam scheduled"
      ],
      prescriptions: [
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "90 days" },
        { name: "Glucose test strips", dosage: "-", frequency: "As needed", duration: "30 days" }
      ]
    }
  ];

  const getVisitTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'follow-up': return { backgroundColor: "#4F8EF7" };
      case 'consultation': return { backgroundColor: "#4F8EF7" };
      case 'annual check-up': return { backgroundColor: "#FFC107" };
      case 'emergency': return { backgroundColor: "#E53935" };
      default: return { backgroundColor: "#888" };
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Medical History</Text>
            <Text style={styles.headerSubtitle}>Your complete healthcare timeline</Text>
          </View>
          <View style={styles.headerIcon}>
            <Feather name="file-text" size={24} color="#4F8EF7" />
          </View>
        </View>
      </View>

      {/* Timeline */}
      <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        {medicalHistory.map((visit, index) => (
          <View key={visit.id} style={{ marginBottom: 32 }}>
            {/* Timeline Line */}
            {index !== medicalHistory.length - 1 && (
              <View style={styles.timelineLine} />
            )}
            <View style={styles.timelineCard}>
              {/* Timeline Dot */}
              <View style={styles.timelineDot} />
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <Feather name="user" size={20} color="#4F8EF7" style={{ marginTop: 2 }} />
                  <View style={{ marginLeft: 8 }}>
                    <Text style={styles.doctorName}>{visit.doctor}</Text>
                    <Text style={styles.specialty}>{visit.specialty}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                      <Feather name="calendar" size={16} color="#888" />
                      <Text style={styles.visitDate}>{visit.date}</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.badge, getVisitTypeColor(visit.visitType)]}>
                  <Text style={styles.badgeText}>{visit.visitType}</Text>
                </View>
              </View>
              {/* Diagnosis */}
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.sectionLabel}>Diagnosis</Text>
                <Text style={styles.diagnosis}>{visit.diagnosis}</Text>
              </View>
              {/* Summary */}
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.sectionLabel}>Visit Summary</Text>
                <Text style={styles.summary}>{visit.summary}</Text>
              </View>
              {/* Recommendations */}
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.sectionLabel}>Recommendations</Text>
                {visit.recommendations.map((rec, idx) => (
                  <View key={idx} style={styles.recommendationRow}>
                    <View style={styles.recommendationDot} />
                    <Text style={styles.recommendationText}>{rec}</Text>
                  </View>
                ))}
              </View>
              {/* Prescriptions */}
              {visit.prescriptions.length > 0 && (
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                    <Feather name="pill" size={16} color="#4F8EF7" />
                    <Text style={[styles.sectionLabel, { marginLeft: 6 }]}>Prescriptions</Text>
                  </View>
                  {visit.prescriptions.map((prescription, idx) => (
                    <View key={idx} style={styles.prescriptionCard}>
                      <View>
                        <Text style={styles.prescriptionName}>{prescription.name}</Text>
                        <Text style={styles.prescriptionDetails}>
                          {prescription.dosage} - {prescription.frequency}
                        </Text>
                      </View>
                      <View style={styles.badgeOutline}>
                        <Text style={styles.badgeOutlineText}>{prescription.duration}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Feather name="alert-circle" size={24} color="#4F8EF7" style={{ marginRight: 10, marginTop: 2 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.infoCardTitle}>Medical Records</Text>
          <Text style={styles.infoCardDesc}>
            This history is automatically updated from your healthcare providers. 
            For complete records, contact your healthcare facility directly.
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
  timelineLine: {
    position: "absolute", left: 16, top: 48, width: 2, height: 48, backgroundColor: "#e3e8f0", zIndex: -1
  },
  timelineCard: {
    backgroundColor: "#fff", borderRadius: 12, padding: 16, marginLeft: 16,
    shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
    position: "relative"
  },
  timelineDot: {
    position: "absolute", left: -24, top: 24, width: 16, height: 16,
    backgroundColor: "#4F8EF7", borderRadius: 8, borderWidth: 2, borderColor: "#fff"
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  cardHeaderLeft: { flexDirection: "row", alignItems: "flex-start" },
  doctorName: { fontWeight: "bold", fontSize: 16, color: "#222" },
  specialty: { fontSize: 13, color: "#888" },
  visitDate: { fontSize: 13, color: "#888", marginLeft: 6 },
  badge: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12,
    alignItems: "center", justifyContent: "center"
  },
  badgeText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  sectionLabel: { fontWeight: "bold", color: "#222", fontSize: 15, marginBottom: 4 },
  diagnosis: { backgroundColor: "#e3e8f0", padding: 10, borderRadius: 8, fontSize: 14, color: "#222" },
  summary: { color: "#888", fontSize: 14 },
  recommendationRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 4 },
  recommendationDot: {
    width: 8, height: 8, backgroundColor: "#4F8EF7", borderRadius: 4, marginTop: 6, marginRight: 8
  },
  recommendationText: { color: "#888", fontSize: 14, flex: 1 },
  prescriptionCard: {
    backgroundColor: "#e3e8f0", borderRadius: 8, padding: 10, flexDirection: "row",
    justifyContent: "space-between", alignItems: "center", marginBottom: 6
  },
  prescriptionName: { fontWeight: "bold", fontSize: 14, color: "#222" },
  prescriptionDetails: { fontSize: 12, color: "#888" },
  badgeOutline: {
    borderWidth: 1, borderColor: "#4F8EF7", borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 2
  },
  badgeOutlineText: { color: "#4F8EF7", fontWeight: "bold", fontSize: 12 },
  infoCard: {
    flexDirection: "row", alignItems: "flex-start", backgroundColor: "#dbeafe",
    borderRadius: 12, padding: 16, margin: 16
  },
  infoCardTitle: { fontWeight: "bold", color: "#4F8EF7", fontSize: 16, marginBottom: 4 },
  infoCardDesc: { color: "#222", fontSize: 13 }
});