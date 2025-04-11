import { useState } from "react";
import axios from "axios";

const LANGUAGES = {
  python: "3.10.0",
  javascript: "18.15.0",
  java: "15.0.2",
  cpp: "10.2.0",
  typescript: "5.0.3",
};

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

function getFileExtension(language) {
  const extensions = {
    python: "py",
    javascript: "js",
    java: "java",
    cpp: "cpp",
    typescript: "ts",
  };
  return extensions[language] || "txt";
}

async function executeCode(language, sourceCode) {
  try {
    const response = await API.post("/execute", {
      language,
      version: LANGUAGES[language],
      files: [
        {
          name: `main.${getFileExtension(language)}`,
          content: sourceCode,
        },
      ],
      stdin: "",
      args: [],
      compile_timeout: 10000,
      run_timeout: 3000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    });

    return response.data;
  } catch (error) {
    console.error("Error executing code:", error);
    throw new Error("Error executing code");
  }
}

export default function Output({ language, sourceCode, setOutput }) {
  const [isLoading, setIsLoading] = useState(false);

  const runCode = async () => {
    if (!sourceCode) {
      setOutput({
        output: "No code available to run.",
        isError: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const { run: result } = await executeCode(language, sourceCode);

      setOutput({
        output: result.output || "Execution completed, but no output was returned.",
        isError: result.code !== 0,
      });
    } catch (error) {
      console.error("Error running code:", error);
      setOutput({
        output: error.message || "An unexpected error occurred.",
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={runCode}
        disabled={isLoading}
        style={{
          padding: "8px 16px",
          margin: "16px 0",
          borderRadius: "4px",
          border: "1px solid #333",
          background: isLoading ? "#ccc" : "#333",
          color: isLoading ? "#666" : "#fff",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
    </div>
  );
}
