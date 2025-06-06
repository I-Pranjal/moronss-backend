const ResumeMaker = require('../models/resumeMaker');

// Helper function to merge arrays without duplicates
function mergeArrays(arr1 = [], arr2 = []) {
  return Array.from(new Set([...(arr1 || []), ...(arr2 || [])]));
}

// POST resume data
const postResume = async (req, res) => {
  try {
    const data = req.body;
    const { fullName, phone } = data.personalInfo;

    // Check for existing resume by name and phone
    let existingResume = await ResumeMaker.findOne({
      'personalInfo.fullName': fullName,
      'personalInfo.phone': phone,
    });

    if (existingResume) {
      // Merge details and increment useCount
      existingResume.personalInfo = { ...existingResume.personalInfo, ...data.personalInfo };

      // Merge skills
      for (const key in data.skills) {
        existingResume.skills[key] = mergeArrays(existingResume.skills[key], data.skills[key]);
      }

      // Merge education, experience, projects, honors, certifications
      existingResume.education = mergeArrays(existingResume.education, data.education);
      existingResume.experience = mergeArrays(existingResume.experience, data.experience);
      existingResume.projects = mergeArrays(existingResume.projects, data.projects);
      existingResume.honors = mergeArrays(existingResume.honors, data.honors);
      existingResume.certifications = mergeArrays(existingResume.certifications, data.certifications);

      existingResume.useCount += 1;
      await existingResume.save();
      return res.status(200).json({ message: 'Resume merged and updated', resume: existingResume });
    } else {
      // Create new resume
      const newResume = new ResumeMaker(data);
      await newResume.save();
      return res.status(201).json({ message: 'Resume created', resume: newResume });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {
  postResume,
};
