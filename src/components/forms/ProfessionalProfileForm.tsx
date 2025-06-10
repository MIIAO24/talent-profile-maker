
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ProfessionalProfile } from '@/types/cv';

interface ProfessionalProfileFormProps {
  data: ProfessionalProfile;
  onChange: (data: ProfessionalProfile) => void;
}

const ProfessionalProfileForm: React.FC<ProfessionalProfileFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ProfessionalProfile, value: any) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const addSpecialization = () => {
    handleChange('specializations', [...data.specializations, '']);
  };

  const updateSpecialization = (index: number, value: string) => {
    const updated = [...data.specializations];
    updated[index] = value;
    handleChange('specializations', updated);
  };

  const removeSpecialization = (index: number) => {
    const updated = data.specializations.filter((_, i) => i !== index);
    handleChange('specializations', updated);
  };

  const addIndustry = () => {
    handleChange('industries', [...data.industries, '']);
  };

  const updateIndustry = (index: number, value: string) => {
    const updated = [...data.industries];
    updated[index] = value;
    handleChange('industries', updated);
  };

  const removeIndustry = (index: number) => {
    const updated = data.industries.filter((_, i) => i !== index);
    handleChange('industries', updated);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Perfil Profesional</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary">Resumen Ejecutivo (2-4 líneas) *</Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Profesional con sólida experiencia en..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsExperience">Años de Experiencia *</Label>
          <Input
            id="yearsExperience"
            type="number"
            value={data.yearsExperience}
            onChange={(e) => handleChange('yearsExperience', parseInt(e.target.value) || 0)}
            placeholder="5"
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label>Áreas de Especialización</Label>
          {data.specializations.map((spec, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={spec}
                onChange={(e) => updateSpecialization(index, e.target.value)}
                placeholder="Desarrollo Web Frontend"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => removeSpecialization(index)}
              >
                ×
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addSpecialization}>
            + Agregar Especialización
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Sectores/Industrias de Experiencia</Label>
          {data.industries.map((industry, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={industry}
                onChange={(e) => updateIndustry(index, e.target.value)}
                placeholder="Tecnología, Fintech"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => removeIndustry(index)}
              >
                ×
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addIndustry}>
            + Agregar Industria
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="valueProposition">Propuesta de Valor Única</Label>
          <Textarea
            id="valueProposition"
            value={data.valueProposition}
            onChange={(e) => handleChange('valueProposition', e.target.value)}
            placeholder="¿Qué te diferencia de otros profesionales?"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfileForm;
