
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TechnicalSkill, Language } from '@/types/cv';

interface SkillsFormProps {
  technicalSkills: TechnicalSkill[];
  languages: Language[];
  softSkills: string[];
  onTechnicalSkillsChange: (data: TechnicalSkill[]) => void;
  onLanguagesChange: (data: Language[]) => void;
  onSoftSkillsChange: (data: string[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ 
  technicalSkills, 
  languages, 
  softSkills,
  onTechnicalSkillsChange, 
  onLanguagesChange,
  onSoftSkillsChange 
}) => {
  const addTechnicalSkill = () => {
    const newSkill: TechnicalSkill = {
      id: Date.now().toString(),
      name: '',
      level: 'Básico',
      category: 'Software/Programas'
    };
    onTechnicalSkillsChange([...technicalSkills, newSkill]);
  };

  const updateTechnicalSkill = (id: string, field: keyof TechnicalSkill, value: any) => {
    const updated = technicalSkills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    onTechnicalSkillsChange(updated);
  };

  const removeTechnicalSkill = (id: string) => {
    onTechnicalSkillsChange(technicalSkills.filter(skill => skill.id !== id));
  };

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      level: 'Básico'
    };
    onLanguagesChange([...languages, newLanguage]);
  };

  const updateLanguage = (id: string, field: keyof Language, value: any) => {
    const updated = languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    onLanguagesChange(updated);
  };

  const removeLanguage = (id: string) => {
    onLanguagesChange(languages.filter(lang => lang.id !== id));
  };

  const addSoftSkill = () => {
    onSoftSkillsChange([...softSkills, '']);
  };

  const updateSoftSkill = (index: number, value: string) => {
    const updated = [...softSkills];
    updated[index] = value;
    onSoftSkillsChange(updated);
  };

  const removeSoftSkill = (index: number) => {
    onSoftSkillsChange(softSkills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Competencias Técnicas */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Competencias Técnicas</h3>
          <Button onClick={addTechnicalSkill}>+ Agregar Competencia</Button>
        </div>

        {technicalSkills.map((skill) => (
          <Card key={skill.id}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Nombre *</Label>
                  <Input
                    value={skill.name}
                    onChange={(e) => updateTechnicalSkill(skill.id, 'name', e.target.value)}
                    placeholder="React.js"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select 
                    value={skill.category} 
                    onValueChange={(value) => updateTechnicalSkill(skill.id, 'category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software/Programas">Software/Programas</SelectItem>
                      <SelectItem value="Sistemas/Plataformas">Sistemas/Plataformas</SelectItem>
                      <SelectItem value="Lenguajes de Programación">Lenguajes de Programación</SelectItem>
                      <SelectItem value="Frameworks">Frameworks</SelectItem>
                      <SelectItem value="Bases de Datos">Bases de Datos</SelectItem>
                      <SelectItem value="Herramientas">Herramientas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Nivel</Label>
                  <Select 
                    value={skill.level} 
                    onValueChange={(value: any) => updateTechnicalSkill(skill.id, 'level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Básico">Básico</SelectItem>
                      <SelectItem value="Intermedio">Intermedio</SelectItem>
                      <SelectItem value="Avanzado">Avanzado</SelectItem>
                      <SelectItem value="Experto">Experto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeTechnicalSkill(skill.id)}
                    className="w-full"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Idiomas */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Idiomas</h3>
          <Button onClick={addLanguage}>+ Agregar Idioma</Button>
        </div>

        {languages.map((language) => (
          <Card key={language.id}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Idioma *</Label>
                  <Input
                    value={language.name}
                    onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                    placeholder="Inglés"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Nivel</Label>
                  <Select 
                    value={language.level} 
                    onValueChange={(value: any) => updateLanguage(language.id, 'level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Básico">Básico</SelectItem>
                      <SelectItem value="Intermedio">Intermedio</SelectItem>
                      <SelectItem value="Avanzado">Avanzado</SelectItem>
                      <SelectItem value="Nativo">Nativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeLanguage(language.id)}
                    className="w-full"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Habilidades Blandas */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Habilidades Clave (6-8 habilidades blandas)</h3>
          <Button onClick={addSoftSkill}>+ Agregar Habilidad</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {softSkills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={skill}
                onChange={(e) => updateSoftSkill(index, e.target.value)}
                placeholder="Liderazgo, Trabajo en equipo..."
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => removeSoftSkill(index)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        {softSkills.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-sm">Agrega tus habilidades blandas más relevantes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;
