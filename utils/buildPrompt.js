function buildPrompt(jd, resume) {
  return `
You are a professional AI assistant helping a candidate apply for a job.

Here is the Job Description (JD):
---
${jd}
---

${resume ? `Here is the candidate's resume:\n---\n${resume}\n---` : 'No resume provided.'}

Generate the following three outputs tailored to this job in the json format:
1. Cover Letter
2. Cold Email
3. DM Message for LinkedIn

Output must be clearly separated by headings:
"Cover Letter", "Cold Email", "DM Message"

Be direct, professional, and personalized. Do not exceed 100 words per section.
`;
}

module.exports = { buildPrompt };

