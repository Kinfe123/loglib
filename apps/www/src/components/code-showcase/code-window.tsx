"use client";
// Inspired by https://github.dev/modulz/stitches-site code demo
import React from "react";
import rangeParser from "parse-numeric-range";
import {useState} from 'react'
import Prism from 'prismjs';

import "prismjs/themes/prism-tomorrow.css";
import CodeBlock, {CodeBlockProps} from "./code-block";
import { Clipboard , ClipboardCheck } from "lucide-react";
import {useToast} from '@/components/ui/use-toast'
import { Toast } from "../ui/toast";


export interface CodeWindowProps extends CodeBlockProps {
  showCopy?: boolean;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({highlightLines, showCopy, ...props}) => {
  const wrapperRef = React.useRef<HTMLPreElement>(null);
  const [copied , setCopied ] = useState(false)
  const toast = useToast()
  const showToaster = () => {
    toast.toast({
      description: "✅ Code Copied.",
    })
    
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.value || "").then(
      () => {
        setCopied(true);
        toast.toast({
          description: "✅ Code Copied.",
        })
       
        // changing back to default state after 2 seconds.
        setTimeout(() => {
          setCopied(false);
          toast.dismiss()
        }, 2000);
      },
      (err) => {
        console.log("failed to copy", err.mesage);
      }
    );
  };
  React.useEffect(() => {
    const pre = wrapperRef.current;

    if (!pre) return;
    const PADDING = 15;
    let codeInner = pre.querySelector("code") ?? null;
    const codeBlockHeight = pre.clientHeight - PADDING * 2;


    const lines = pre.querySelectorAll<HTMLElement>(".highlight-line");

    if (!highlightLines) {
      lines.forEach((line) => {
        line.classList.remove("off");
      });

      if (codeInner) {
        codeInner.style.transform = `translate3d(0, 0, 0)`;
      }

      return;
    }

    const linesToHighlight = rangeParser(highlightLines);

    const firstLineNumber = Math.max(0, linesToHighlight[0] - 1);
    const lastLineNumber = Math.min(lines.length - 1, [...linesToHighlight].reverse()[0] - 1);
    const firstLine = lines[firstLineNumber];
    const lastLine = lines[lastLineNumber];

    // Prevent errors in case the right line doesn't exist
    if (!firstLine || !lastLine) {
      // eslint-disable-next-line no-console
      console.warn(`CodeWindow: Error finding the right line`);

      return;
    }

    const linesHeight = lastLine.offsetTop - firstLine.offsetTop;

    const maxDistance = (codeInner?.clientHeight || 0) - codeBlockHeight;

    const codeFits = linesHeight < codeBlockHeight;
    const lastLineIsBelow = lastLine.offsetTop > codeBlockHeight - PADDING;
    const lastLineIsAbove = !lastLineIsBelow;

    let translateY = 0;

    if (codeFits && lastLineIsAbove) {
      translateY = 0;
    } else if (codeFits && lastLineIsBelow) {
      const dist = firstLine.offsetTop - (codeBlockHeight - linesHeight) / 2;

      translateY = dist > maxDistance ? maxDistance : dist;
    } else {
      translateY = firstLine.offsetTop;
    }

    lines.forEach((line, i) => {
      const lineIndex = i + 1;

      if (linesToHighlight.includes(lineIndex)) {
        line.setAttribute("data-highlighted", "true");
      } else {
        line.setAttribute("data-highlighted", "false");
      }
    });

    requestAnimationFrame(
      () => codeInner && (codeInner.style.transform = `translate3d(0, ${-translateY}px, 0)`),
    );
  }, [highlightLines]);



  return (
    <div className="relative">
      <CodeBlock ref={wrapperRef} {...props} mode="typewriter"  />
      <div className="absolute right-4 top-2 z-10 text-gray-400 cursor-pointer" onClick={copyToClipboard}>
        {/* <CopyButton value={props.value} /> */}
    
        {copied ? <ClipboardCheck /> : <Clipboard />}
      </div>
    
    </div>
  );
};