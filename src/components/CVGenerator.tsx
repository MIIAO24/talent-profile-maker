
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CVData } from '@/types/cv';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ProfessionalProfileForm from './forms/ProfessionalProfileForm';
import WorkExperienceForm from './forms/WorkExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import RoleSpecificForm from './forms/RoleSpecificForm';
import CVPreview from './CVPreview';
import { FileText, Eye, Download, CheckCircle, Clock, User, Briefcase, GraduationCap, Settings } from 'lucide-react';

const CVGenerator = () => {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: '',
      professionalTitle: '',
      phone: '',
      email: '',
      city: '',
      document: '',
      linkedin: '',
      otherNetworks: ''
    },
    professionalProfile: {
      summary: '',
      yearsExperience: 0,
      specializations: [],
      industries: [],
      valueProposition: ''
    },
    workExperience: [],
    education: [],
    certifications: [],
    technicalSkills: [],
    languages: [],
    softSkills: [],
    references: [],
    selectedRoles: []
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);

  const updateCVData = (section: keyof CVData, data: any) => {
    setCvData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateProgress = () => {
    let completed = 0;
    let total = 6;
    
    if (cvData.personalInfo.fullName && cvData.personalInfo.email) completed++;
    if (cvData.professionalProfile.summary) completed++;
    if (cvData.workExperience.length > 0) completed++;
    if (cvData.education.length > 0) completed++;
    if (cvData.technicalSkills.length > 0 || cvData.languages.length > 0) completed++;
    if (cvData.selectedRoles.length > 0) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const tabs = [
    { value: 'personal', label: 'Personal', icon: User },
    { value: 'profile', label: 'Perfil', icon: FileText },
    { value: 'experience', label: 'Experiencia', icon: Briefcase },
    { value: 'education', label: 'Educación', icon: GraduationCap },
    { value: 'skills', label: 'Habilidades', icon: Settings },
    { value: 'roles', label: 'Especialización', icon: CheckCircle },
  ];

  if (showPreview) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button 
            onClick={() => setShowPreview(false)}
            variant="outline"
            size="lg"
            className="hover:scale-105 transition-transform duration-200"
          >
            ← Editar CV
          </Button>
          <Button 
            onClick={handlePrint}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar PDF
          </Button>
        </div>
        <CVPreview cvData={cvData} />
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-fade-in">
      <div className="xl:col-span-3">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-slate-50">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span>Creador de CV Profesional</span>
                <p className="text-sm font-normal opacity-90 mt-1">
                  Completa tu información paso a paso
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8 bg-muted/50">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value}
                      className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200 hover:scale-105"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-medium">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="min-h-[400px]">
                <TabsContent value="personal" className="mt-0 animate-fade-in">
                  <PersonalInfoForm 
                    data={cvData.personalInfo}
                    onChange={(data) => updateCVData('personalInfo', data)}
                  />
                </TabsContent>

                <TabsContent value="profile" className="mt-0 animate-fade-in">
                  <ProfessionalProfileForm 
                    data={cvData.professionalProfile}
                    onChange={(data) => updateCVData('professionalProfile', data)}
                  />
                </TabsContent>

                <TabsContent value="experience" className="mt-0 animate-fade-in">
                  <WorkExperienceForm 
                    data={cvData.workExperience}
                    onChange={(data) => updateCVData('workExperience', data)}
                  />
                </TabsContent>

                <TabsContent value="education" className="mt-0 animate-fade-in">
                  <EducationForm 
                    education={cvData.education}
                    certifications={cvData.certifications}
                    references={cvData.references}
                    onEducationChange={(data) => updateCVData('education', data)}
                    onCertificationsChange={(data) => updateCVData('certifications', data)}
                    onReferencesChange={(data) => updateCVData('references', data)}
                  />
                </TabsContent>

                <TabsContent value="skills" className="mt-0 animate-fade-in">
                  <SkillsForm 
                    technicalSkills={cvData.technicalSkills}
                    languages={cvData.languages}
                    softSkills={cvData.softSkills}
                    onTechnicalSkillsChange={(data) => updateCVData('technicalSkills', data)}
                    onLanguagesChange={(data) => updateCVData('languages', data)}
                    onSoftSkillsChange={(data) => updateCVData('softSkills', data)}
                  />
                </TabsContent>

                <TabsContent value="roles" className="mt-0 animate-fade-in">
                  <RoleSpecificForm 
                    cvData={cvData}
                    onChange={setCvData}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="xl:col-span-1">
        <Card className="sticky top-4 shadow-xl border-0 bg-gradient-to-br from-white to-primary/5">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-primary">Vista Previa</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Progress Section */}
              <div className="bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-primary">Progreso del CV</h4>
                  <span className="text-xl font-bold text-primary">{progress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="space-y-2 text-sm">
                  {[
                    { 
                      label: 'Información Personal', 
                      completed: cvData.personalInfo.fullName && cvData.personalInfo.email,
                      icon: User
                    },
                    { 
                      label: 'Perfil Profesional', 
                      completed: cvData.professionalProfile.summary,
                      icon: FileText
                    },
                    { 
                      label: 'Experiencia Laboral', 
                      completed: cvData.workExperience.length > 0,
                      icon: Briefcase
                    },
                    { 
                      label: 'Educación', 
                      completed: cvData.education.length > 0,
                      icon: GraduationCap
                    },
                    { 
                      label: 'Habilidades', 
                      completed: cvData.technicalSkills.length > 0 || cvData.languages.length > 0,
                      icon: Settings
                    },
                    { 
                      label: 'Especialización', 
                      completed: cvData.selectedRoles.length > 0,
                      icon: CheckCircle
                    }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/50 transition-colors duration-200">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-primary" />
                          <span>{item.label}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          item.completed 
                            ? "bg-green-100 text-green-600" 
                            : "bg-orange-100 text-orange-600"
                        }`}>
                          {item.completed ? "✓" : <Clock className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button 
                onClick={() => setShowPreview(true)}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105 shadow-lg"
                disabled={!cvData.personalInfo.fullName}
                size="lg"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver CV Completo
              </Button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  💡 Completa al menos la información personal para ver la vista previa
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CVGenerator;
