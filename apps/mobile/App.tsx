import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function App() {
  const [amount, setAmount] = useState("");
  const [showQR, setShowQR] = useState(false);

  const handleGenerateQR = () => {
    if (amount && parseFloat(amount) > 0) {
      setShowQR(true);
    }
  };

  const handleReset = () => {
    setAmount("");
    setShowQR(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.brandName}>SafTap</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Merchant Mode</Text>
            </View>
          </View>

          {!showQR ? (
            <View style={styles.card}>
              <Text style={styles.label}>Enter Payment Amount</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.currencyPrefix}>KES</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  placeholderTextColor="#94a3b8"
                />
              </View>

              <TouchableOpacity
                style={[styles.button, !amount && styles.buttonDisabled]}
                onPress={handleGenerateQR}
                disabled={!amount}
              >
                <Text style={styles.buttonText}>Generate Payment QR</Text>
              </TouchableOpacity>
              
              <Text style={styles.infoText}>
                The tourist will scan this to pay in USDC. You receive KES instantly via M-PESA.
              </Text>
            </View>
          ) : (
            <View style={styles.qrCard}>
              <Text style={styles.qrTitle}>Scan to Pay</Text>
              <Text style={styles.qrAmount}>KES {parseFloat(amount).toLocaleString()}</Text>
              
              <View style={styles.qrPlaceholder}>
                <View style={styles.qrBox}>
                  {/* Placeholder for QR Code */}
                  <View style={styles.qrInnerBox} />
                  <Text style={styles.qrPlaceholderText}>QR Code Placeholder</Text>
                </View>
              </View>

              <Text style={styles.waitingText}>Waiting for payment...</Text>
              
              <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Cancel Transaction</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Connected to SafTap Settlement Engine</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -1,
  },
  badge: {
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  currencyPrefix: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 60,
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
  },
  button: {
    backgroundColor: "#0ea5e9",
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  infoText: {
    marginTop: 20,
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 20,
  },
  qrCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 8,
  },
  qrAmount: {
    fontSize: 36,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 32,
  },
  qrPlaceholder: {
    width: 240,
    height: 240,
    backgroundColor: "#f8fafc",
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  qrBox: {
    alignItems: "center",
  },
  qrInnerBox: {
    width: 120,
    height: 120,
    backgroundColor: "#e2e8f0",
    borderRadius: 8,
    marginBottom: 12,
  },
  qrPlaceholderText: {
    fontSize: 14,
    color: "#94a3b8",
    fontWeight: "500",
  },
  waitingText: {
    fontSize: 16,
    color: "#0ea5e9",
    fontWeight: "600",
    marginBottom: 24,
  },
  resetButton: {
    padding: 12,
  },
  resetButtonText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
});
