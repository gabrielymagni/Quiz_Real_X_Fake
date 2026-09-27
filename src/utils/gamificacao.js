export function resumirRespostas(respostas) {
  let sequenciaAtual = 0;
  let maiorSequencia = 0;
  for (const resposta of respostas) {
    sequenciaAtual = resposta.correta ? sequenciaAtual + 1 : 0;
    maiorSequencia = Math.max(maiorSequencia, sequenciaAtual);
  }
  return {
    acertos: respostas.filter((r) => r.correta).length,
    sinteticasAcertadas: respostas.filter((r) => r.correta && r.tipoReal === 'sintetica').length,
    reaisAcertadas: respostas.filter((r) => r.correta && r.tipoReal === 'real').length,
    maiorSequencia,
  };
}

export const NIVEIS = [
  { minimo: 0, icone: '🐣', titulo: 'Novato Digital', texto: 'As IAs te pegaram desta vez, mas agora você sabe onde olhar.' },
  { minimo: 40, icone: '👀', titulo: 'Observador Atento', texto: 'Você percebe alguns sinais, mas a IA ainda consegue te enganar.' },
  { minimo: 60, icone: '🕵️', titulo: 'Detetive de Pixels', texto: 'Bom faro! Você identifica boa parte das imagens sintéticas.' },
  { minimo: 80, icone: '🦅', titulo: 'Caçador de IA', texto: 'Excelente! Poucas imagens passam despercebidas por você.' },
  { minimo: 100, icone: '🦾', titulo: 'Olho Biônico', texto: 'Impecável! Nenhuma imagem conseguiu te enganar.' },
];

export function obterNivel(percentual) {
  return [...NIVEIS].reverse().find((nivel) => percentual >= nivel.minimo);
}
