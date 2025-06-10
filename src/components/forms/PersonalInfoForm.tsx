
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PersonalInfo } from '@/types/cv';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Datos Personales Básicos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre Completo *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Juan Pérez García"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="professionalTitle">Título Profesional *</Label>
          <Input
            id="professionalTitle"
            value={data.professionalTitle}
            onChange={(e) => handleChange('professionalTitle', e.target.value)}
            placeholder="Ingeniero de Software"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono de Contacto *</Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+56 9 8765 4321"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Profesional *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="juan.perez@email.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Ciudad/Ubicación *</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Santiago, Chile"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="document">RUT/DNI</Label>
          <Input
            id="document"
            value={data.document}
            onChange={(e) => handleChange('document', e.target.value)}
            placeholder="12.345.678-9"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/juan-perez"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="otherNetworks">Otras Redes Profesionales</Label>
          <Input
            id="otherNetworks"
            value={data.otherNetworks}
            onChange={(e) => handleChange('otherNetworks', e.target.value)}
            placeholder="GitHub, Portfolio, etc."
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
