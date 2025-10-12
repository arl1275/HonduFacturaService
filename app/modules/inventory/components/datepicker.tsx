import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Platform, StyleSheet } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

type props = {
  SendTimeFormta: (value: string, DatePicked: Date, IsType: boolean) => void;
  DateSetted: Date | string | number | null;
};

const Datepikcker = ({ SendTimeFormta, DateSetted }: props) => {
  const [date, setDate] = useState<Date>(new Date());
  const [show, setShow] = useState(false);

  const normalizeToDate = (v: Date | string | number): Date => {
    const d = v instanceof Date ? v : new Date(v);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShow(false);
    if (event.type === "set" && selectedDate) {
      const d = normalizeToDate(selectedDate);
      setDate(d);
      SendTimeFormta("expiration_date", d, false);
    }
  };

  const openPicker = () => setShow(true);

  const formatDate = (d?: Date) => {
    if (!(d instanceof Date) || isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  };

  useEffect(() => {
    if (DateSetted != null) {
      setDate(normalizeToDate(DateSetted));
    }
  }, [DateSetted]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha seleccionada</Text>
      <Pressable style={styles.button} onPress={openPicker}>
        <Text style={styles.buttonText}>{formatDate(date)}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.select({ ios: "spinner", android: "calendar" })}
          onChange={onChange}
          minimumDate={new Date(2020, 0, 1)}
          maximumDate={new Date(2100, 11, 31)}
        />
      )}
    </View>
  );
};

export default Datepikcker;

const styles = StyleSheet.create({
  container: { gap: 8, padding: 12 },
  label: { fontSize: 14, opacity: 0.7 },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    alignSelf: "flex-start",
  },
  buttonText: { fontSize: 16 },
});
