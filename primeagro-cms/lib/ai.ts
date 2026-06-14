const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

interface AIRequest {
  model: string;
  messages: { role: string; content: string }[];
  temperature?: number;
  max_tokens?: number;
}

async function callOpenRouter(request: AIRequest): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY not set");

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://primeagrofarms.com",
      "X-Title": "Prime Agro CMS",
    },
    body: JSON.stringify({
      ...request,
      temperature: request.temperature || 0.7,
      max_tokens: request.max_tokens || 1024,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function generateMetaTags(pageType: string, content: string, keywords?: string) {
  const prompt = `You are an SEO expert for an organic farming company called "Prime Agro Farms" based in Hyderabad, India.

Generate SEO meta tags for a ${pageType} page.

Content context:
${content}

${keywords ? `Target keywords: ${keywords}` : ""}

Return ONLY valid JSON with these fields:
{
  "title": "meta title (50-60 chars, include brand name)",
  "description": "meta description (150-160 chars, compelling, include CTA)",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`;

  const result = await callOpenRouter({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
  } catch {}
  return { title: "", description: "", keywords: [] };
}

export async function generateAltText(imageUrl: string, context?: string) {
  const prompt = `Generate a descriptive alt text for this image in the context of an organic farming website called "Prime Agro Farms".

${context ? `Context: ${context}` : "Image URL: " + imageUrl}

Return ONLY a short, descriptive alt text (under 125 chars) that is accessibility-friendly.`;

  const result = await callOpenRouter({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  return result.replace(/^["']|["']$/g, "").trim();
}

export async function generateStructuredData(pageType: string, data: any) {
  const prompt = `Generate JSON-LD structured data for a ${pageType} page of "Prime Agro Farms", an organic farming company in Hyderabad, India.

Page data:
${JSON.stringify(data, null, 2)}

Return ONLY valid JSON-LD structured data appropriate for this page type. Use schema.org vocabulary. Include:
- Organization schema for the company
- Relevant page-specific schema (Product, FAQPage, Article, etc.)
- LocalBusiness markup with location`;

  const result = await callOpenRouter({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
  } catch {}
  return null;
}

export async function analyzeSEO(title: string, description: string, content: string, keywords: string[]) {
  const prompt = `Analyze the SEO quality of this page content for "Prime Agro Farms" (organic farming website).

Title: ${title}
Description: ${description}
Keywords: ${keywords.join(", ")}
Content (first 500 chars): ${content.substring(0, 500)}

Return ONLY valid JSON:
{
  "score": number (0-100),
  "issues": ["issue1", "issue2"],
  "suggestions": ["suggestion1", "suggestion2"],
  "analysis": {
    "titleLength": "ok" | "too-short" | "too-long",
    "descriptionLength": "ok" | "too-short" | "too-long",
    "keywordDensity": "ok" | "low" | "high",
    "readability": "good" | "fair" | "poor"
  }
}`;

  const result = await callOpenRouter({
    model: "meta-llama/llama-3.3-70b-instruct:free",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  try {
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) return JSON.parse(jsonMatch[0]);
  } catch {}
  return { score: 0, issues: [], suggestions: [], analysis: {} };
}
