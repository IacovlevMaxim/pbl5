import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function AppointmentsView() {
  const appointments = [
    {
      id: 1,
      date: "2024-09-08",
      time: "10:30 AM",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      location: "Main Hospital - Room 205",
      status: "confirmed",
      type: "Follow-up Consultation",
      preparation: "Bring previous ECG reports"
    },
    {
      id: 2,
      date: "2024-09-15",
      time: "2:00 PM",
      doctor: "LabCorp Diagnostics",
      specialty: "Laboratory",
      location: "Downtown Lab Center",
      status: "scheduled",
      type: "Blood Work - Comprehensive Panel",
      preparation: "Fast for 12 hours before test"
    },
    {
      id: 3,
      date: "2024-09-22",
      time: "3:30 PM",
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      location: "Skin Care Clinic",
      status: "pending",
      type: "Annual Skin Check",
      preparation: "Remove nail polish and makeup"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return { backgroundColor: "#4F8EF7" };
      case "scheduled":
        return { backgroundColor: "#4F8EF7" };
      case "pending":
        return { backgroundColor: "#FFC107" };
      default:
        return { backgroundColor: "#888" };
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>My Appointments</Text>
            <Text style={styles.headerSubtitle}>Manage your healthcare schedule</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Feather name="plus" size={24} color="#4F8EF7" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Appointment List */}
      <View style={{ marginHorizontal: 16, marginTop: 16 }}>
        {appointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.cardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.typeTitle}>{appointment.type}</Text>
                <Text style={styles.doctorText}>{appointment.doctor}</Text>
                <Text style={styles.specialtyText}>{appointment.specialty}</Text>
              </View>
              <View style={[styles.badge, getStatusColor(appointment.status)]}>
                <Text style={styles.badgeText}>{appointment.status}</Text>
              </View>
            </View>
            <View style={{ marginBottom: 12 }}>
              <View style={styles.infoRow}>
                <Feather name="calendar" size={16} color="#4F8EF7" style={{ marginRight: 6 }} />
                <Text style={styles.infoText}>{appointment.date}</Text>
              </View>
              <View style={styles.infoRow}>
                <Feather name="clock" size={16} color="#4F8EF7" style={{ marginRight: 6 }} />
                <Text style={styles.infoText}>{appointment.time}</Text>
              </View>
              <View style={styles.infoRow}>
                <Feather name="map-pin" size={16} color="#4F8EF7" style={{ marginRight: 6 }} />
                <Text style={styles.infoText}>{appointment.location}</Text>
              </View>
            </View>
            {appointment.preparation && (
              <View style={styles.prepCard}>
                <Text style={styles.prepTitle}>Preparation Required:</Text>
                <Text style={styles.prepText}>{appointment.preparation}</Text>
              </View>
            )}
            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="phone" size={16} color="#4F8EF7" style={{ marginRight: 6 }} />
                <Text style={styles.actionText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Book New Appointment */}
      <View style={styles.bookCard}>
        <Feather name="calendar" size={48} color="#4F8EF7" style={{ alignSelf: "center", marginBottom: 12 }} />
        <Text style={styles.bookTitle}>Need a New Appointment?</Text>
        <Text style={styles.bookDesc}>Book with your preferred healthcare provider</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Feather name="plus" size={16} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.bookButtonText}>Book New Appointment</Text>
        </TouchableOpacity>
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
  addButton: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: "#e3e8f0",
    alignItems: "center", justifyContent: "center"
  },
  appointmentCard: {
    backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 24,
    shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, elevation: 2
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
  typeTitle: { fontWeight: "bold", fontSize: 16, color: "#222" },
  doctorText: { fontSize: 13, color: "#888" },
  specialtyText: { fontSize: 13, color: "#888" },
  badge: {
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4,
    alignItems: "center", justifyContent: "center"
  },
  badgeText: { color: "#fff", fontWeight: "bold", fontSize: 12, textTransform: "capitalize" },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  infoText: { fontSize: 14, color: "#222" },
  prepCard: {
    backgroundColor: "#FFF8E1", borderRadius: 8, padding: 10, marginBottom: 12
  },
  prepTitle: { color: "#FFC107", fontWeight: "bold", fontSize: 13, marginBottom: 2 },
  prepText: { color: "#222", fontSize: 13 },
  actionsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  actionButton: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#fff",
    borderRadius: 8, padding: 10, flex: 1, marginHorizontal: 2, borderWidth: 1, borderColor: "#e3e8f0"
  },
  actionText: { color: "#222", fontWeight: "bold", fontSize: 13 },
  bookCard: {
    backgroundColor: "#dbeafe", borderRadius: 12, alignItems: "center", padding: 24, margin: 16
  },
  bookTitle: { fontWeight: "bold", color: "#4F8EF7", fontSize: 16, marginBottom: 4 },
  bookDesc: { color: "#888", fontSize: 13, marginBottom: 12, textAlign: "center" },
  bookButton: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#4F8EF7",
    borderRadius: 8, paddingHorizontal: 18, paddingVertical: 10, marginTop: 8
  },
  bookButtonText: { color: "#fff", fontWeight: "bold", fontSize: 15 }
});