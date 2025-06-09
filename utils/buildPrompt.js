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

function job_role_comparison_prompt(jd1Text, jd2Text) {
 return `Compare the following two job descriptions. Each job may contain only a title or detailed description.

Return JSON as an array of objects with keys: "parameter", "jd1", "jd2".
The parameters should be dynamically chosen based on what information is available (e.g., title, skills, experience, tech stack, benefits).
Provide at least 5 known parameters, but no more than 10. "Preferred qualifications, skills and expected salary must be there. if any of these parameters are not provided, then use interenet to give a value but do not answer nil. In case of expected salary it should be in INR.

JD 1: ${jd1Text}
JD 2: ${jd2Text}

Respond only with valid JSON array.` ;
}

function suggest_project_prompt(domain, techStack, level) {
return `You are an expert project mentor.

Suggest 10 project ideas in JSON format for a user in the "${domain}" domain who is at a "${level}" level of expertise.

They are familiar with the following tech stack: ${techStack}

Each project should include:
- "title": a short project title
- "description": a 1-2 line concise explanation of the project
- "tags": an array of relevant skills or technologies

Return only a JSON array of project objects.`; 
}


module.exports = {
  buildPrompt,
  build_LinkedIn_analyser_prompt,
  job_role_comparison_prompt,
  suggest_project_prompt
};

