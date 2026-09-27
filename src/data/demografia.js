/*
 * Perguntas do formulário demográfico (página inicial).
 * Todas são obrigatórias para iniciar o quiz.
 */
export const PERGUNTAS_DEMOGRAFIA = [
  {
    id: 'faixaEtaria',
    titulo: 'Qual a sua faixa etária?',
    opcoes: ['Até 17 anos', '18 a 24', '25 a 34', '35 a 44', '45 ou mais'],
  },
  {
    id: 'sexo',
    titulo: 'Qual o seu sexo?',
    opcoes: ['Feminino', 'Masculino', 'Prefiro não informar'],
  },
  {
    id: 'curso',
    titulo: 'Qual o seu curso?',
    opcoes: [
      'Técnico em Mecânica',
      'Técnico em Informática',
      'Técnico em Agropecuária',
      'Agronomia',
      'Ciência da Computação',
      'Engenharia Mecânica',
    ],
  },
  {
    id: 'experienciaImagensIA',
    titulo: 'Com que frequência você utiliza ferramentas de IA generativa para criar imagens?',
    opcoes: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente'],
  },
];
