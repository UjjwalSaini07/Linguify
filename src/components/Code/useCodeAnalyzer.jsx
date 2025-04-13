"use client";

import { useState } from "react";

const useCodeAnalyzer = (apiEndpoint) => {
  const [Analyzerdata, setAnalyzerData] = useState(null);
  const [AnalyzerisLoading, setAnalyzerIsLoading] = useState(false);
  const [Analyzererror, setAnalyzerError] = useState(null);

  const Analyzersubmit = async (payload) => {
    setAnalyzerIsLoading(true);
    setAnalyzerError(null);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const text = await response.text();
      const result = text ? JSON.parse(text) : { message: "Empty response from server" };

      if (!result || typeof result !== "object") {
        throw new Error("Invalid response format");
      }

      setAnalyzerData(result);
    } catch (err) {
      console.error("Error:", err);
      setAnalyzerError(err);
    } finally {
      setAnalyzerIsLoading(false);
    }
  };

  return { Analyzerdata, Analyzersubmit, AnalyzerisLoading, Analyzererror };
};

export default useCodeAnalyzer;
