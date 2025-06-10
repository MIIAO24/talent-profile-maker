
import CVGenerator from '@/components/CVGenerator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full mb-6">
            <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-full">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-6 animate-scale-in">
            Generador de CV Profesional
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
            Crea tu currículum profesional de manera <span className="font-semibold text-primary">fácil y rápida</span>. 
            Personaliza tu CV según tu área profesional y destaca tus fortalezas.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Diseño Profesional</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 shadow-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Múltiples Especialidades</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 rounded-full px-4 py-2 shadow-sm">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>Descarga PDF</span>
            </div>
          </div>
        </div>
        
        <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
          <CVGenerator />
        </div>
      </div>
    </div>
  );
};

export default Index;
