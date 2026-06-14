"use client";

import { useState } from "react";

interface AIPanelProps {
  pageType: string;
  content: string;
  currentTitle?: string;
  currentDescription?: string;
  currentKeywords?: string[];
  onApplyMeta: (title: string, description: string, keywords: string[]) => void;
}

export default function AIPanel({ pageType, content, currentTitle, currentDescription, currentKeywords, onApplyMeta }: AIPanelProps) {
  const [loading, setLoading] = useState(false);
  const [metaResult, setMetaResult] = useState<any>(null);
  const [seoResult, setSeoResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function generateMeta() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageType, content, keywords: currentKeywords?.join(", ") }),
      });
      const data = await res.json();
      setMetaResult(data);
    } catch (e: any) {
      setError(e.message || "Failed to generate");
    }
    setLoading(false);
  }

  async function runSEOScore() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/seo-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: currentTitle, description: currentDescription, content, keywords: currentKeywords }),
      });
      const data = await res.json();
      setSeoResult(data);
    } catch (e: any) {
      setError(e.message || "Failed to analyze");
    }
    setLoading(false);
  }

  function applyMeta() {
    if (metaResult) {
      onApplyMeta(metaResult.title, metaResult.description, metaResult.keywords || []);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow border-l-4 border-purple-500">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold text-purple-700">🤖 AI Assistant</h3>
        {loading && <span className="text-sm text-gray-400 animate-pulse">Thinking...</span>}
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <button onClick={generateMeta} disabled={loading} className="flex-1 bg-purple-100 text-purple-700 px-3 py-2 rounded text-sm hover:bg-purple-200 disabled:opacity-50">
            Generate Meta Tags
          </button>
          <button onClick={runSEOScore} disabled={loading} className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm hover:bg-blue-200 disabled:opacity-50">
            SEO Score
          </button>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm">{error}</div>}

        {metaResult && (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500">Title ({metaResult.title?.length || 0}/60)</label>
              <p className="text-sm bg-gray-50 p-2 rounded">{metaResult.title}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Description ({metaResult.description?.length || 0}/160)</label>
              <p className="text-sm bg-gray-50 p-2 rounded">{metaResult.description}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Keywords</label>
              <div className="flex flex-wrap gap-1">
                {metaResult.keywords?.map((kw: string, i: number) => (
                  <span key={i} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">{kw}</span>
                ))}
              </div>
            </div>
            <button onClick={applyMeta} className="w-full bg-purple-700 text-white px-3 py-2 rounded text-sm hover:bg-purple-800">
              Apply to Page
            </button>
          </div>
        )}

        {seoResult && (
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700">{seoResult.score}/100</div>
              <div className="text-sm text-gray-500">SEO Score</div>
            </div>
            {seoResult.issues?.length > 0 && (
              <div>
                <label className="text-xs font-medium text-red-500">Issues</label>
                <ul className="text-sm space-y-1">
                  {seoResult.issues.map((issue: string, i: number) => (
                    <li key={i} className="text-red-600">• {issue}</li>
                  ))}
                </ul>
              </div>
            )}
            {seoResult.suggestions?.length > 0 && (
              <div>
                <label className="text-xs font-medium text-green-500">Suggestions</label>
                <ul className="text-sm space-y-1">
                  {seoResult.suggestions.map((s: string, i: number) => (
                    <li key={i} className="text-green-600">• {s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
