
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkExperience } from '@/types/cv';

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      city: '',
      achievements: [''],
      quantifiableResults: ''
    };
    onChange([...data, newExperience]);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    const updated = data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const addAchievement = (id: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      updateExperience(id, 'achievements', [...experience.achievements, '']);
    }
  };

  const updateAchievement = (id: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const updated = [...experience.achievements];
      updated[index] = value;
      updateExperience(id, 'achievements', updated);
    }
  };

  const removeAchievement = (id: string, index: number) => {
    const experience = data.find(exp => exp.id === id);
    if (experience) {
      const updated = experience.achievements.filter((_, i) => i !== index);
      updateExperience(id, 'achievements', updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Experiencia Laboral</h3>
        <Button onClick={addExperience}>+ Agregar Experiencia</Button>
      </div>

      {data.map((experience) => (
        <Card key={experience.id}>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Experiencia Laboral</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => removeExperience(experience.id)}
              >
                Eliminar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cargo/Posición *</Label>
                <Input
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  placeholder="Desarrollador Full Stack"
                />
              </div>

              <div className="space-y-2">
                <Label>Nombre de la Empresa *</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Tech Company S.A."
                />
              </div>

              <div className="space-y-2">
                <Label>Fecha de Inicio</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Fecha de Fin</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  placeholder="Actual si aún trabajas aquí"
                />
              </div>

              <div className="space-y-2">
                <Label>Ciudad</Label>
                <Input
                  value={experience.city}
                  onChange={(e) => updateExperience(experience.id, 'city', e.target.value)}
                  placeholder="Santiago, Chile"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Logros/Responsabilidades Clave</Label>
              {experience.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    value={achievement}
                    onChange={(e) => updateAchievement(experience.id, index, e.target.value)}
                    placeholder="• Desarrollé una aplicación web que aumentó la eficiencia en un 30%"
                    rows={2}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeAchievement(experience.id, index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => addAchievement(experience.id)}
              >
                + Agregar Logro
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Resultados Cuantificables</Label>
              <Textarea
                value={experience.quantifiableResults}
                onChange={(e) => updateExperience(experience.id, 'quantifiableResults', e.target.value)}
                placeholder="Aumenté las ventas en 25%, reduje tiempos de proceso en 40%..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No hay experiencias laborales agregadas.</p>
          <p className="text-sm">Haz clic en "Agregar Experiencia" para comenzar.</p>
        </div>
      )}
    </div>
  );
};

export default WorkExperienceForm;
