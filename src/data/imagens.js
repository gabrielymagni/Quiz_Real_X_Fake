// Os caminhos são relativos (sem "/" no início) para funcionar também no GitHub Pages.
export const IMAGENS = [
  { id: 'IMG01', arquivo: 'imagens/img01.jpg', tipo: 'sintetica' },
  { id: 'IMG02', arquivo: 'imagens/img02.jpg', tipo: 'sintetica' },
  { id: 'IMG03', arquivo: 'imagens/img03.jpg', tipo: 'sintetica' },
  { id: 'IMG04', arquivo: 'imagens/img04.jpg', tipo: 'sintetica' },
  { id: 'IMG05', arquivo: 'imagens/img05.jpg', tipo: 'sintetica' },
  { id: 'IMG06', arquivo: 'imagens/img06.jpg', tipo: 'sintetica' },
  { id: 'IMG07', arquivo: 'imagens/img07.jpg', tipo: 'sintetica' },
  { id: 'IMG08', arquivo: 'imagens/img08.jpg', tipo: 'sintetica' },
  { id: 'IMG09', arquivo: 'imagens/img09.jpg', tipo: 'sintetica' },
  { id: 'IMG10', arquivo: 'imagens/img10.jpg', tipo: 'real' },
  { id: 'IMG11', arquivo: 'imagens/img11.jpg', tipo: 'real' },
  { id: 'IMG12', arquivo: 'imagens/img12.jpg', tipo: 'real' },
  { id: 'IMG13', arquivo: 'imagens/img13.jpg', tipo: 'real' },
  { id: 'IMG14', arquivo: 'imagens/img14.jpg', tipo: 'real' },
  { id: 'IMG15', arquivo: 'imagens/img15.jpg', tipo: 'real' },
];

// Site de onde as imagens foram retiradas (exibido na tela de resultado)
export const FONTE_IMAGENS = 'xxxx';

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
