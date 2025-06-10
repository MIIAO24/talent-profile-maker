
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Education, Certification, Reference } from '@/types/cv';

interface EducationFormProps {
  education: Education[];
  certifications: Certification[];
  references: Reference[];
  onEducationChange: (data: Education[]) => void;
  onCertificationsChange: (data: Certification[]) => void;
  onReferencesChange: (data: Reference[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ 
  education, 
  certifications, 
  references,
  onEducationChange, 
  onCertificationsChange,
  onReferencesChange 
}) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      graduationYear: new Date().getFullYear(),
      city: ''
    };
    onEducationChange([...education, newEducation]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const updated = education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onEducationChange(updated);
  };

  const removeEducation = (id: string) => {
    onEducationChange(education.filter(edu => edu.id !== id));
  };

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      institution: '',
      year: new Date().getFullYear(),
      level: 'Básico'
    };
    onCertificationsChange([...certifications, newCertification]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: any) => {
    const updated = certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    onCertificationsChange(updated);
  };

  const removeCertification = (id: string) => {
    onCertificationsChange(certifications.filter(cert => cert.id !== id));
  };

  const addReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      fullName: '',
      position: '',
      company: '',
      phone: ''
    };
    onReferencesChange([...references, newReference]);
  };

  const updateReference = (id: string, field: keyof Reference, value: any) => {
    const updated = references.map(ref => 
      ref.id === id ? { ...ref, [field]: value } : ref
    );
    onReferencesChange(updated);
  };

  const removeReference = (id: string) => {
    onReferencesChange(references.filter(ref => ref.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Formación Académica */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Formación Académica</h3>
          <Button onClick={addEducation}>+ Agregar Educación</Button>
        </div>

        {education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Formación Académica</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  Eliminar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título/Grado *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Ingeniería en Informática"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Institución *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="Universidad de Chile"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Año de Graduación</Label>
                  <Input
                    type="number"
                    value={edu.graduationYear}
                    onChange={(e) => updateEducation(edu.id, 'graduationYear', parseInt(e.target.value))}
                    min="1950"
                    max="2030"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Ciudad</Label>
                  <Input
                    value={edu.city}
                    onChange={(e) => updateEducation(edu.id, 'city', e.target.value)}
                    placeholder="Santiago, Chile"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certificaciones */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Certificaciones y Cursos</h3>
          <Button onClick={addCertification}>+ Agregar Certificación</Button>
        </div>

        {certifications.map((cert) => (
          <Card key={cert.id}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Certificación</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeCertification(cert.id)}
                >
                  Eliminar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre del Curso/Certificación *</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    placeholder="AWS Solutions Architect"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Institución *</Label>
                  <Input
                    value={cert.institution}
                    onChange={(e) => updateCertification(cert.id, 'institution', e.target.value)}
                    placeholder="Amazon Web Services"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Año de Obtención</Label>
                  <Input
                    type="number"
                    value={cert.year}
                    onChange={(e) => updateCertification(cert.id, 'year', parseInt(e.target.value))}
                    min="1950"
                    max="2030"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Nivel</Label>
                  <Select 
                    value={cert.level} 
                    onValueChange={(value: any) => updateCertification(cert.id, 'level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Básico">Básico</SelectItem>
                      <SelectItem value="Intermedio">Intermedio</SelectItem>
                      <SelectItem value="Avanzado">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referencias */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Referencias Profesionales (Opcional)</h3>
          <Button onClick={addReference}>+ Agregar Referencia</Button>
        </div>

        {references.map((ref) => (
          <Card key={ref.id}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Referencia Profesional</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => removeReference(ref.id)}
                >
                  Eliminar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre Completo *</Label>
                  <Input
                    value={ref.fullName}
                    onChange={(e) => updateReference(ref.id, 'fullName', e.target.value)}
                    placeholder="María González"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cargo Actual *</Label>
                  <Input
                    value={ref.position}
                    onChange={(e) => updateReference(ref.id, 'position', e.target.value)}
                    placeholder="Gerente de Tecnología"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Empresa *</Label>
                  <Input
                    value={ref.company}
                    onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                    placeholder="Tech Solutions S.A."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Teléfono de Contacto</Label>
                  <Input
                    value={ref.phone}
                    onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                    placeholder="+56 9 8765 4321"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;
