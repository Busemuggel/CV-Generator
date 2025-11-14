export interface PersonalInfo {
  fullName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  profilePicture: string | null;
}

export interface Experience {
  id: string;
  type: 'job' | 'project';
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  skills: string[];
  experiences: Experience[];
}

export interface CoverLetterData {
  recipientName: string;
  companyName: string;
  position: string;
  greeting: string;
  introduction: string;
  mainBody: string;
  closing: string;
}

export interface BrandingData {
  primaryColor: string;
  secondaryColor: string;
  companyLogo: string | null;
}

export type Language = 'de' | 'en';
