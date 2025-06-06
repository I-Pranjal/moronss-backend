const mongoose = require('mongoose');

const resumeMakerSchema = new mongoose.Schema({
    personalInfo: {
        fullName: { type: String,   required: true, trim: true },
        linkedin: { type: String },
        linkedinText: { type: String },
        github: { type: String },
        githubText: { type: String },
        email: { type: String  },
        phone: { type: String  }
    },
    skills: {
        Languages: { type: [String], default: [] },
        Frameworks: { type: [String], default: [] },
        Tools: { type: [String], default: [] },
        Platforms: { type: [String], default: [] },
        "Soft Skills": { type: [String], default: [] }
    },
    education: [{
        institution: { type: String  },
        location: { type: String },
        degree: { type: String },
        gpa: { type: String },
        duration: { type: String },
        courses: { type: [String], default: [] }
    }],
    experience: [{
        company: { type: String  },
        location: { type: String },
        title: { type: String },
        duration: { type: String },
        details: { type: [String], default: [] }
    }],
    projects: [{
        name: { type: String  },
        link: { type: String },
        linkText: { type: String },
        description: { type: String }
    }],
    honors: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
    useCount : { type: Number, default: 1 },
    randomInteger: {
        type: Number,
        default: () => Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000)
    }
});

const resumeMaker = mongoose.model('resumeMaker', resumeMakerSchema);

module.exports = resumeMaker;