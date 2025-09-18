"use client";

import { useState } from "react";

export function AuthSecretGenerator() {
  const [secret, setSecret] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const generateSecret = () => {
    // Generate 32 random bytes and convert to base64url
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);

    // Convert to base64url format
    const base64 = btoa(String.fromCharCode(...array))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    setSecret(base64);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (secret) {
      try {
        await navigator.clipboard.writeText(secret);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
      }
    }
  };

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 my-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
        AUTH_SECRET Generator
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
        Generate a cryptographically secure 32-byte base64url-encoded secret for
        your Keyloom configuration.
      </p>

      <div className="space-y-4">
        <button
          onClick={generateSecret}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Generate New Secret
        </button>

        {secret && (
          <div className="space-y-3">
            <div className="relative">
              <div className="bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700 rounded-lg p-3 font-mono text-sm break-all">
                {secret}
              </div>
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {copied && (
              <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied to clipboard!
              </div>
            )}

            <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded-lg p-3">
              <strong>Usage:</strong> Add this to your{" "}
              <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">
                .env.local
              </code>{" "}
              file:
              <br />
              <code className="block mt-1 font-mono">AUTH_SECRET={secret}</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
