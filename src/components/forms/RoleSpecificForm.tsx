
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CVData } from '@/types/cv';

interface RoleSpecificFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

const RoleSpecificForm: React.FC<RoleSpecificFormProps> = ({ cvData, onChange }) => {
  const roles = [
    { id: 'technical', label: 'Roles Técnicos', description: 'Desarrollo, ingeniería, IT' },
    { id: 'communications', label: 'Comunicaciones', description: 'Marketing, publicidad, relaciones públicas' },
    { id: 'sales', label: 'Ventas', description: 'Comercial, business development' },
    { id: 'management', label: 'Gestión', description: 'Gerencia, administración, liderazgo' },
    { id: 'health', label: 'Salud', description: 'Medicina, enfermería, salud pública' }
  ];

  const handleRoleToggle = (roleId: string, checked: boolean) => {
    const updatedRoles = checked 
      ? [...cvData.selectedRoles, roleId]
      : cvData.selectedRoles.filter(id => id !== roleId);

    onChange({
      ...cvData,
      selectedRoles: updatedRoles
    });
  };

  // Technical Fields
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: ''
    };
    
    onChange({
      ...cvData,
      technicalFields: {
        ...cvData.technicalFields,
        projects: [...(cvData.technicalFields?.projects || []), newProject],
        methodologies: cvData.technicalFields?.methodologies || []
      }
    });
  };

  const updateProject = (id: string, field: string, value: any) => {
    if (!cvData.technicalFields) return;
    
    const updatedProjects = cvData.technicalFields.projects.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    );

    onChange({
      ...cvData,
      technicalFields: {
        ...cvData.technicalFields,
        projects: updatedProjects
      }
    });
  };

  const removeProject = (id: string) => {
    if (!cvData.technicalFields) return;
    
    onChange({
      ...cvData,
      technicalFields: {
        ...cvData.technicalFields,
        projects: cvData.technicalFields.projects.filter(p => p.id !== id)
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Especialización por Rol</h3>
      
      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Selecciona tu(s) área(s) profesional(es)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <div key={role.id} className="flex items-start space-x-3">
                <Checkbox
                  id={role.id}
                  checked={cvData.selectedRoles.includes(role.id)}
                  onCheckedChange={(checked) => handleRoleToggle(role.id, !!checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={role.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {role.label}
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Role Fields */}
      {cvData.selectedRoles.includes('technical') && (
        <Card>
          <CardHeader>
            <CardTitle>Información Técnica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Projects */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Proyectos Destacados</Label>
                <Button type="button" onClick={addProject} size="sm">
                  + Agregar Proyecto
                </Button>
              </div>

              {cvData.technicalFields?.projects?.map((project) => (
                <Card key={project.id} className="bg-muted/50">
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        <div className="space-y-2">
                          <Label>Nombre del Proyecto</Label>
                          <Input
                            value={project.name}
                            onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                            placeholder="E-commerce Platform"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Enlace (opcional)</Label>
                          <Input
                            value={project.link || ''}
                            onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeProject(project.id)}
                        className="ml-2"
                      >
                        ×
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        placeholder="Desarrollé una plataforma de comercio electrónico completa..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tecnologías Utilizadas</Label>
                      <Input
                        value={project.technologies.join(', ')}
                        onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(', ').filter(Boolean))}
                        placeholder="React, Node.js, MongoDB, AWS"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Methodologies */}
            <div className="space-y-2">
              <Label>Metodologías de Trabajo</Label>
              <Input
                value={cvData.technicalFields?.methodologies?.join(', ') || ''}
                onChange={(e) => onChange({
                  ...cvData,
                  technicalFields: {
                    ...cvData.technicalFields,
                    projects: cvData.technicalFields?.projects || [],
                    methodologies: e.target.value.split(', ').filter(Boolean)
                  }
                })}
                placeholder="Agile, Scrum, DevOps, TDD"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Communications Role Fields */}
      {cvData.selectedRoles.includes('communications') && (
        <Card>
          <CardHeader>
            <CardTitle>Información de Comunicaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Medios de Comunicación</Label>
              <Input
                value={cvData.communicationFields?.media?.join(', ') || ''}
                onChange={(e) => onChange({
                  ...cvData,
                  communicationFields: {
                    ...cvData.communicationFields,
                    portfolio: cvData.communicationFields?.portfolio || [],
                    media: e.target.value.split(', ').filter(Boolean),
                    campaigns: cvData.communicationFields?.campaigns || []
                  }
                })}
                placeholder="Radio, TV, Prensa digital, Redes sociales"
              />
            </div>

            <div className="space-y-2">
              <Label>Campañas Destacadas</Label>
              <Textarea
                value={cvData.communicationFields?.campaigns?.join('\n') || ''}
                onChange={(e) => onChange({
                  ...cvData,
                  communicationFields: {
                    ...cvData.communicationFields,
                    portfolio: cvData.communicationFields?.portfolio || [],
                    media: cvData.communicationFields?.media || [],
                    campaigns: e.target.value.split('\n').filter(Boolean)
                  }
                })}
                placeholder="Campaña de lanzamiento de producto X&#10;Estrategia de comunicación crisis Y"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sales Role Fields */}
      {cvData.selectedRoles.includes('sales') && (
        <Card>
          <CardHeader>
            <CardTitle>Información de Ventas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cifras de Ventas</Label>
                <Input
                  value={cvData.salesFields?.salesFigures || ''}
                  onChange={(e) => onChange({
                    ...cvData,
                    salesFields: {
                      ...cvData.salesFields,
                      salesFigures: e.target.value,
                      territory: cvData.salesFields?.territory || '',
                      products: cvData.salesFields?.products || [],
                      salesAchievements: cvData.salesFields?.salesAchievements || []
                    }
                  })}
                  placeholder="$2M anuales, 150% de meta"
                />
              </div>

              <div className="space-y-2">
                <Label>Territorio</Label>
                <Input
                  value={cvData.salesFields?.territory || ''}
                  onChange={(e) => onChange({
                    ...cvData,
                    salesFields: {
                      ...cvData.salesFields,
                      salesFigures: cvData.salesFields?.salesFigures || '',
                      territory: e.target.value,
                      products: cvData.salesFields?.products || [],
                      salesAchievements: cvData.salesFields?.salesAchievements || []
                    }
                  })}
                  placeholder="Región Metropolitana, Nacional"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Productos/Servicios</Label>
              <Input
                value={cvData.salesFields?.products?.join(', ') || ''}
                onChange={(e) => onChange({
                  ...cvData,
                  salesFields: {
                    ...cvData.salesFields,
                    salesFigures: cvData.salesFields?.salesFigures || '',
                    territory: cvData.salesFields?.territory || '',
                    products: e.target.value.split(', ').filter(Boolean),
                    salesAchievements: cvData.salesFields?.salesAchievements || []
                  }
                })}
                placeholder="Software empresarial, Soluciones cloud"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Management Role Fields */}
      {cvData.selectedRoles.includes('management') && (
        <Card>
          <CardHeader>
            <CardTitle>Información de Gestión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tamaño de Equipos</Label>
                <Input
                  type="number"
                  value={cvData.managementFields?.teamSize || ''}
                  onChange={(e) => onChange({
                    ...cvData,
                    managementFields: {
                      ...cvData.managementFields,
                      teamSize: parseInt(e.target.value) || 0,
                      budgetManaged: cvData.managementFields?.budgetManaged || '',
                      kpis: cvData.managementFields?.kpis || [],
                      managementAchievements: cvData.managementFields?.managementAchievements || []
                    }
                  })}
                  placeholder="15"
                />
              </div>

              <div className="space-y-2">
                <Label>Presupuestos Gestionados</Label>
                <Input
                  value={cvData.managementFields?.budgetManaged || ''}
                  onChange={(e) => onChange({
                    ...cvData,
                    managementFields: {
                      ...cvData.managementFields,
                      teamSize: cvData.managementFields?.teamSize || 0,
                      budgetManaged: e.target.value,
                      kpis: cvData.managementFields?.kpis || [],
                      managementAchievements: cvData.managementFields?.managementAchievements || []
                    }
                  })}
                  placeholder="$500K anuales"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>KPIs Principales</Label>
              <Input
                value={cvData.managementFields?.kpis?.join(', ') || ''}
                onChange={(e) => onChange({
                  ...cvData,
                  managementFields: {
                    ...cvData.managementFields,
                    teamSize: cvData.managementFields?.teamSize || 0,
                    budgetManaged: cvData.managementFields?.budgetManaged || '',
                    kpis: e.target.value.split(', ').filter(Boolean),
                    managementAchievements: cvData.managementFields?.managementAchievements || []
                  }
                })}
                placeholder="ROI, Productividad del equipo, Satisfacción del cliente"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Health Role Fields */}
      {cvData.selectedRoles.includes('health') && (
        <Card>
          <CardHeader>
            <CardTitle>Información de Salud</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Especialidades Médicas</Label>
              <Input
                value={cvData.healthFields?.medicalSpecialties?.join(', ') || ''}
                onChange={(e) => onChange({
                  ...cvData,
                  healthFields: {
                    ...cvData.healthFields,
                    medicalSpecialties: e.target.value.split(', ').filter(Boolean),
                    professionalCertifications: cvData.healthFields?.professionalCertifications || [],
                    patientsAttended: cvData.healthFields?.patientsAttended || 0,
                    hospitalSystems: cvData.healthFields?.hospitalSystems || [],
                    clinicalIndicators: cvData.healthFields?.clinicalIndicators || [],
                    publications: cvData.healthFields?.publications || []
                  }
                })}
                placeholder="Cardiología, Medicina Interna"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Número de Pacientes Atendidos</Label>
                <Input
                  type="number"
                  value={cvData.healthFields?.patientsAttended || ''}
                  onChange={(e) => onChange({
                    ...cvData,
                    healthFields: {
                      ...cvData.healthFields,
                      medicalSpecialties: cvData.healthFields?.medicalSpecialties || [],
                      professionalCertifications: cvData.healthFields?.professionalCertifications || [],
                      patientsAttended: parseInt(e.target.value) || 0,
                      hospitalSystems: cvData.healthFields?.hospitalSystems || [],
                      clinicalIndicators: cvData.healthFields?.clinicalIndicators || [],
                      publications: cvData.healthFields?.publications || []
                    }
                  })}
                  placeholder="1500"
                />
              </div>

              <div className="space-y-2">
                <Label>Sistemas Hospitalarios</Label>
                <Input
                  value={cvData.healthFields?.hospitalSystems?.join(', ') || ''}
                  onChange={(e) => onChange({
                    ...cvData,
                    healthFields: {
                      ...cvData.healthFields,
                      medicalSpecialties: cvData.healthFields?.medicalSpecialties || [],
                      professionalCertifications: cvData.healthFields?.professionalCertifications || [],
                      patientsAttended: cvData.healthFields?.patientsAttended || 0,
                      hospitalSystems: e.target.value.split(', ').filter(Boolean),
                      clinicalIndicators: cvData.healthFields?.clinicalIndicators || [],
                      publications: cvData.healthFields?.publications || []
                    }
                  })}
                  placeholder="HIS, EMR, PACS"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Publicaciones/Investigaciones</Label>
              <Textarea
                value={cvData.healthFields?.publications?.join('\n') || ''}
                onChange={(e) => onChange({
                  ...cvData,
                  healthFields: {
                    ...cvData.healthFields,
                    medicalSpecialties: cvData.healthFields?.medicalSpecialties || [],
                    professionalCertifications: cvData.healthFields?.professionalCertifications || [],
                    patientsAttended: cvData.healthFields?.patientsAttended || 0,
                    hospitalSystems: cvData.healthFields?.hospitalSystems || [],
                    clinicalIndicators: cvData.healthFields?.clinicalIndicators || [],
                    publications: e.target.value.split('\n').filter(Boolean)
                  }
                })}
                placeholder="Estudio sobre efectividad de tratamiento X&#10;Artículo en revista médica Y"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {cvData.selectedRoles.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Selecciona al menos un área profesional para acceder a campos específicos.</p>
        </div>
      )}
    </div>
  );
};

export default RoleSpecificForm;
