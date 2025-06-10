
import CVGenerator from '@/components/CVGenerator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Generador de CV Profesional
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crea tu currículum profesional de manera fácil y rápida. 
            Personaliza tu CV según tu área profesional y destaca tus fortalezas.
          </p>
        </div>
        <CVGenerator />
      </div>
    </div>
  );
};

export default Index;
