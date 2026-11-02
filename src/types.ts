export type EngineeringMajor =
  | '기계공학'
  | '전자·전기공학'
  | '컴퓨터·소프트웨어'
  | '화학공학·고분자'
  | '신소재·재료공학'
  | '반도체시스템공학'
  | '로봇·메카트로닉스'
  | '산업·데이터공학'
  | '바이오·의공학'
  | '항공우주·조선해양'
  | '건축·토목·플랜트';

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  major: EngineeringMajor[];
  category: string;
  experience: '신입' | '경력' | '신입·경력' | '인턴';
  education: string;
  location: string;
  skills: string[];
  description: string;
  deadline: string;
  originalUrl: string;
  source: string;
  isSaved?: boolean;
}

export interface JargonExplanation {
  term: string;
  explanation: string;
}

export interface IndustryNewsItem {
  id: string;
  title: string;
  source: string;
  origin: '국내' | '해외';
  publishedAt: string;
  originalUrl: string;
  snippet?: string;
  industryCategory?: string;
  threeLineSummary?: string[];
  keywords?: string[];
  glossary?: JargonExplanation[];
  engineeringInsight?: string;
  isSaved?: boolean;
}

export interface IndustryHintResult {
  query: string;
  analyzedAt: string;
  domesticCount: number;
  overseasCount: number;
  news: IndustryNewsItem[];
  trendComparison?: {
    domesticTrend: string;
    globalTrend: string;
    implicationForJobSeekers: string;
  };
}

export interface CompanyAnalysisStep1 {
  majorCompetitors: string[];
  businessDomain: string;
  keyProductsAndTech: string[];
  techStrength: string;
  marketCompetitiveness: string;
  differentiators: string[];
}

export interface CompanyAnalysisStep2 {
  industryShifts: string[];
  technicalChallenges: string[];
  productivityAndQualityHurdles: string[];
  processAndCostIssues: string[];
  futureGrowthDirection: string;
}

export interface CompanyAnalysisStep3 {
  targetJobRole: string;
  keyResponsibilities: string[];
  requiredCompetencies: string[];
  applicantMatchPoints: string[];
  coverLetterKeyPhrases: string[];
  interviewPrepQuestions: string[];
}

export interface CompanyAnalysisResult {
  companyName: string;
  targetJobRole: string;
  analysisDate: string;
  basisSource: string;
  step1: CompanyAnalysisStep1;
  step2: CompanyAnalysisStep2;
  step3: CompanyAnalysisStep3;
  cautionNotice: string;
}

export interface JobRecommendation {
  roleTitle: string;
  matchScore: number;
  rationale: string;
  recommendedCompanies: {
    name: string;
    category: '대기업' | '글로벌/유니콘' | '강소·중견기업';
    focusTech: string;
    openingsCount: number;
  }[];
  strategicProjectHighlight: string;
  requiredUpskilling: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  major: EngineeringMajor;
  degree: string;
  gpa: string;
  techSkills: string[];
  engineeringTools: string[]; // e.g. CATIA, SolidWorks, MATLAB, Python, ROS, etc.
  projectExperience: {
    title: string;
    duration: string;
    role: string;
    techStack: string;
    description: string;
    metricOutcome: string;
  }[];
  preferredRoles: string[];
  preferredRegions: string[];
  targetCompanies: string[];
}

export interface CoverLetterSection {
  id: string;
  question: string;
  content: string;
  charLimit: number;
  aiFeedback?: {
    overallReview: string;
    starAnalysis: {
      situation: string;
      task: string;
      action: string;
      result: string;
    };
    suggestedImprovements: string[];
    polishedContent: string;
  };
}

export interface CoverLetterDoc {
  id: string;
  companyName: string;
  jobRole: string;
  updatedAt: string;
  sections: CoverLetterSection[];
}
