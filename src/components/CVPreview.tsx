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
    <div className="max-w-4xl mx-auto bg-white text-black print:shadow-none animate-fade-in" id="cv-preview">
      <style>{`
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

      <Card className="border-0 shadow-xl print:shadow-none overflow-hidden">
        <CardContent className="p-0">
          {/* Modern Header with Gradient */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2 animate-scale-in">
                {cvData.personalInfo.fullName || 'Nombre Completo'}
              </h1>
              <p className="text-xl opacity-90 mb-6 animate-fade-in" style={{animationDelay: '0.1s'}}>
                {cvData.personalInfo.professionalTitle || 'Título Profesional'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
                {cvData.personalInfo.phone && (
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span>📞</span>
                    <span>{cvData.personalInfo.phone}</span>
                  </div>
                )}
                {cvData.personalInfo.email && (
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span>✉️</span>
                    <span>{cvData.personalInfo.email}</span>
                  </div>
                )}
                {cvData.personalInfo.city && (
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span>📍</span>
                    <span>{cvData.personalInfo.city}</span>
                  </div>
                )}
                {cvData.personalInfo.linkedin && (
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span>💼</span>
                    <span>{cvData.personalInfo.linkedin}</span>
                  </div>
                )}
              </div>

              {cvData.personalInfo.document && (
                <p className="text-sm opacity-75 mt-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
                  {cvData.personalInfo.document}
                </p>
              )}
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Professional Profile */}
            {cvData.professionalProfile.summary && (
              <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">P</span>
                  </div>
                  <h2 className="text-2xl font-bold text-primary">
                    PERFIL PROFESIONAL
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-lg border-l-4 border-primary space-y-4">
                  <p className="text-justify leading-relaxed text-lg">
                    {cvData.professionalProfile.summary}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {cvData.professionalProfile.yearsExperience > 0 && (
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <strong className="text-primary">Años de experiencia:</strong> {cvData.professionalProfile.yearsExperience}
                      </div>
                    )}
                    
                    {cvData.professionalProfile.specializations.length > 0 && (
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <strong className="text-primary">Especialización:</strong> {cvData.professionalProfile.specializations.join(', ')}
                      </div>
                    )}
                    
                    {cvData.professionalProfile.industries.length > 0 && (
                      <div className="bg-white rounded-lg p-3 shadow-sm border md:col-span-2">
                        <strong className="text-primary">Sectores:</strong> {cvData.professionalProfile.industries.join(', ')}
                      </div>
                    )}
                  </div>

                  {cvData.professionalProfile.valueProposition && (
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 p-4 rounded-lg">
                      <strong className="text-amber-800">💡 Propuesta de valor:</strong>
                      <p className="text-amber-700 mt-1">{cvData.professionalProfile.valueProposition}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Work Experience */}
            {cvData.workExperience.length > 0 && (
              <div className="animate-fade-in" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">E</span>
                  </div>
                  <h2 className="text-2xl font-bold text-primary">
                    EXPERIENCIA LABORAL
                  </h2>
                </div>
                <div className="space-y-6">
                  {cvData.workExperience.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      {/* Timeline line */}
                      {index < cvData.workExperience.length - 1 && (
                        <div className="absolute left-4 top-16 w-0.5 h-full bg-gradient-to-b from-primary/30 to-transparent"></div>
                      )}
                      
                      <div className="bg-white rounded-xl shadow-md border hover:shadow-lg transition-shadow duration-300 p-6 ml-8 relative">
                        {/* Timeline dot */}
                        <div className="absolute -left-12 top-6 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                          <div>
                            <h3 className="font-bold text-xl text-primary mb-1">{exp.position}</h3>
                            <p className="text-lg font-semibold text-gray-700">{exp.company}</p>
                          </div>
                          <div className="text-sm text-muted-foreground md:text-right bg-primary/5 rounded-lg p-2 mt-2 md:mt-0">
                            <p className="font-semibold">
                              {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Actual'}
                            </p>
                            {exp.city && <p>{exp.city}</p>}
                          </div>
                        </div>
                        
                        {exp.achievements.length > 0 && exp.achievements[0] && (
                          <ul className="space-y-2 text-sm">
                            {exp.achievements
                              .filter(achievement => achievement.trim())
                              .map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary font-bold text-xs mt-1">▶</span>
                                <span className="leading-relaxed">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        {exp.quantifiableResults && (
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mt-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-green-600">🎯</span>
                              <strong className="text-green-800">Resultados Destacados:</strong>
                            </div>
                            <p className="text-green-700">{exp.quantifiableResults}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {cvData.education.length > 0 && (
              <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">🎓</span>
                  </div>
                  <h2 className="text-2xl font-bold text-primary">
                    FORMACIÓN ACADÉMICA
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cvData.education.map((edu) => (
                    <div key={edu.id} className="bg-white rounded-lg shadow-md border p-4 hover:shadow-lg transition-shadow duration-300">
                      <h3 className="font-bold text-lg text-primary mb-1">{edu.degree}</h3>
                      <p className="text-gray-700 font-semibold">{edu.institution}</p>
                      <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                        <span>{edu.graduationYear}</span>
                        {edu.city && <span>{edu.city}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Technical Skills */}
              {cvData.technicalSkills.length > 0 && (
                <div className="animate-fade-in" style={{animationDelay: '0.7s'}}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">⚡</span>
                    </div>
                    <h2 className="text-xl font-bold text-primary">
                      COMPETENCIAS TÉCNICAS
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {Object.entries(
                      cvData.technicalSkills.reduce((acc, skill) => {
                        if (!acc[skill.category]) {
                          acc[skill.category] = [];
                        }
                        acc[skill.category].push(skill);
                        return acc;
                      }, {} as Record<string, typeof cvData.technicalSkills>)
                    ).map(([category, skills]) => (
                      <div key={category} className="bg-white rounded-lg shadow-sm border p-4">
                        <h4 className="font-semibold text-primary mb-2">{category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map(skill => (
                            <span key={skill.id} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                              {skill.name} ({skill.level})
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {cvData.languages.length > 0 && (
                <div className="animate-fade-in" style={{animationDelay: '0.8s'}}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">🌍</span>
                    </div>
                    <h2 className="text-xl font-bold text-primary">
                      IDIOMAS
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {cvData.languages.map((lang) => (
                      <div key={lang.id} className="bg-white rounded-lg shadow-sm border p-3 flex justify-between items-center">
                        <span className="font-semibold">{lang.name}</span>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                          {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Soft Skills */}
            {cvData.softSkills.length > 0 && (
              <div className="animate-fade-in" style={{animationDelay: '0.9s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">💎</span>
                  </div>
                  <h2 className="text-xl font-bold text-primary">
                    HABILIDADES CLAVE
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-6">
                  <div className="flex flex-wrap gap-3">
                    {cvData.softSkills
                      .filter(skill => skill.trim())
                      .map((skill, index) => (
                      <span key={index} className="bg-white shadow-sm border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium hover:shadow-md transition-shadow duration-200">
                        {skill}
                      </span>
                    ))}
                  </div>
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
              <div className="animate-fade-in" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">👥</span>
                  </div>
                  <h2 className="text-xl font-bold text-primary">
                    REFERENCIAS PROFESIONALES
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cvData.references.map((ref) => (
                    <div key={ref.id} className="bg-white rounded-lg shadow-sm border p-4">
                      <p className="font-bold text-primary">{ref.fullName}</p>
                      <p className="text-sm text-gray-600">{ref.position}</p>
                      <p className="text-sm font-semibold">{ref.company}</p>
                      {ref.phone && <p className="text-xs text-muted-foreground mt-1">{ref.phone}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVPreview;
