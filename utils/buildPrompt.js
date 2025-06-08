function buildPrompt(jd, resume) {
  return `
You are a professional AI assistant helping a candidate apply for a job.

Here is the Job Description (JD):
---
${jd}
---

${resume ? `Here is the candidate's resume:\n---\n${resume}\n---` : 'No resume provided.'}

Generate the following three outputs tailored to this job in JSON format:
1. Cover Letter
2. Cold Email
3. DM Message for LinkedIn

Return the output as a single JSON object with these three keys: "Cover Letter", "Cold Email", "DM Message".

Be direct, professional, and personalized. Do not exceed 100 words per section.
`;
}


function build_LinkedIn_analyser_prompt(profileData) {
  return `
You are an expert LinkedIn profile analyst. You will receive LinkedIn profile data in JSON format. Your task is to analyze the profile thoroughly and return a well-structured JSON response containing analysis and improvement recommendations.

**Your analysis should include:**
- Strengths and weaknesses of the headline and summary.
- Relevance of skills and certifications to the desired career path.
- Engagement level based on roles and activities.
- Areas where the profile can be optimized or enhanced.

**Your recommendations should include:**
- Specific suggestions to improve headline, summary, experience, skills, certifications, and engagement.
- Use of keywords to enhance searchability.
- Ways to showcase achievements, leadership, and value proposition.
- Ideas to increase recruiter interest and visibility.

⚠️ **Important formatting requirements**:
- Do NOT wrap your response in markdown (like \`\`\`json or any code blocks).
- Do NOT add extra explanation, introduction, or closing remarks.
- Your final response should be a **clean JSON object** with exactly two top-level keys: **"analysis"** and **"recommendations"**.
- Each value should be a string, and the content can be formatted in Markdown for styling (e.g., use **bold**, bullet points, etc.).
- Make sure the output is valid JSON and will pass strict JSON.parse checks without any post-processing.

Here is the LinkedIn profile data:
${JSON.stringify(profileData, null, 2)}
`;
}


module.exports = { buildPrompt, build_LinkedIn_analyser_prompt };

