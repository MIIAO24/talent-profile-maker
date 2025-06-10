
export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  phone: string;
  email: string;
  city: string;
  document: string;
  linkedin: string;
  otherNetworks: string;
}

export interface ProfessionalProfile {
  summary: string;
  yearsExperience: number;
  specializations: string[];
  industries: string[];
  valueProposition: string;
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  city: string;
  achievements: string[];
  quantifiableResults: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationYear: number;
  city: string;
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  year: number;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
}

export interface TechnicalSkill {
  id: string;
  name: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
  category: string;
}

export interface Language {
  id: string;
  name: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Nativo';
}

export interface Reference {
  id: string;
  fullName: string;
  position: string;
  company: string;
  phone: string;
}

// Campos específicos por rol
export interface TechnicalFields {
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  methodologies: string[];
}

export interface CommunicationFields {
  portfolio: Array<{
    id: string;
    title: string;
    description: string;
    link?: string;
  }>;
  media: string[];
  campaigns: string[];
}

export interface SalesFields {
  salesFigures: string;
  territory: string;
  products: string[];
  salesAchievements: string[];
}

export interface ManagementFields {
  teamSize: number;
  budgetManaged: string;
  kpis: string[];
  managementAchievements: string[];
}

export interface HealthFields {
  medicalSpecialties: string[];
  professionalCertifications: string[];
  patientsAttended: number;
  hospitalSystems: string[];
  clinicalIndicators: string[];
  publications: string[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  professionalProfile: ProfessionalProfile;
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  technicalSkills: TechnicalSkill[];
  languages: Language[];
  softSkills: string[];
  references: Reference[];
  selectedRoles: string[];
  technicalFields?: TechnicalFields;
  communicationFields?: CommunicationFields;
  salesFields?: SalesFields;
  managementFields?: ManagementFields;
  healthFields?: HealthFields;
}
