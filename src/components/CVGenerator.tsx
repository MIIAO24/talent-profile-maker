
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
import { FileText, Eye } from 'lucide-react';

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

  if (showPreview) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Button 
            onClick={() => setShowPreview(false)}
            variant="outline"
          >
            ← Editar CV
          </Button>
          <Button onClick={handlePrint}>
            <FileText className="w-4 h-4 mr-2" />
            Imprimir/Guardar PDF
          </Button>
        </div>
        <CVPreview cvData={cvData} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Información del CV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="experience">Experiencia</TabsTrigger>
                <TabsTrigger value="education">Educación</TabsTrigger>
                <TabsTrigger value="skills">Habilidades</TabsTrigger>
                <TabsTrigger value="roles">Especialización</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <PersonalInfoForm 
                  data={cvData.personalInfo}
                  onChange={(data) => updateCVData('personalInfo', data)}
                />
              </TabsContent>

              <TabsContent value="profile" className="mt-6">
                <ProfessionalProfileForm 
                  data={cvData.professionalProfile}
                  onChange={(data) => updateCVData('professionalProfile', data)}
                />
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <WorkExperienceForm 
                  data={cvData.workExperience}
                  onChange={(data) => updateCVData('workExperience', data)}
                />
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <EducationForm 
                  education={cvData.education}
                  certifications={cvData.certifications}
                  references={cvData.references}
                  onEducationChange={(data) => updateCVData('education', data)}
                  onCertificationsChange={(data) => updateCVData('certifications', data)}
                  onReferencesChange={(data) => updateCVData('references', data)}
                />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <SkillsForm 
                  technicalSkills={cvData.technicalSkills}
                  languages={cvData.languages}
                  softSkills={cvData.softSkills}
                  onTechnicalSkillsChange={(data) => updateCVData('technicalSkills', data)}
                  onLanguagesChange={(data) => updateCVData('languages', data)}
                  onSoftSkillsChange={(data) => updateCVData('softSkills', data)}
                />
              </TabsContent>

              <TabsContent value="roles" className="mt-6">
                <RoleSpecificForm 
                  cvData={cvData}
                  onChange={setCvData}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Vista Previa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg text-sm">
                <h4 className="font-semibold mb-2">Progreso del CV:</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Información Personal</span>
                    <span className={cvData.personalInfo.fullName ? "text-green-600" : "text-orange-500"}>
                      {cvData.personalInfo.fullName ? "✓" : "○"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Perfil Profesional</span>
                    <span className={cvData.professionalProfile.summary ? "text-green-600" : "text-orange-500"}>
                      {cvData.professionalProfile.summary ? "✓" : "○"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Experiencia</span>
                    <span className={cvData.workExperience.length > 0 ? "text-green-600" : "text-orange-500"}>
                      {cvData.workExperience.length > 0 ? "✓" : "○"}
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setShowPreview(true)}
                className="w-full"
                disabled={!cvData.personalInfo.fullName}
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver CV Completo
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Completa al menos la información personal para ver la vista previa
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CVGenerator;
