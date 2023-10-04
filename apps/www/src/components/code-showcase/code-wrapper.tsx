"use client";

import { useState } from "react";
import { CodeWindow } from "./code-window";
import get from "lodash/get";
import styles from "./code.module.css";
const CodeWrapper = () => {
  const codeHighlights = {
    nextui: "6-19",
    modern: "26-39",
    elegant: "46-59",
    retro: "66-84",
  };
  const code = `
  import LogLifrom "@loglib/tracker/react";     
  export default function RootLayout({   ${'                               '}
    children, 
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body>
          <LogLib
            config={
              {
               id: //your website Id
              }
            }
          />
          {children}
        </body>
      </html>
    );
  }`;
  return (
    <div className="relative">
      <div className={styles.content}></div>
      <div className={styles.main}></div>
      <CodeWindow
        showWindowIcons
        className="max-h-[700px] min-h-[650px] max-w-[700px] min-w-[900px] bg-gradient-to-br from-transprent border-2 via-transparent to-orange-600"
        highlightLines={get(codeHighlights, codeHighlights.retro)}
        isScrollable={false}
        showCopy={true}
        showLineNumbers={true}
        language="jsx"
        title="App.js"
        value={code}
      />
      
      <div className={styles.content}></div>
      <div className={styles.main}></div>
    </div>
  );
};

export default CodeWrapper;
