/*
 * Configuração das imagens do quiz.
 *
 * Coloque os arquivos em public/imagens/ com os nomes indicados em "arquivo".
 * Os caminhos são relativos (sem "/" no início) para funcionar também no GitHub Pages.
 * Enquanto um arquivo não existir, o quiz mostra um placeholder no lugar.
 *
 * tipo:      "sintetica" (gerada por IA) ou "real"
 * contexto:  "ecommerce" | "produto" | "servico"
 * titulo:    apenas para referência do pesquisador (vai para o JSON, não aparece no quiz)
 */
export const IMAGENS = [
  { id: 'IMG01', arquivo: 'imagens/img01.jpg', tipo: 'sintetica', contexto: 'ecommerce', titulo: 'Tênis de corrida' },
  { id: 'IMG02', arquivo: 'imagens/img02.jpg', tipo: 'sintetica', contexto: 'ecommerce', titulo: 'Bolsa de couro feminina' },
  { id: 'IMG03', arquivo: 'imagens/img03.jpg', tipo: 'sintetica', contexto: 'ecommerce', titulo: 'Sofá retrátil' },
  { id: 'IMG04', arquivo: 'imagens/img04.jpg', tipo: 'sintetica', contexto: 'produto', titulo: 'Fone de ouvido sem fio' },
  { id: 'IMG05', arquivo: 'imagens/img05.jpg', tipo: 'sintetica', contexto: 'produto', titulo: 'Relógio analógico' },
  { id: 'IMG06', arquivo: 'imagens/img06.jpg', tipo: 'sintetica', contexto: 'produto', titulo: 'Perfume' },
  { id: 'IMG07', arquivo: 'imagens/img07.jpg', tipo: 'sintetica', contexto: 'servico', titulo: 'Eletricista residencial' },
  { id: 'IMG08', arquivo: 'imagens/img08.jpg', tipo: 'sintetica', contexto: 'servico', titulo: 'Salão de beleza' },
  { id: 'IMG09', arquivo: 'imagens/img09.jpg', tipo: 'sintetica', contexto: 'servico', titulo: 'Reforma de cozinha' },
  { id: 'IMG10', arquivo: 'imagens/img10.jpg', tipo: 'real', contexto: 'ecommerce', titulo: 'Camiseta básica' },
  { id: 'IMG11', arquivo: 'imagens/img11.jpg', tipo: 'real', contexto: 'ecommerce', titulo: 'Cafeteira elétrica' },
  { id: 'IMG12', arquivo: 'imagens/img12.jpg', tipo: 'real', contexto: 'produto', titulo: 'Mochila' },
  { id: 'IMG13', arquivo: 'imagens/img13.jpg', tipo: 'real', contexto: 'produto', titulo: 'Kit de maquiagem' },
  { id: 'IMG14', arquivo: 'imagens/img14.jpg', tipo: 'real', contexto: 'servico', titulo: 'Pet shop — banho e tosa' },
  { id: 'IMG15', arquivo: 'imagens/img15.jpg', tipo: 'real', contexto: 'servico', titulo: 'Jardinagem' },
];

// Quantas imagens de cada tipo pedem justificativa (sorteadas por participante)
export const QTD_JUSTIFICATIVAS = { sintetica: 3, real: 2 };

export const MIN_CARACTERES_JUSTIFICATIVA = 10;

export const ESCALA_CONFIANCA = [
  { valor: 1, rotulo: 'Nada confiante' },
  { valor: 2, rotulo: 'Pouco confiante' },
  { valor: 3, rotulo: 'Moderadamente confiante' },
  { valor: 4, rotulo: 'Muito confiante' },
  { valor: 5, rotulo: 'Totalmente confiante' },
];
