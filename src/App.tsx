import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Dumbbell, 
  Users, 
  Target, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  CheckCircle2,
  ArrowRight,
  Calculator,
  Info
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  
  // IMC State
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');

  const calculateIMC = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // convert cm to m
    if (w > 0 && h > 0) {
      const val = w / (h * h);
      setBmi(val);
      
      if (val < 18.5) setBmiCategory('Abaixo do peso');
      else if (val < 25) setBmiCategory('Peso normal');
      else if (val < 30) setBmiCategory('Sobrepeso');
      else if (val < 35) setBmiCategory('Obesidade Grau I');
      else if (val < 40) setBmiCategory('Obesidade Grau II');
      else setBmiCategory('Obesidade Grau III');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      tl.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.2
      })
      .from(".hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .from(".hero-cta", {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3");

      // Scroll Reveal for sections
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Bento Grid Stagger
      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: bentoRef.current,
          start: "top 75%"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    });

    return () => ctx.revert();
  }, []);

  const whatsappLink = "https://wa.me/5517981327579";

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 glass py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center">
            <Dumbbell size={18} className="text-black" />
          </div>
          <span>LIFE <span className="text-brand-accent">STUDIO</span></span>
        </div>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-white/70">
          <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
          <a href="#metodo" className="hover:text-white transition-colors">Método</a>
          <a href="#planos" className="hover:text-white transition-colors">Planos</a>
          <a href="#contato" className="hover:text-white transition-colors">Contato</a>
        </nav>

        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-accent hover:text-black transition-all duration-300"
        >
          AVALIAÇÃO GRÁTIS
        </a>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-brand-bg z-10" />
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            alt="Gym Background" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-20 max-w-5xl text-center">
          <span className="hero-sub inline-block mb-4 px-4 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-bold tracking-[0.3em] uppercase">
            Catanduva • Treinamento de Elite
          </span>
          <h1 className="hero-title text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6 text-gradient">
            VOCÊ NÃO PRECISA TREINAR MAIS.<br />
            <span className="text-brand-accent">PRECISA TREINAR CERTO.</span>
          </h1>
          <p className="hero-sub text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Há 11 anos transformando vidas em Catanduva através de um método personalizado que respeita sua individualidade e foca em resultados reais.
          </p>
          <div className="hero-cta flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-brand-accent text-black px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              AGENDAR MINHA AVALIAÇÃO
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#sobre"
              className="px-8 py-4 rounded-full text-lg font-bold border border-white/20 hover:bg-white/5 transition-colors"
            >
              CONHECER O STUDIO
            </a>
          </div>
        </div>
      </section>

      {/* Marquee Authority */}
      <div className="py-8 bg-white/5 border-y border-white/10 overflow-hidden whitespace-nowrap">
        <div className="marquee-content gap-12 text-sm font-bold uppercase tracking-[0.2em] text-white/40">
          <span>11 ANOS DE EXPERIÊNCIA</span>
          <span className="text-brand-accent">•</span>
          <span>TREINAMENTO PERSONALIZADO</span>
          <span className="text-brand-accent">•</span>
          <span>ACOMPANHAMENTO DE ELITE</span>
          <span className="text-brand-accent">•</span>
          <span>CATANDUVA - SP</span>
          <span className="text-brand-accent">•</span>
          <span>RESULTADOS COMPROVADOS</span>
          <span className="text-brand-accent">•</span>
          {/* Duplicate for seamless loop */}
          <span>11 ANOS DE EXPERIÊNCIA</span>
          <span className="text-brand-accent">•</span>
          <span>TREINAMENTO PERSONALIZADO</span>
          <span className="text-brand-accent">•</span>
          <span>ACOMPANHAMENTO DE ELITE</span>
          <span className="text-brand-accent">•</span>
          <span>CATANDUVA - SP</span>
          <span className="text-brand-accent">•</span>
          <span>RESULTADOS COMPROVADOS</span>
          <span className="text-brand-accent">•</span>
        </div>
      </div>

      {/* Bento Grid Differentials */}
      <section id="metodo" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16 reveal">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">POR QUE O <span className="text-brand-accent">LIFE STUDIO?</span></h2>
          <p className="text-white/50 max-w-xl">Esqueça as academias lotadas e treinos genéricos. Aqui, cada repetição é pensada para o seu objetivo.</p>
        </div>

        <div ref={bentoRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[240px]">
          {/* Item 1 */}
          <div className="bento-item md:col-span-2 md:row-span-2 glass rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
              <Users size={120} />
            </div>
            <h3 className="text-3xl font-bold mb-2">Personal Trainer</h3>
            <p className="text-white/60">Acompanhamento de perto em cada exercício, garantindo execução perfeita e segurança total.</p>
          </div>

          {/* Item 2 */}
          <div className="bento-item md:col-span-2 glass rounded-3xl p-8 flex flex-col justify-center bg-gradient-to-br from-brand-accent/20 to-transparent">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-brand-accent rounded-2xl text-black">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold">Foco em Resultados</h3>
            </div>
            <p className="text-white/60">Avaliação física completa e prescrição baseada em ciência para você chegar onde deseja.</p>
          </div>

          {/* Item 3 */}
          <div className="bento-item glass rounded-3xl p-8 flex flex-col justify-center">
            <Clock size={32} className="text-brand-accent mb-4" />
            <h3 className="text-xl font-bold mb-2">11 Anos</h3>
            <p className="text-sm text-white/50">De tradição e excelência cuidando da saúde de Catanduva.</p>
          </div>

          {/* Item 4 */}
          <div className="bento-item glass rounded-3xl p-8 flex flex-col justify-center">
            <MapPin size={32} className="text-brand-accent mb-4" />
            <h3 className="text-xl font-bold mb-2">Ambiente VIP</h3>
            <p className="text-sm text-white/50">Espaço boutique, climatizado e focado no seu treino.</p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white/5 reveal">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">O PROBLEMA DO <span className="text-red-500">TREINO GENÉRICO</span></h2>
            <ul className="space-y-6">
              {[
                "Falta de constância por não ver resultado real",
                "Treino copiado que não respeita suas limitações",
                "Execução errada e alto risco de dor ou lesão",
                "Falta de progressão de carga e técnica"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full border border-red-500/50 flex items-center justify-center text-red-500 text-xs">✕</div>
                  <span className="text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden glass">
            <img 
              src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop" 
              alt="Focus" 
              className="w-full h-full object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
              <p className="text-2xl font-bold italic">"No Life Studio, nós corrigimos o que as grandes academias ignoram."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">QUEM TREINA, <span className="text-brand-accent">RECOMENDA</span></h2>
            <p className="text-white/50">A opinião de quem vive a experiência Life Studio todos os dias.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Ricardo S.", text: "O acompanhamento é outro nível. Em 3 meses tive mais resultado que em 1 ano de academia comum.", role: "Aluno há 2 anos" },
              { name: "Mariana F.", text: "O ambiente é super acolhedor e os profissionais são extremamente capacitados. Recomendo muito!", role: "Aluna há 6 meses" },
              { name: "João P.", text: "Finalmente um lugar onde o treino é pensado para mim. Sem filas, sem enrolação.", role: "Aluno há 1 ano" }
            ].map((t, i) => (
              <div key={i} className="glass p-8 rounded-3xl relative">
                <div className="text-brand-accent mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                </div>
                <p className="text-white/80 italic mb-6">"{t.text}"</p>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMC Calculator Section */}
      <section className="py-24 px-6 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                CALCULE SEU <span className="text-brand-accent">IMC</span>
              </h2>
              <p className="text-white/50 mb-8 leading-relaxed">
                O Índice de Massa Corporal (IMC) é um ponto de partida para entender sua saúde física. 
                Use nossa calculadora para descobrir sua categoria e veja como o Life Studio pode te ajudar a alcançar sua melhor versão.
              </p>
              
              <div className="glass p-8 rounded-[2rem] space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Peso (kg)</label>
                    <input 
                      type="number" 
                      placeholder="Ex: 75"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Altura (cm)</label>
                    <input 
                      type="number" 
                      placeholder="Ex: 175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>
                
                <button 
                  onClick={calculateIMC}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-brand-accent transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator size={20} />
                  CALCULAR AGORA
                </button>

                {bmi !== null && (
                  <div className="pt-6 border-t border-white/10 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Seu Resultado</p>
                      <p className="text-3xl font-black text-brand-accent">{bmi.toFixed(1)}</p>
                    </div>
                    <div className="p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-xl">
                      <p className="text-brand-accent font-bold text-center uppercase tracking-widest">
                        {bmiCategory}
                      </p>
                    </div>
                    <p className="text-xs text-white/40 mt-4 text-center italic">
                      *Este cálculo é apenas informativo. Uma avaliação profissional completa é necessária para resultados precisos.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-brand-accent/20 blur-3xl rounded-full opacity-30" />
                <div className="relative glass p-8 rounded-[3rem]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-brand-accent/20 rounded-2xl text-brand-accent">
                      <Info size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">Por que se cuidar?</h3>
                  </div>
                  <div className="space-y-6">
                    {[
                      { title: "Longevidade", desc: "Manter um peso saudável reduz riscos de doenças crônicas." },
                      { title: "Energia", desc: "O treino certo melhora sua disposição para o dia a dia." },
                      { title: "Autoestima", desc: "Sentir-se bem com seu corpo reflete em todas as áreas da vida." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="mt-1">
                          <CheckCircle2 size={18} className="text-brand-accent" />
                        </div>
                        <div>
                          <p className="font-bold text-white/90">{item.title}</p>
                          <p className="text-sm text-white/50">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-sm text-white/70 mb-4">
                      Independente do seu resultado, o <strong>Life Studio</strong> tem o plano perfeito para te levar ao próximo nível.
                    </p>
                    <a href={whatsappLink} target="_blank" rel="noreferrer" className="text-brand-accent font-bold flex items-center gap-2 hover:gap-3 transition-all">
                      Falar com um especialista <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white/5 reveal">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tighter mb-12 text-center">DÚVIDAS FREQUENTES</h2>
          <div className="space-y-4">
            {[
              { q: "Nunca treinei, consigo começar?", a: "Com certeza! Nosso método é ideal para iniciantes, pois você terá um profissional ao seu lado em cada movimento." },
              { q: "Tenho dor ou limitação, dá para adaptar?", a: "Sim. Realizamos uma avaliação inicial para entender suas limitações e prescrever exercícios que ajudem na sua recuperação e fortalecimento." },
              { q: "Quanto tempo até ver resultado?", a: "Os resultados variam, mas com constância e nosso método, você sentirá melhoras na energia e disposição já nas primeiras semanas." },
              { q: "Como funciona a avaliação?", a: "É um momento onde conversamos sobre seus objetivos, histórico de saúde e realizamos testes de movimento para criar seu plano ideal." }
            ].map((faq, i) => (
              <details key={i} className="glass rounded-2xl overflow-hidden group">
                <summary className="p-6 cursor-pointer font-bold flex justify-between items-center list-none">
                  {faq.q}
                  <ChevronRight size={20} className="group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contato" className="py-24 px-6 text-center reveal">
        <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8">
            PRONTO PARA A SUA <br />
            <span className="text-brand-accent">TRANSFORMAÇÃO?</span>
          </h2>
          <p className="text-xl text-white/60 mb-12">
            Agende agora sua avaliação gratuita e descubra por que somos referência em treinamento personalizado em Catanduva.
          </p>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-brand-accent text-black px-12 py-6 rounded-full text-xl font-black hover:scale-105 transition-transform shadow-[0_0_40px_rgba(16,185,129,0.3)]"
          >
            FALAR NO WHATSAPP
            <Phone size={24} />
          </a>
          
          <div className="mt-16 grid md:grid-cols-2 gap-8 text-left border-t border-white/10 pt-12">
            <div>
              <p className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">Localização</p>
              <p className="text-white/70">Rua Francisco Beltrão, 128<br />Residencial Isabel – Catanduva/SP</p>
            </div>
            <div>
              <p className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">Redes Sociais</p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/lifestudiopersonalcatanduva/" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors"><Instagram /></a>
                <a href="https://www.facebook.com/people/Life-Studio-Personal/100063636157634/" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors"><Facebook /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-white/30 text-xs uppercase tracking-[0.3em]">
        <p>© 2026 LIFE STUDIO PERSONAL • TODOS OS DIREITOS RESERVADOS</p>
      </footer>
    </div>
  );
}
