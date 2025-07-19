import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  User, 
  Target, 
  Dumbbell, 
  ChefHat, 
  Pill, 
  TrendingUp, 
  Play, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  Users,
  Award,
  ExternalLink,
  MessageCircle,
  Phone,
  Camera
} from 'lucide-react';

// Fórmulas químicas para animação no background
const formulasQuimicas = [
  'C₈H₁₁NO₂', // Testosterona
  'C₁₉H₂₈O₂', // Testosterona
  'C₂₁H₃₂O₃', // Cortisol
  'C₄H₆N₄O₃', // Creatina
  'C₆H₁₃N₃O₂', // Arginina
  'C₉H₁₁NO₃', // Tirosina
  'C₁₁H₁₂N₂O₂', // Triptofano
  'C₆H₁₄N₄O₂', // Creatina
  'C₅H₉NO₄', // Glutamina
  'C₆H₁₃N₃O₂' // Arginina
];

// Produtos ergogênicos (anabolizantes) AES Labs
const produtosErgogenicos = [
  {
    nome: 'Testosterona Enantato',
    descricao: 'Hormônio anabólico para ganho de massa muscular',
    imagem: 'https://aeslabs.com.br/wp-content/uploads/2023/05/testosterona-enantato-aes-labs.jpg',
    link: 'https://aeslabs.com.br/produto/testosterona-enantato',
    categoria: 'Anabolizante'
  },
  {
    nome: 'Trembolona Acetato',
    descricao: 'Potente anabólico para definição e força',
    imagem: 'https://aeslabs.com.br/wp-content/uploads/2023/05/trembolona-acetato-aes-labs.jpg',
    link: 'https://aeslabs.com.br/produto/trembolona-acetato',
    categoria: 'Anabolizante'
  },
  {
    nome: 'Stanozolol (Winstrol)',
    descricao: 'Ideal para cutting e definição muscular',
    imagem: 'https://aeslabs.com.br/wp-content/uploads/2023/05/stanozolol-aes-labs.jpg',
    link: 'https://aeslabs.com.br/produto/stanozolol',
    categoria: 'Anabolizante'
  },
  {
    nome: 'Oxandrolona (Anavar)',
    descricao: 'Anabólico suave para homens e mulheres',
    imagem: 'https://aeslabs.com.br/wp-content/uploads/2023/05/oxandrolona-aes-labs.jpg',
    link: 'https://aeslabs.com.br/produto/oxandrolona',
    categoria: 'Anabolizante'
  },
  {
    nome: 'Durateston',
    descricao: 'Blend de testosteronas para TRT',
    imagem: 'https://aeslabs.com.br/wp-content/uploads/2023/05/durateston-aes-labs.jpg',
    link: 'https://aeslabs.com.br/produto/durateston',
    categoria: 'Anabolizante'
  },
  {
    nome: 'HGH (Hormônio do Crescimento)',
    descricao: 'Hormônio para recuperação e anti-aging',
    imagem: 'https://aeslabs.com.br/wp-content/uploads/2023/05/hgh-aes-labs.jpg',
    link: 'https://aeslabs.com.br/produto/hgh',
    categoria: 'Hormônio'
  }
];

// Treinos completos com repetições e vídeos
const treinos = {
  hipertrofia: {
    'Segunda': { 
      nome: 'Peito + Tríceps', 
      exercicios: [
        { nome: 'Supino Reto', repeticoes: '4x8-12', video: 'https://www.youtube.com/embed/rT7DgCr-3pg' },
        { nome: 'Supino Inclinado', repeticoes: '4x8-10', video: 'https://www.youtube.com/embed/SrqOu55lrYU' },
        { nome: 'Crucifixo', repeticoes: '3x10-12', video: 'https://www.youtube.com/embed/eozdVDA78K0' },
        { nome: 'Tríceps Testa', repeticoes: '4x10-12', video: 'https://www.youtube.com/embed/d_KZxkY_0cM' }
      ]
    },
    'Terça': { 
      nome: 'Costas + Bíceps', 
      exercicios: [
        { nome: 'Puxada Frontal', repeticoes: '4x8-12', video: 'https://www.youtube.com/embed/CAwf7n6Luuc' },
        { nome: 'Remada Curvada', repeticoes: '4x8-10', video: 'https://www.youtube.com/embed/FWJR5Ve8bnQ' },
        { nome: 'Rosca Direta', repeticoes: '4x10-12', video: 'https://www.youtube.com/embed/ykJmrZ5v0Oo' },
        { nome: 'Rosca Martelo', repeticoes: '3x12-15', video: 'https://www.youtube.com/embed/zC3nLlEvin4' }
      ]
    },
    'Quarta': { 
      nome: 'Pernas', 
      exercicios: [
        { nome: 'Agachamento', repeticoes: '4x10-15', video: 'https://www.youtube.com/embed/Dy28eq2PjcM' },
        { nome: 'Leg Press', repeticoes: '4x12-15', video: 'https://www.youtube.com/embed/IZxyjW7MPJQ' },
        { nome: 'Cadeira Extensora', repeticoes: '3x12-15', video: 'https://www.youtube.com/embed/YyvSfVjQeL0' },
        { nome: 'Mesa Flexora', repeticoes: '3x10-12', video: 'https://www.youtube.com/embed/1Tq3QdYUuHs' }
      ]
    },
    'Quinta': { 
      nome: 'Ombros', 
      exercicios: [
        { nome: 'Desenvolvimento', repeticoes: '4x8-12', video: 'https://www.youtube.com/embed/qEwKCR5JCog' },
        { nome: 'Elevação Lateral', repeticoes: '4x12-15', video: 'https://www.youtube.com/embed/3VcKaXpzqRo' },
        { nome: 'Elevação Frontal', repeticoes: '3x12-15', video: 'https://www.youtube.com/embed/qzaKUHI8Xl4' },
        { nome: 'Encolhimento', repeticoes: '4x12-15', video: 'https://www.youtube.com/embed/cJRVVxmytaM' }
      ]
    },
    'Sexta': { 
      nome: 'Braços', 
      exercicios: [
        { nome: 'Rosca Bíceps', repeticoes: '4x10-12', video: 'https://www.youtube.com/embed/ykJmrZ5v0Oo' },
        { nome: 'Tríceps Pulley', repeticoes: '4x10-12', video: 'https://www.youtube.com/embed/2-LAMcpzODU' },
        { nome: 'Rosca Martelo', repeticoes: '3x12-15', video: 'https://www.youtube.com/embed/zC3nLlEvin4' },
        { nome: 'Tríceps Francês', repeticoes: '3x10-12', video: 'https://www.youtube.com/embed/d_KZxkY_0cM' }
      ]
    },
    'Sábado': { 
      nome: 'Cardio + Core', 
      exercicios: [
        { nome: 'Esteira', repeticoes: '30 minutos', video: 'https://www.youtube.com/embed/30W5wjgODSo' },
        { nome: 'Abdominal', repeticoes: '3x15-20', video: 'https://www.youtube.com/embed/1fbU_MkV7NE' },
        { nome: 'Prancha', repeticoes: '3x30-60s', video: 'https://www.youtube.com/embed/ASdvN_XEl_c' },
        { nome: 'Bicicleta', repeticoes: '3x20 cada lado', video: 'https://www.youtube.com/embed/9FGilxCbdz8' }
      ]
    },
    'Domingo': { 
      nome: 'Descanso Ativo', 
      exercicios: [
        { nome: 'Caminhada', repeticoes: '45 minutos', video: 'https://www.youtube.com/embed/30W5wjgODSo' },
        { nome: 'Alongamento', repeticoes: '15 minutos', video: 'https://www.youtube.com/embed/g_tea8ZNk5A' },
        { nome: 'Yoga', repeticoes: '20 minutos', video: 'https://www.youtube.com/embed/v7AYKMP6rOE' },
        { nome: 'Relaxamento', repeticoes: '10 minutos', video: 'https://www.youtube.com/embed/1ZYbU82GVz4' }
      ]
    }
  }
};

// Receitas completas com cardápios e vídeos
const receitas = {
  hipertrofia: [
    { 
      nome: 'Frango Grelhado com Batata Doce', 
      calorias: 520, 
      proteina: '45g', 
      tempo: '45min',
      video: 'https://www.youtube.com/embed/FjsATRQnzQs',
      ingredientes: [
        '200g de peito de frango',
        '150g de batata doce',
        '1 colher de azeite',
        'Temperos a gosto',
        'Salada verde'
      ],
      preparo: [
        'Tempere o frango e grelhe por 15 minutos',
        'Cozinhe a batata doce no vapor por 20 minutos',
        'Monte o prato com salada verde',
        'Regue com azeite e sirva'
      ]
    },
    { 
      nome: 'Omelete Proteica com Aveia', 
      calorias: 420, 
      proteina: '32g', 
      tempo: '15min',
      video: 'https://www.youtube.com/embed/qJOTqKNTd-w',
      ingredientes: [
        '3 ovos inteiros',
        '2 claras',
        '30g de aveia',
        '50g de queijo cottage',
        'Cebolinha picada'
      ],
      preparo: [
        'Bata os ovos com as claras',
        'Adicione a aveia e misture',
        'Faça a omelete na frigideira',
        'Recheie com cottage e cebolinha'
      ]
    },
    { 
      nome: 'Salmão com Quinoa e Legumes', 
      calorias: 480, 
      proteina: '38g', 
      tempo: '30min',
      video: 'https://www.youtube.com/embed/1BjHdBVWKWc',
      ingredientes: [
        '150g de salmão',
        '80g de quinoa',
        'Brócolis e cenoura',
        'Azeite extra virgem',
        'Limão e ervas'
      ],
      preparo: [
        'Cozinhe a quinoa por 15 minutos',
        'Grelhe o salmão com limão',
        'Refogue os legumes no vapor',
        'Monte o prato e tempere com azeite'
      ]
    },
    { 
      nome: 'Smoothie Proteico Pós-Treino', 
      calorias: 350, 
      proteina: '28g', 
      tempo: '5min',
      video: 'https://www.youtube.com/embed/ub47Ps_2T3o',
      ingredientes: [
        '1 scoop de whey protein',
        '1 banana média',
        '200ml de leite desnatado',
        '1 colher de pasta de amendoim',
        'Gelo a gosto'
      ],
      preparo: [
        'Coloque todos os ingredientes no liquidificador',
        'Bata por 2 minutos até ficar cremoso',
        'Adicione gelo se necessário',
        'Sirva imediatamente após o treino'
      ]
    },
    { 
      nome: 'Peito de Peru com Arroz Integral', 
      calorias: 450, 
      proteina: '40g', 
      tempo: '35min',
      video: 'https://www.youtube.com/embed/8XqHZrZkwYs',
      ingredientes: [
        '180g de peito de peru',
        '100g de arroz integral',
        'Feijão preto',
        'Salada de folhas verdes',
        'Tomate e pepino'
      ],
      preparo: [
        'Cozinhe o arroz integral por 25 minutos',
        'Grelhe o peito de peru temperado',
        'Prepare o feijão preto',
        'Monte o prato com salada fresca'
      ]
    }
  ]
};

// Depoimentos
const depoimentos = [
  {
    nome: "João Santos",
    idade: "35 anos",
    resultado: "Perdeu 15kg e ganhou saúde",
    objetivo: "Emagrecimento",
    tempo: "5 meses",
    foto: "/api/placeholder/60/60"
  },
  {
    nome: "Maria Silva",
    idade: "28 anos", 
    resultado: "Ganhou 8kg de massa muscular",
    objetivo: "Hipertrofia",
    tempo: "6 meses",
    foto: "/api/placeholder/60/60"
  },
  {
    nome: "Carlos Oliveira",
    idade: "42 anos",
    resultado: "Definição corporal incrível",
    objetivo: "Definição",
    tempo: "4 meses",
    foto: "/api/placeholder/60/60"
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState('assessment');
  const [userData, setUserData] = useState({});
  const [activeTab, setActiveTab] = useState('treino');
  const [selectedDay, setSelectedDay] = useState('Segunda');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Componente de fórmulas químicas animadas
  const ChemicalFormulas = () => {
    return (
      <div className="chemical-formulas">
        {formulasQuimicas.map((formula, index) => (
          <div
            key={index}
            className="chemical-formula"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            {formula}
          </div>
        ))}
      </div>
    );
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % depoimentos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      nome: formData.get('nome'),
      altura: parseInt(formData.get('altura')),
      peso: parseInt(formData.get('peso')),
      genero: formData.get('genero'),
      objetivo: formData.get('objetivo')
    };
    
    // Calcular IMC
    const imc = data.peso / ((data.altura / 100) ** 2);
    data.imc = imc.toFixed(1);
    
    // Classificar IMC
    let classificacao = '';
    if (imc < 18.5) classificacao = 'Abaixo do peso';
    else if (imc < 25) classificacao = 'Peso normal';
    else if (imc < 30) classificacao = 'Sobrepeso';
    else classificacao = 'Obesidade';
    
    data.classificacao = classificacao;
    
    setUserData(data);
    setCurrentStep('dashboard');
  };

  if (currentStep === 'assessment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Fórmulas químicas animadas */}
        <ChemicalFormulas />
        
        {/* Hero Section with Slides */}
        <div className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          
          {/* Background Slides */}
          <div className="absolute inset-0">
            <img 
              src={`/api/placeholder/1920/1080`}
              alt="Fitness Hero"
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 flex items-center justify-center h-full px-4">
            <div className="max-w-md w-full">
              <div className="glass-card p-8">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-white mb-2 glow-text">
                    Protocolo Geral Adaptado
                  </h1>
                  <p className="text-gray-300">Transformação Completa Personalizada</p>
                  
                  <div className="flex justify-center gap-4 mt-4">
                    <div className="badge">
                      <TrendingUp size={16} />
                      95% Taxa de Sucesso
                    </div>
                    <div className="badge">
                      <Users size={16} />
                      10k+ Transformações
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Nome Completo</label>
                    <input
                      type="text"
                      name="nome"
                      className="input-field"
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Altura (cm)</label>
                      <input
                        type="number"
                        name="altura"
                        min="140"
                        max="220"
                        className="input-field"
                        placeholder="Ex: 175"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Peso (kg)</label>
                      <input
                        type="number"
                        name="peso"
                        min="40"
                        max="200"
                        className="input-field"
                        placeholder="Ex: 70"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-3">Gênero</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="radio-option">
                        <input type="radio" name="genero" value="masculino" />
                        <span>Masculino</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="genero" value="feminino" />
                        <span>Feminino</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-3">Objetivo Principal</label>
                    <div className="space-y-2">
                      <label className="radio-option">
                        <input type="radio" name="objetivo" value="hipertrofia" />
                        <span>💪 Hipertrofia</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="objetivo" value="definicao" />
                        <span>🔥 Definição</span>
                      </label>
                      <label className="radio-option">
                        <input type="radio" name="objetivo" value="emagrecimento" />
                        <span>⚡ Emagrecimento</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    <TrendingUp size={20} />
                    Gerar Protocolo Personalizado
                  </button>
                </form>

                {/* Botões de WhatsApp e Referências */}
                <div className="mt-6 space-y-3">
                  <a 
                    href="https://wa.me/5554999537465?text=Olá! Gostaria de saber mais sobre o Protocolo Geral Adaptado"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full"
                  >
                    <MessageCircle size={20} />
                    Falar com Especialista
                  </a>
                  
                  <a 
                    href="https://chat.whatsapp.com/Hbtj5zyEul253y1A7t2nx9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-group w-full"
                  >
                    <Users size={20} />
                    Grupo de Referências
                  </a>
                  
                  <a 
                    href="https://photos.app.goo.gl/KRbsVzfcnyTahiUz6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gallery w-full"
                  >
                    <Camera size={20} />
                    Ver Clientes Satisfeitos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Fórmulas químicas animadas */}
      <ChemicalFormulas />
      
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white glow-text">Protocolo Geral Adaptado</h1>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-medium">Olá, {userData.nome}!</p>
                <p className="text-cyan-400 text-sm">IMC: {userData.imc} - {userData.classificacao}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <User size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Timeline Horizontal Compacta */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-xs text-cyan-400 hidden md:block">Avaliação</span>
              </div>
              <div className="w-4 h-0.5 bg-gray-600"></div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-xs text-gray-400 hidden md:block">Semana 1-4</span>
              </div>
              <div className="w-4 h-0.5 bg-gray-600"></div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-xs text-gray-400 hidden md:block">Semana 5-8</span>
              </div>
              <div className="w-4 h-0.5 bg-gray-600"></div>
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span className="text-xs text-gray-400 hidden md:block">Semana 9-12</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="tab-container mb-8">
          <button
            className={`tab ${activeTab === 'treino' ? 'active' : ''}`}
            onClick={() => setActiveTab('treino')}
          >
            <Dumbbell size={16} />
            Treino
          </button>
          <button
            className={`tab ${activeTab === 'dieta' ? 'active' : ''}`}
            onClick={() => setActiveTab('dieta')}
          >
            <ChefHat size={16} />
            Dieta
          </button>
          <button
            className={`tab ${activeTab === 'protocolo' ? 'active' : ''}`}
            onClick={() => setActiveTab('protocolo')}
          >
            <Pill size={16} />
            Protocolo
          </button>
        </div>

        {/* Content */}
        <div className="content-area">
          {activeTab === 'treino' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                Plano de Treino - {userData.objetivo}
              </h3>
              
              <div className="day-selector mb-6">
                {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day) => (
                  <button
                    key={day}
                    className={`day-btn ${selectedDay === day ? 'active' : ''}`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <div className="exercise-card">
                <h4 className="text-xl font-semibold text-cyan-400 mb-4">
                  {treinos.hipertrofia[selectedDay].nome}
                </h4>
                <div className="grid gap-3">
                  {treinos.hipertrofia[selectedDay].exercicios.map((exercicio, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <span className="text-white font-medium text-lg">{exercicio.nome}</span>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-cyan-400 font-medium">{exercicio.repeticoes}</span>
                          <Play size={16} className="text-green-400" />
                        </div>
                      </div>
                      {exercicio.video && (
                        <div className="w-40 h-24 ml-4">
                          <iframe
                            src={exercicio.video}
                            className="w-full h-full rounded-lg border border-cyan-500/30"
                            frameBorder="0"
                            allowFullScreen
                            title={`Vídeo: ${exercicio.nome}`}
                          ></iframe>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dieta' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Cardápios - {userData.objetivo}
              </h3>
              
              <div className="grid gap-6">
                {receitas.hipertrofia.map((receita, index) => (
                  <div key={index} className="recipe-card">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-white mb-4">{receita.nome}</h4>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                          <div className="text-center">
                            <span className="block text-orange-400 font-medium">{receita.calorias}</span>
                            <span className="text-gray-400">kcal</span>
                          </div>
                          <div className="text-center">
                            <span className="block text-green-400 font-medium">{receita.proteina}</span>
                            <span className="text-gray-400">proteína</span>
                          </div>
                          <div className="text-center">
                            <span className="block text-blue-400 font-medium">{receita.tempo}</span>
                            <span className="text-gray-400">tempo</span>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="text-cyan-400 font-medium mb-2">Ingredientes:</h5>
                            <ul className="text-gray-300 space-y-1">
                              {receita.ingredientes.map((ingrediente, i) => (
                                <li key={i}>• {ingrediente}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-green-400 font-medium mb-2">Modo de Preparo:</h5>
                            <ol className="text-gray-300 space-y-1">
                              {receita.preparo.map((passo, i) => (
                                <li key={i}>{i + 1}. {passo}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </div>
                      
                      {receita.video && (
                        <div className="w-full lg:w-80 h-48">
                          <iframe
                            src={receita.video}
                            className="w-full h-full rounded-lg border border-green-500/30"
                            frameBorder="0"
                            allowFullScreen
                            title={`Vídeo: ${receita.nome}`}
                          ></iframe>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'protocolo' && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                Protocolo Hormonal - Anabolizantes
              </h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                {produtosErgogenicos.map((produto, index) => (
                  <div key={index} className="protocol-card">
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                        <img 
                          src={produto.imagem} 
                          alt={produto.nome}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/96/96';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold text-white">{produto.nome}</h4>
                          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                            {produto.categoria}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">{produto.descricao}</p>
                        <a 
                          href={produto.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-red-600 hover:to-orange-600 transition-all"
                        >
                          <ExternalLink size={16} />
                          Comprar na AES Labs
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-lg border border-red-500/30">
                <h4 className="text-xl font-semibold text-white mb-3">⚠️ Aviso Importante</h4>
                <p className="text-gray-300 mb-3">
                  Os produtos anabolizantes devem ser utilizados APENAS sob supervisão médica especializada. 
                  É obrigatória a prescrição médica e acompanhamento profissional.
                </p>
                <p className="text-red-400 font-medium">
                  Consulte sempre um endocrinologista antes de iniciar qualquer protocolo hormonal.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Depoimentos de Sucesso
          </h2>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="testimonial-card">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={depoimentos[currentTestimonial].foto} 
                  alt={depoimentos[currentTestimonial].nome}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-semibold">{depoimentos[currentTestimonial].nome}</h4>
                  <p className="text-gray-400 text-sm">{depoimentos[currentTestimonial].idade}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{depoimentos[currentTestimonial].resultado}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-cyan-400">Objetivo: {depoimentos[currentTestimonial].objetivo}</span>
                <span className="text-green-400">Tempo: {depoimentos[currentTestimonial].tempo}</span>
              </div>
              
              <div className="flex justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-2 mt-6">
              {depoimentos.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Botão flutuante do WhatsApp */}
      <a 
        href="https://wa.me/5554999537465?text=Olá! Preciso de ajuda com meu protocolo"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}

export default App;

