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
    if (!year || !month) return dateString; // Fallback si el formato no es correcto
    
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const monthIndex = parseInt(month, 10) - 1;
    
    if (monthIndex < 0 || monthIndex >= monthNames.length) {
      return `${month}/${year}`; // Fallback si el mes no es válido
    }
    
    return `${monthNames[monthIndex]} ${year}`;
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
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white/5 to-transparent" >
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2 animate-scale-in">
                {cvData.personalInfo?.fullName || 'Nombre Completo'}
              </h1>
              <p className="text-xl opacity-90 mb-6 animate-fade-in" style={{animationDelay: '0.1s'}}>
                {cvData.personalInfo?.professionalTitle || 'Título Profesional'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
                {cvData.personalInfo?.phone && (
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span>📞</span>
                    <span>{cvData.personalInfo.phone}</span>
                  </div>
                )}
                {cvData.personalInfo?.email && (
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span>✉️</span>
                    <span>{cvData.personalInfo.email}</span>
                  </div>
                )}
                {cvData.personalInfo?.city && (
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span>📍</span>
                    <span>{cvData.personalInfo.city}</span>
                  </div>
                )}
                {cvData.personalInfo?.linkedin && (
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span>💼</span>
                    <span>{cvData.personalInfo.linkedin}</span>
                  </div>
                )}
              </div>

              {cvData.personalInfo?.document && (
                <p className="text-sm opacity-75 mt-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
                  {cvData.personalInfo.document}
                </p>
              )}
            </div>
          </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Professional Profile */}
            {cvData.professionalProfile?.summary && (
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
                    {cvData.professionalProfile?.yearsExperience && cvData.professionalProfile.yearsExperience > 0 && (
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <strong className="text-primary">Años de experiencia:</strong> {cvData.professionalProfile.yearsExperience}
                      </div>
                    )}
                    
                    {cvData.professionalProfile?.specializations && cvData.professionalProfile.specializations.length > 0 && (
                      <div className="bg-white rounded-lg p-3 shadow-sm border">
                        <strong className="text-primary">Especialización:</strong> {cvData.professionalProfile.specializations.join(', ')}
                      </div>
                    )}
                    
                    {cvData.professionalProfile?.industries && cvData.professionalProfile.industries.length > 0 && (
                      <div className="bg-white rounded-lg p-3 shadow-sm border md:col-span-2">
                        <strong className="text-primary">Sectores:</strong> {cvData.professionalProfile.industries.join(', ')}
                      </div>
                    )}
                  </div>

                  {cvData.professionalProfile?.valueProposition && (
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 p-4 rounded-lg">
                      <strong className="text-amber-800">💡 Propuesta de valor:</strong>
                      <p className="text-amber-700 mt-1">{cvData.professionalProfile.valueProposition}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Work Experience */}
            {cvData.workExperience && cvData.workExperience.length > 0 && (
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
                    <div key={exp.id || index} className="relative">
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
                            <h3 className="font-bold text-xl text-primary mb-1">{exp.position || 'Posición no especificada'}</h3>
                            <p className="text-lg font-semibold text-gray-700">{exp.company || 'Empresa no especificada'}</p>
                          </div>
                          <div className="text-sm text-muted-foreground md:text-right bg-primary/5 rounded-lg p-2 mt-2 md:mt-0">
                            <p className="font-semibold">
                              {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Actual'}
                            </p>
                            {exp.city && <p>{exp.city}</p>}
                          </div>
                        </div>
                        
                        {exp.achievements && exp.achievements.length > 0 && exp.achievements.some(achievement => achievement && achievement.trim()) && (
                          <ul className="space-y-2 text-sm">
                            {exp.achievements
                              .filter(achievement => achievement && achievement.trim())
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
            {cvData.education && cvData.education.length > 0 && (
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
                  {cvData.education.map((edu, index) => (
                    <div key={edu.id || index} className="bg-white rounded-lg shadow-md border p-4 hover:shadow-lg transition-shadow duration-300">
                      <h3 className="font-bold text-lg text-primary mb-1">{edu.degree || 'Título no especificado'}</h3>
                      <p className="text-gray-700 font-semibold">{edu.institution || 'Institución no especificada'}</p>
                      <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                        <span>{edu.graduationYear || 'Año no especificado'}</span>
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
              {cvData.technicalSkills && cvData.technicalSkills.length > 0 && (
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
                        const category = skill.category || 'General';
                        if (!acc[category]) {
                          acc[category] = [];
                        }
                        acc[category].push(skill);
                        return acc;
                      }, {} as Record<string, typeof cvData.technicalSkills>)
                    ).map(([category, skills]) => (
                      <div key={category} className="bg-white rounded-lg shadow-sm border p-4">
                        <h4 className="font-semibold text-primary mb-2">{category}</h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <span key={skill.id || index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                              {skill.name} ({skill.level || 'N/A'})
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {cvData.languages && cvData.languages.length > 0 && (
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
                    {cvData.languages.map((lang, index) => (
                      <div key={lang.id || index} className="bg-white rounded-lg shadow-sm border p-3 flex justify-between items-center">
                        <span className="font-semibold">{lang.name || 'Idioma no especificado'}</span>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                          {lang.level || 'N/A'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Soft Skills */}
            {cvData.softSkills && cvData.softSkills.length > 0 && (
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
                      .filter(skill => skill && skill.trim())
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
            {cvData.certifications && cvData.certifications.length > 0 && (
              <div className="animate-fade-in" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">🏆</span>
                  </div>
                  <h2 className="text-xl font-bold text-primary">
                    CERTIFICACIONES Y CURSOS
                  </h2>
                </div>
                <div className="space-y-3">
                  {cvData.certifications.map((cert, index) => (
                    <div key={cert.id || index} className="bg-white rounded-lg shadow-sm border p-4">
                      <div className="flex flex-col md:flex-row md:justify-between">
                        <div>
                          <strong className="text-primary">{cert.name || 'Certificación no especificada'}</strong> 
                          <span className="text-gray-600"> - {cert.institution || 'Institución no especificada'}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 md:mt-0">
                          {cert.year && <span>{cert.year}</span>}
                          {cert.year && cert.level && <span> • </span>}
                          {cert.level && <span>{cert.level}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Role-specific sections */}
            {/* Technical Projects */}
            {cvData.selectedRoles && cvData.selectedRoles.includes('technical') && 
             cvData.technicalFields?.projects && cvData.technicalFields.projects.length > 0 && (
              <div className="animate-fade-in" style={{animationDelay: '1.1s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">🚀</span>
                  </div>
                  <h2 className="text-xl font-bold text-primary">
                    PROYECTOS DESTACADOS
                  </h2>
                </div>
                <div className="space-y-4">
                  {cvData.technicalFields.projects.map((project, index) => (
                    <div key={project.id || index} className="bg-white rounded-lg shadow-sm border p-4 border-l-4 border-primary/30">
                      <h3 className="font-semibold text-primary text-lg mb-2">{project.name || 'Proyecto sin nombre'}</h3>
                      <p className="text-sm text-gray-600 mb-2">{project.description || 'Sin descripción'}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-2">
                          <strong className="text-xs text-primary">Tecnologías:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.technologies.map((tech, techIndex) => (
                              <span key={techIndex} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {project.link && (
                        <p className="text-xs text-primary hover:underline">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            {project.link}
                          </a>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sales Information */}
            {cvData.selectedRoles && cvData.selectedRoles.includes('sales') && cvData.salesFields && (
              <div className="animate-fade-in" style={{animationDelay: '1.1s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">📈</span>
                  </div>
                  <h2 className="text-xl font-bold text-primary">
                    INFORMACIÓN COMERCIAL
                  </h2>
                </div>
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {cvData.salesFields.salesFigures && (
                      <div className="bg-primary/5 rounded p-3">
                        <strong className="text-primary">Cifras de ventas:</strong> 
                        <span className="ml-2">{cvData.salesFields.salesFigures}</span>
                      </div>
                    )}
                    {cvData.salesFields.territory && (
                      <div className="bg-primary/5 rounded p-3">
                        <strong className="text-primary">Territorio:</strong> 
                        <span className="ml-2">{cvData.salesFields.territory}</span>
                      </div>
                    )}
                    {cvData.salesFields.products && cvData.salesFields.products.length > 0 && (
                      <div className="bg-primary/5 rounded p-3 md:col-span-2">
                        <strong className="text-primary">Productos/Servicios:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cvData.salesFields.products.map((product, index) => (
                            <span key={index} className="bg-white text-primary px-2 py-1 rounded text-xs border">
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* References */}
            {cvData.references && cvData.references.length > 0 && (
              <div className="animate-fade-in" style={{animationDelay: '1.2s'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">👥</span>
                  </div>
                  <h2 className="text-xl font-bold text-primary">
                    REFERENCIAS PROFESIONALES
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cvData.references.map((ref, index) => (
                    <div key={ref.id || index} className="bg-white rounded-lg shadow-sm border p-4">
                      <p className="font-bold text-primary">{ref.fullName || 'Nombre no especificado'}</p>
                      <p className="text-sm text-gray-600">{ref.position || 'Posición no especificada'}</p>
                      <p className="text-sm font-semibold">{ref.company || 'Empresa no especificada'}</p>
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