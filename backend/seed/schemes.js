const schemes = [
  {
    name: "Swami Vivekananda Scholarship",
    state: "West Bengal",
    category: "Student",
    description: "Scholarship for WB students.",
    eligibility: "Minimum 60% marks",
    incomeLimit: "250000",
    gender: "Any",
    occupation: "Student",
    benefits: "Up to ₹8000 per year",
    documents: ["Aadhaar", "Income Certificate", "Marksheet"],
    officialLink: "https://svmcm.wb.gov.in/",
    keywords: ["student", "engineering", "college", "scholarship"],
  },

  {
    name: "PM Kisan",
    state: "All India",
    category: "Farmer",
    description: "Income support for farmers.",
    eligibility: "Registered farmers",
    incomeLimit: "No Limit",
    gender: "Any",
    occupation: "Farmer",
    benefits: "₹6000/year",
    documents: ["Aadhaar", "Land Record"],
    officialLink: "https://pmkisan.gov.in",
    keywords: ["farmer", "agriculture"],
  },

  {
    name: "Annapurna Yojana",
    state: "West Bengal",
    category: "Women",
    description: "Financial support for women.",
    eligibility: "Women of West Bengal",
    incomeLimit: "As per government rules",
    gender: "Female",
    occupation: "Any",
    benefits: "Monthly financial assistance",
    documents: ["Aadhaar", "Residence Proof"],
    officialLink: "https://socialregistry.wb.gov.in/",
    keywords: ["women", "financial"],
  },
];

export default schemes;
