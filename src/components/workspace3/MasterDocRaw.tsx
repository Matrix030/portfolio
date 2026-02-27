"use client";

import { useState } from "react";
import masterDoc from "@/../public/master.json";

const FONT = '"CaskaydiaCove Nerd Font Mono", "JetBrains Mono", monospace';

// ---------------------------------------------------------------------------
// Tokenizer
// ---------------------------------------------------------------------------

type TokenType =
  | "key"
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "punctuation"
  | "whitespace";

interface Token {
  type: TokenType;
  value: string;
}

function tokenizeJSON(json: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < json.length) {
    const ch = json[i];

    // Whitespace
    if (/\s/.test(ch)) {
      let ws = "";
      while (i < json.length && /\s/.test(json[i])) ws += json[i++];
      tokens.push({ type: "whitespace", value: ws });
      continue;
    }

    // Punctuation
    if ("{}[]:,".includes(ch)) {
      tokens.push({ type: "punctuation", value: ch });
      i++;
      continue;
    }

    // String — could be a key or a value; we decide after
    if (ch === '"') {
      let str = '"';
      i++;
      while (i < json.length) {
        const c = json[i];
        str += c;
        if (c === "\\" && i + 1 < json.length) {
          i++;
          str += json[i];
        } else if (c === '"') {
          i++;
          break;
        }
        i++;
      }
      // Peek ahead past whitespace to see if a ':' follows → it's a key
      let j = i;
      while (j < json.length && /\s/.test(json[j])) j++;
      const isKey = json[j] === ":";
      tokens.push({ type: isKey ? "key" : "string", value: str });
      continue;
    }

    // Number
    if (ch === "-" || /\d/.test(ch)) {
      let num = "";
      while (i < json.length && /[-\d.eE+]/.test(json[i])) num += json[i++];
      tokens.push({ type: "number", value: num });
      continue;
    }

    // true / false / null
    if (json.startsWith("true", i)) {
      tokens.push({ type: "boolean", value: "true" });
      i += 4;
      continue;
    }
    if (json.startsWith("false", i)) {
      tokens.push({ type: "boolean", value: "false" });
      i += 5;
      continue;
    }
    if (json.startsWith("null", i)) {
      tokens.push({ type: "null", value: "null" });
      i += 4;
      continue;
    }

    // Fallback: unknown char — treat as punctuation
    tokens.push({ type: "punctuation", value: ch });
    i++;
  }

  return tokens;
}

const TOKEN_COLORS: Record<TokenType, string> = {
  key: "#8caaee",
  string: "#a6d189",
  number: "#ef9f76",
  boolean: "#ca9ee6",
  null: "#737994",
  punctuation: "#626880",
  whitespace: "inherit",
};

function SyntaxHighlight({ json }: { json: string }) {
  const tokens = tokenizeJSON(json);
  return (
    <pre
      style={{
        fontSize: "0.65rem",
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        background: "transparent",
        margin: 0,
        fontFamily: FONT,
      }}
    >
      {tokens.map((tok, i) => (
        <span key={i} style={{ color: TOKEN_COLORS[tok.type] }}>
          {tok.value}
        </span>
      ))}
    </pre>
  );
}

// ---------------------------------------------------------------------------
// CopyIcon — tiny SVG
// ---------------------------------------------------------------------------

function CopyIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="5" y="5" width="9" height="9" rx="1.5" />
      <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Shared button style
// ---------------------------------------------------------------------------

const btnBase: React.CSSProperties = {
  background: "#414559",
  border: "1px solid #51576d",
  borderRadius: 4,
  padding: "3px 10px",
  fontSize: "0.65rem",
  color: "#c6d0f5",
  cursor: "pointer",
  fontFamily: FONT,
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  gap: 4,
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const CURL_CMD = "curl https://rishikesh-gharat.vercel.app/master.json";
const JSON_STR = JSON.stringify(masterDoc, null, 2);

export default function MasterDocRaw() {
  const [copied, setCopied] = useState(false);
  const [curlCopied, setCurlCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(JSON_STR).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([JSON_STR], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "master.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCurlCopy() {
    navigator.clipboard.writeText(CURL_CMD).then(() => {
      setCurlCopied(true);
      setTimeout(() => setCurlCopied(false), 2000);
    });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          height: "2.5rem",
          background: "rgba(41,44,60,0.6)",
          borderBottom: "1px solid #51576d",
          padding: "0 0.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#737994", fontSize: "0.7rem" }}>
          master.json
        </span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button style={btnBase} onClick={handleCopy}>
            {copied ? "copied!" : "copy"}
          </button>
          <button style={btnBase} onClick={handleDownload}>
            download
          </button>
        </div>
      </div>

      {/* AI tip banner */}
      <div
        style={{
          padding: "0.45rem 0.75rem",
          background: "rgba(140,170,238,0.06)",
          borderBottom: "1px solid rgba(140,170,238,0.12)",
          flexShrink: 0,
          display: "flex",
          alignItems: "flex-start",
          gap: "0.5rem",
        }}
      >
        <span style={{ fontSize: "0.7rem", lineHeight: 1, marginTop: "0.05rem", flexShrink: 0 }}>
          ✦
        </span>
        <div>
          <span style={{ color: "#8caaee", fontSize: "0.68rem", fontWeight: 600 }}>
            AI-ready context
          </span>
          <span style={{ color: "#737994", fontSize: "0.68rem" }}>
            {" "}— curl or download this file and drop it into ChatGPT, Claude, or any LLM.
            Ask it anything about my background, projects, or skills.
          </span>
        </div>
      </div>

      {/* Curl block */}
      <div
        style={{
          padding: "0.5rem 0.75rem",
          background: "rgba(35,38,52,0.8)",
          borderBottom: "1px solid #414559",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#737994",
            marginBottom: "0.3rem",
          }}
        >
          curl endpoint
        </div>
        <div
          style={{
            background: "#414559",
            borderRadius: 5,
            padding: "0.4rem 0.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.7rem", color: "#a6d189" }}>
            {CURL_CMD}
          </span>
          <button
            onClick={handleCurlCopy}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: curlCopied ? "#a6d189" : "#737994",
              padding: "2px 4px",
              display: "flex",
              alignItems: "center",
              transition: "color 0.15s",
            }}
            title="Copy curl command"
          >
            <CopyIcon />
          </button>
        </div>
      </div>

      {/* JSON viewer */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.75rem",
          scrollbarWidth: "none",
        }}
      >
        <SyntaxHighlight json={JSON_STR} />
      </div>
    </div>
  );
}
