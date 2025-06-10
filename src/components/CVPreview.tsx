
import React from 'react';
import { CVData } from '@/types/cv';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface CVPreviewProps {
  cvData: CVData;
}

const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-black print:shadow-none" id="cv-preview">
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-preview, #cv-preview * {
            visibility: visible;
          }
          #cv-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>

      <Card className="border-0 shadow-lg print:shadow-none">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center border-b pb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {cvData.personalInfo.fullName || 'Nombre Completo'}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {cvData.personalInfo.professionalTitle || 'Título Profesional'}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {cvData.personalInfo.phone && (
                <span>📞 {cvData.personalInfo.phone}</span>
              )}
              {cvData.personalInfo.email && (
                <span>✉️ {cvData.personalInfo.email}</span>
              )}
              {cvData.personalInfo.city && (
                <span>📍 {cvData.personalInfo.city}</span>
              )}
              {cvData.personalInfo.linkedin && (
                <span>💼 {cvData.personalInfo.linkedin}</span>
              )}
            </div>

            {cvData.personalInfo.document && (
              <p className="text-sm text-muted-foreground mt-2">
                {cvData.personalInfo.document}
              </p>
            )}
          </div>

          {/* Professional Profile */}
          {cvData.professionalProfile.summary && (
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 border-b-2 border-primary/20 pb-1">
                PERFIL PROFESIONAL
              </h2>
              <div className="space-y-3">
                <p className="text-justify leading-relaxed">
                  {cvData.professionalProfile.summary}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {cvData.professionalProfile.yearsExperience > 0 && (
                    <div>
                      <strong>Años de experiencia:</strong> {cvData.professionalProfile.yearsExperience}
                    </div>
                  )}
                  
                  {cvData.professionalProfile.specializations.length > 0 && (
                    <div>
                      <strong>Especialización:</strong> {cvData.professionalProfile.specializations.join(', ')}
                    </div>
                  )}
                  
                  {cvData.professionalProfile.industries.length > 0 && (
                    <div className="md:col-span-2">
                      <strong>Sectores:</strong> {cvData.professionalProfile.industries.join(', ')}
                    </div>
                  )}
                </div>

                {cvData.professionalProfile.valueProposition && (
                  <p className="text-sm italic bg-muted/30 p-3 rounded">
                    <strong>Propuesta de valor:</strong> {cvData.professionalProfile.valueProposition}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {cvData.workExperience.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 border-b-2 border-primary/20 pb-1">
                EXPERIENCIA LABORAL
              </h2>
              <div className="space-y-4">
                {cvData.workExperience.map((exp, index) => (
                  <div key={exp.id} className={index > 0 ? "border-t pt-4" : ""}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{exp.position}</h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <div className="text-sm text-muted-foreground md:text-right">
                        <p>
                          {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Actual'}
                        </p>
                        {exp.city && <p>{exp.city}</p>}
                      </div>
                    </div>
                    
                    {exp.achievements.length > 0 && exp.achievements[0] && (
                      <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                        {exp.achievements
                          .filter(achievement => achievement.trim())
                          .map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                    
                    {exp.quantifiableResults && (
                      <p className="text-sm bg-green-50 border-l-4 border-green-400 pl-3 py-2 mt-2">
                        <strong>Resultados:</strong> {exp.quantifiableResults}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 border-b-2 border-primary/20 pb-1">
                FORMACIÓN ACADÉMICA
              </h2>
              <div className="space-y-3">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p className="text-primary">{edu.institution}</p>
                    </div>
                    <div className="text-sm text-muted-foreground md:text-right">
                      <p>{edu.graduationYear}</p>
                      {edu.city && <p>{edu.city}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Skills & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technical Skills */}
            {cvData.technicalSkills.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-primary mb-3 border-b-2 border-primary/20 pb-1">
                  COMPETENCIAS TÉCNICAS
                </h2>
                <div className="space-y-2">
                  {Object.entries(
                    cvData.technicalSkills.reduce((acc, skill) => {
                      if (!acc[skill.category]) {
                        acc[skill.category] = [];
                      }
                      acc[skill.category].push(skill);
                      return acc;
                    }, {} as Record<string, typeof cvData.technicalSkills>)
                  ).map(([category, skills]) => (
                    <div key={category} className="text-sm">
                      <strong>{category}:</strong>{' '}
                      {skills.map(skill => `${skill.name} (${skill.level})`).join(', ')}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {cvData.languages.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-primary mb-3 border-b-2 border-primary/20 pb-1">
                  IDIOMAS
                </h2>
                <div className="space-y-1">
                  {cvData.languages.map((lang) => (
                    <div key={lang.id} className="text-sm">
                      <strong>{lang.name}:</strong> {lang.level}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Soft Skills */}
          {cvData.softSkills.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 border-b-2 border-primary/20 pb-1">
                HABILIDADES CLAVE
              </h2>
              <div className="flex flex-wrap gap-2">
                {cvData.softSkills
                  .filter(skill => skill.trim())
                  .map((skill, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {cvData.certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 border-b-2 border-primary/20 pb-1">
                CERTIFICACIONES Y CURSOS
              </h2>
              <div className="space-y-2">
                {cvData.certifications.map((cert) => (
                  <div key={cert.id} className="flex flex-col md:flex-row md:justify-between text-sm">
                    <div>
                      <strong>{cert.name}</strong> - {cert.institution}
                    </div>
                    <div className="text-muted-foreground">
                      {cert.year} • {cert.level}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Role-specific sections */}
          {/* Technical Projects */}
          {cvData.selectedRoles.includes('technical') && cvData.technicalFields?.projects && cvData.technicalFields.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 border-b-2 border-primary/20 pb-1">
                PROYECTOS DESTACADOS
              </h2>
              <div className="space-y-3">
                {cvData.technicalFields.projects.map((project) => (
                  <div key={project.id} className="border-l-4 border-primary/30 pl-4">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <p className="text-xs">
                        <strong>Tecnologías:</strong> {project.technologies.join(', ')}
                      </p>
                    )}
                    {project.link && (
                      <p className="text-xs text-primary">{project.link}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sales Information */}
          {cvData.selectedRoles.includes('sales') && cvData.salesFields && (
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 border-b-2 border-primary/20 pb-1">
                INFORMACIÓN COMERCIAL
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {cvData.salesFields.salesFigures && (
                  <div><strong>Cifras de ventas:</strong> {cvData.salesFields.salesFigures}</div>
                )}
                {cvData.salesFields.territory && (
                  <div><strong>Territorio:</strong> {cvData.salesFields.territory}</div>
                )}
                {cvData.salesFields.products && cvData.salesFields.products.length > 0 && (
                  <div className="md:col-span-2">
                    <strong>Productos/Servicios:</strong> {cvData.salesFields.products.join(', ')}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* References */}
          {cvData.references.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-primary mb-3 border-b-2 border-primary/20 pb-1">
                REFERENCIAS PROFESIONALES
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cvData.references.map((ref) => (
                  <div key={ref.id} className="text-sm">
                    <p className="font-semibold">{ref.fullName}</p>
                    <p>{ref.position}</p>
                    <p className="text-primary">{ref.company}</p>
                    {ref.phone && <p>{ref.phone}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CVPreview;
