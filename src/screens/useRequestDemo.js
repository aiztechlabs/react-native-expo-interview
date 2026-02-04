import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { fetchUserByKey } from "../api/fakeApi";
import { useRequest } from "../hooks/useRequest";

export default function UseRequestDemo() {
  const [key, setKey] = useState("1");
  const [shouldFail, setShouldFail] = useState(false);

  const fetcher = useCallback(
    () => fetchUserByKey(key, { shouldFail }),
    [key, shouldFail]
  );

  const { data, error, isLoading, refresh } = useRequest(key, fetcher, {
    staleTimeMs: 1500,
    enabled: true,
  });

  const raceTest = useCallback(() => {
    setKey("1");
    setTimeout(() => setKey("2"), 50);
    setTimeout(() => setKey("1"), 100);
  }, []);

  const pretty = useMemo(() => JSON.stringify(data, null, 2), [data]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>useRequest Demo</Text>

      <View style={{ gap: 6 }}>
        <Text>Key</Text>
        <TextInput
          value={key}
          onChangeText={setKey}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 8,
          }}
        />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text>Simulate error</Text>
        <Switch value={shouldFail} onValueChange={setShouldFail} />
      </View>

      <View style={{ gap: 8 }}>
        <Button title="REFRESH (BYPASS CACHE)" onPress={refresh} />
        <Button title="RACE TEST (1 → 2 → 1 FAST)" onPress={raceTest} />
      </View>

      <View style={{ paddingTop: 8, gap: 6 }}>
        <Text>isLoading: {String(isLoading)}</Text>
        <Text style={{ color: error ? "crimson" : "#333" }}>
          error: {error ? error.message : "null"}
        </Text>
        <Text>data:</Text>
        <Text selectable style={{ fontFamily: "monospace" }}>
          {pretty}
        </Text>
      </View>
    </ScrollView>
  );
}
