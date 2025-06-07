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
As an expert LinkedIn profile analyst, provide a comprehensive analysis and actionable recommendations for the following LinkedIn profile data.

The analysis should cover:
* Strengths and weaknesses of the current headline and summary
* Relevance of skills and certifications to desired career path
* Engagement level based on listed activities/positions
* Potential areas for profile optimization

The recommendations should be specific, actionable, and aim to enhance profile visibility, attract recruiters for relevant roles, improve professional branding, and prepare for the next career stage.

Please return the analysis and recommendations in a JSON object with two keys: "analysis" and "recommendations". Both values should be strings formatted using Markdown.

Here is the LinkedIn profile data:
${JSON.stringify(profileData, null, 2)}
`;
}

module.exports = { buildPrompt, build_LinkedIn_analyser_prompt };

