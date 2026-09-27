import { resumirRespostas } from './gamificacao.js';

export const VERSAO_INSTRUMENTO = '1.0';

function percentual(parte, total) {
  return total === 0 ? 0 : Math.round((parte / total) * 1000) / 10;
}

function media(valores) {
  if (valores.length === 0) return null;
  return Math.round((valores.reduce((a, b) => a + b, 0) / valores.length) * 100) / 100;
}

// Monta o objeto final que vai para o arquivo JSON
export function montarRegistro({ sessao, demografia, respostas }) {
  const fim = new Date();
  const resumo = resumirRespostas(respostas);
  const sinteticas = respostas.filter((r) => r.tipoReal === 'sintetica');
  const reais = respostas.filter((r) => r.tipoReal === 'real');

  return {
    versaoInstrumento: VERSAO_INSTRUMENTO,
    participanteId: sessao.participanteId,
    inicio: sessao.inicio,
    fim: fim.toISOString(),
    duracaoTotalMs: fim.getTime() - new Date(sessao.inicio).getTime(),
    demografia,
    configuracao: {
      ordemApresentacao: sessao.ordem.map((imagem) => imagem.id),
      imagensComJustificativa: sessao.justificar,
    },
    respostas,
    desempenho: {
      total: respostas.length,
      acertos: resumo.acertos,
      percentual: percentual(resumo.acertos, respostas.length),
      sinteticas: {
        total: sinteticas.length,
        acertos: resumo.sinteticasAcertadas,
        percentual: percentual(resumo.sinteticasAcertadas, sinteticas.length),
      },
      reais: {
        total: reais.length,
        acertos: resumo.reaisAcertadas,
        percentual: percentual(resumo.reaisAcertadas, reais.length),
      },
      confiancaMedia: media(respostas.map((r) => r.confianca)),
      confiancaMediaAcertos: media(respostas.filter((r) => r.correta).map((r) => r.confianca)),
      confiancaMediaErros: media(respostas.filter((r) => !r.correta).map((r) => r.confianca)),
      maiorSequenciaAcertos: resumo.maiorSequencia,
    },
    ambiente: {
      userAgent: navigator.userAgent,
      idioma: navigator.language,
      larguraTela: window.screen.width,
      alturaTela: window.screen.height,
      larguraJanela: window.innerWidth,
      alturaJanela: window.innerHeight,
    },
  };
}

export function baixarJSON(registro) {
  const conteudo = JSON.stringify(registro, null, 2);
  const blob = new Blob([conteudo], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `resposta_${registro.participanteId}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

// Cópia de segurança no navegador, caso o download falhe ou o arquivo se perca
export function salvarBackupLocal(registro) {
  try {
    const chave = 'quiz-real-ou-ia:respostas';
    const anteriores = JSON.parse(localStorage.getItem(chave) || '[]');
    anteriores.push(registro);
    localStorage.setItem(chave, JSON.stringify(anteriores));
  } catch {
    // localStorage indisponível (aba anônima, cota cheia): o download continua sendo a via principal
  }
}
