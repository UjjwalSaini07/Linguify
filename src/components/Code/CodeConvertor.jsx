"use client";

import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import { Button } from "../ui/button";
import Markdown from "react-markdown";
import { toast } from "sonner";
import { experimental_useObject as useObject } from "ai/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowRightIcon, Code2Icon, Copy, Loader } from "lucide-react";
import { DM_Mono } from "next/font/google";
import ShineBorder from "../magicui/shine-border";
import { BorderBeam } from "../magicui/border-beam";
import { useTheme } from "next-themes";
import Output from "./CodeOutput";
import useCodeAnalyzer from "./useCodeAnalyzer";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const font = DM_Mono({ subsets: ["latin"], weight: ["400"] });

const CodeConvertor = () => {
  const { object, submit, isLoading, error } = useObject({
    api: "/api/genaiCodeConvertor",
    schema: {
      code: "",
      explanation: "",
    },
  });
  const { Analyzerdata, Analyzersubmit, AnalyzerisLoading, Analyzererror } =
    useCodeAnalyzer("/api/genaiCodeAnalyser");

  const theme = useTheme();
  const [result, setResult] = useState({ output: "", isError: false });
  const [sourceCode, setSourceCode] = useState("// Start writing your code here.");
  const [translatedCode, setTranslatedCode] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("javascript");
  const [translatedLanguage, setTranslatedLanguage] = useState("python");

  const prompted = `convert this code from ${sourceLanguage} to ${translatedLanguage} : \n ${sourceCode}`;

  const AnalyzerhandleSubmit = () => {
    Analyzersubmit({ sourceCode });
    toast.success("Scroll Down to Check the Code Analysis")
  };

  if (error) {
    toast.error("Failed to generate code");
  }

  function copy(text) {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  }

  return (
    <div
      className="max-w-screen px-2 min-h-screen w-full md:px-20 my-16"
      id="coder"
    >
      <div className="grid gap-20 grid-cols-1 sm:grid-cols-2 relative">
        <div className="flex flex-col">
          <div className="flex">
            <Select onValueChange={setSourceLanguage} defaultValue="javascript">
              <SelectTrigger className="rounded-e-none border-e-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="ada">Ada</SelectItem>
                <SelectItem value="assembly">Assembly</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="clojure">Clojure</SelectItem>
                <SelectItem value="cobol">COBOL</SelectItem>
                <SelectItem value="coffeescript">CoffeeScript</SelectItem>
                <SelectItem value="delphi">Delphi</SelectItem>
                <SelectItem value="erlang">Erlang</SelectItem>
                <SelectItem value="fsharp">F#</SelectItem>
                <SelectItem value="fortran">Fortran</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="groovy">Groovy</SelectItem>
                <SelectItem value="haskell">Haskell</SelectItem>
                <SelectItem value="julia">Julia</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="lisp">Lisp</SelectItem>
                <SelectItem value="lua">Lua</SelectItem>
                <SelectItem value="matlab">MATLAB</SelectItem>
                <SelectItem value="objective-c">Objective-C</SelectItem>
                <SelectItem value="pascal">Pascal</SelectItem>
                <SelectItem value="perl">Perl</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="powershell">PowerShell</SelectItem>
                <SelectItem value="r">R</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="scala">Scala</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="tcl">Tcl</SelectItem>
                <SelectItem value="vbnet">VB.NET</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={"outline"}
              className="rounded-s-none"
              size={"icon"}
              onClick={() => copy(sourceCode)}
            >
              <Copy />
            </Button>
          </div>
          <ShineBorder
            className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg p-0.5 bg-background shadow-md hover:shadow-xl transm dark:shadow-none"
            color={theme.theme === "light" ? "black" : ["white", "#c9c9c9"]}
          >
            <div className="rounded-b-lg overflow-hidden w-full">
              <CodeEditor
                language={sourceLanguage}
                value={sourceCode}
                onChange={(value) => setSourceCode(value)}
              />
            </div>
            <BorderBeam
              duration={10}
              size={500}
              className="from-transparent via-[#08fd5d] to-transparent"
            />
          </ShineBorder>
        </div>
        <button
          type="button"
          title="convert"
          onClick={() => {
            submit(prompted);
          }}
          disabled={isLoading}
          className="overflow-hidden absolute top-1/2 md:top-2/5 left-1/4 md:left-1/2 -translate-x-1/2 -translate-y-1/2  w-36 p-2 h-12 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 border text-white rounded-md text-xl font-semibold cursor-pointer z-10 group disabled:opacity-65 flex items-center justify-center active:scale-95"
        >
          Convert!{" "}
          {isLoading ? (
            <>
              <Loader className="animate-spin ml-2" />
            </>
          ) : (
            <>
              <ArrowRightIcon className="ml-2 size-6" />
            </>
          )}
          <span className="absolute w-40 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
          <span className="absolute w-40 h-32 -top-8 -left-2 bg-primary/40 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
          <span className="absolute w-40 h-32 -top-8 -left-2 bg-primary rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
          <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10 flex items-center justify-center text-black">
            {isLoading ? (
              <>
                <Loader className="animate-spin ml-8" />
              </>
            ) : (
              <>
                Code <Code2Icon className="ml-2" />
              </>
            )}
          </span>
        </button>
        <button
          type="button"
          title="AnalyserCode"
          onClick={AnalyzerhandleSubmit}
          disabled={AnalyzerisLoading}
          className="overflow-hidden absolute top-1/2 md:top-3/5 left-3/4 md:left-1/2 -translate-x-1/2 -translate-y-1/2  w-36 p-2 h-12 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 border text-white rounded-md text-xl font-semibold cursor-pointer z-10 group disabled:opacity-65 flex items-center justify-center active:scale-95"
        >
          Analyse!{" "}
          {AnalyzerisLoading ? (
            <>
              <Loader className="animate-spin ml-2"/>
            </>
          ) : (
            <>
              <ArrowRightIcon className="ml-2 size-6" />
            </>
          )}
          <span className="absolute w-40 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
          <span className="absolute w-40 h-32 -top-8 -left-2 bg-primary/40 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
          <span className="absolute w-40 h-32 -top-8 -left-2 bg-primary rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
          <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10 flex items-center justify-center text-black">
            {AnalyzerisLoading ? (
              <>
                <Loader className="animate-spin ml-8" />
              </>
            ) : (
              <>
                Code <Code2Icon className="ml-2" />
              </>
            )}
          </span>
        </button>
        <div className="flex flex-col">
          <div className="flex">
            <Select onValueChange={setTranslatedLanguage} defaultValue="python">
              <SelectTrigger className="rounded-e-none border-e-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="ada">Ada</SelectItem>
                <SelectItem value="assembly">Assembly</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="clojure">Clojure</SelectItem>
                <SelectItem value="cobol">COBOL</SelectItem>
                <SelectItem value="coffeescript">CoffeeScript</SelectItem>
                <SelectItem value="delphi">Delphi</SelectItem>
                <SelectItem value="erlang">Erlang</SelectItem>
                <SelectItem value="fsharp">F#</SelectItem>
                <SelectItem value="fortran">Fortran</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="groovy">Groovy</SelectItem>
                <SelectItem value="haskell">Haskell</SelectItem>
                <SelectItem value="julia">Julia</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="lisp">Lisp</SelectItem>
                <SelectItem value="lua">Lua</SelectItem>
                <SelectItem value="matlab">MATLAB</SelectItem>
                <SelectItem value="objective-c">Objective-C</SelectItem>
                <SelectItem value="pascal">Pascal</SelectItem>
                <SelectItem value="perl">Perl</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="powershell">PowerShell</SelectItem>
                <SelectItem value="r">R</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="scala">Scala</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="tcl">Tcl</SelectItem>
                <SelectItem value="vbnet">VB.NET</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={"outline"}
              className="rounded-s-none"
              size={"icon"}
              onClick={() => copy(object?.code || translatedCode)}
            >
              <Copy />
            </Button>
          </div>
          <ShineBorder
            className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg p-0.5 bg-background shadow-md hover:shadow-xl transm dark:shadow-none"
            color={theme.theme === "light" ? "black" : ["white", "#88f7ab"]}
          >
            <div className="rounded-b-lg w-full overflow-hidden">
              <CodeEditor
                language={translatedLanguage}
                value={object?.code || ""}
                onChange={(value) => setTranslatedCode(value)}
              />
              <BorderBeam
              duration={10}
              size={500}
              className="from-transparent via-[#22d3ee] to-transparent"
            />
            </div>
          </ShineBorder>
        </div>
      </div>
      {object?.explanation && (
        <div className="mt-6 p-4 md:p-10 mx-auto border-2 border-dashed rounded-2xl border-s-primary shadow-lg max-w-7xl backdrop-blur-sm bg-transparent">
          <h1 className="text-2xl md:text-4xl font-semibold text-primary mb-4">
            Explanation:
          </h1>
          <div
            className={`${font.className} text-lg leading-relaxed text-gray-400 break-words`}
          >
            <Markdown>{object.explanation || "Nothing...."}</Markdown>
          </div>
        </div>
      )}
      {Analyzerdata && (
        <div className="mt-6 p-4 md:p-10 mx-auto border-2 border-dashed rounded-2xl border-s-primary shadow-lg max-w-7xl backdrop-blur-sm bg-transparent">
          <h1 className="text-2xl md:text-4xl font-semibold text-primary mb-4">
            Code Analyser:
          </h1>
          <div
            className={`${font.className} text-lg leading-relaxed text-gray-400 break-words`}
          >
            {Analyzerdata.errors?.length > 0 && (
              <>
                <h3 className="text-lg md:text-xl font-semibold text-primary">
                  Errors:
                </h3>
                <ul>
                  {Analyzerdata.errors.map((err, index) => (
                    <li key={index}>
                      <Markdown>{err}</Markdown>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {Analyzerdata.corrections?.length > 0 && (
              <>
                <h3 className="text-lg md:text-xl font-semibold text-primary mt-5">
                  Corrections:
                </h3>
                <ul>
                  {Analyzerdata.corrections.map((correction, index) => (
                    <li key={index}>
                      <Markdown>{correction}</Markdown>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {Analyzerdata.explanations?.length > 0 && (
              <>
                <h3 className="text-lg md:text-xl font-semibold text-primary mt-5">
                  Explanations:
                </h3>
                <ul>
                  {Analyzerdata.explanations.map((explanation, index) => (
                    <li key={index}>
                      <Markdown>{explanation}</Markdown>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
      {Analyzererror && (
        <p className="text-red-500 mt-4 text-center">
          Error: {Analyzererror.message}
        </p>
      )}
      <div className="mt-6 p-4 md:p-10 mx-auto border-2 border-dashed rounded-2xl border-s-primary shadow-lg max-w-7xl backdrop-blur-sm bg-transparent">
        <h1 className="text-2xl md:text-4xl font-semibold text-primary mb-4">
          Output:
        </h1>
        <Output
          language={sourceLanguage}
          sourceCode={sourceCode}
          setOutput={setResult}
        />
        <div
          className={`p-4 md:p-6 justify-left text-left border-2 rounded-2xl ${
            result.isError
              ? "border-red-500 text-red-500"
              : 'theme.theme === "light" ? "text-black" : "text-white border-green-500'
          } shadow-lg max-w-7xl backdrop-blur-sm bg-transparent text-left`}
        >
          <h1 className="text-xl md:text-2xl font-semibold mb-4">Output:</h1>
          <div className="text-base leading-relaxed break-words whitespace-pre-wrap">
            {result.output || "Run code to see the output."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeConvertor;
