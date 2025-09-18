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
    <div className="p-6 rounded-lg border my-6">
      <h3 className="text-lg font-semibold mb-4">AUTH_SECRET Generator</h3>
      <p className="text-sm mb-4">
        Generate a cryptographically secure 32-byte base64url-encoded secret for
        your Keyloom configuration.
      </p>

      <div className="space-y-4">
        <button
          onClick={generateSecret}
          className="inline-flex items-center px-4 py-2font-medium rounded-md transition-colors"
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
              <div className="rounded-lg p-3 font-mono text-sm break-all">
                {secret}
              </div>
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-1.5 rounded transition-colors"
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
              <div className="flex items-center text-sm">
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

            <div className="text-xs rounded-lg p-3">
              <strong>Usage:</strong> Add this to your{" "}
              <code className="px-1 rounded">.env.local</code> file:
              <br />
              <code className="block mt-1 font-mono">AUTH_SECRET={secret}</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
