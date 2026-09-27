// Fisher-Yates: devolve uma cópia embaralhada da lista
export function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Sorteia os ids das imagens que pedirão justificativa, respeitando a quantidade por tipo
export function sortearJustificativas(imagens, quantidadePorTipo) {
  return Object.entries(quantidadePorTipo).flatMap(([tipo, quantidade]) =>
    embaralhar(imagens.filter((imagem) => imagem.tipo === tipo))
      .slice(0, quantidade)
      .map((imagem) => imagem.id)
  );
}

export function gerarIdParticipante() {
  const aleatorio = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `P-${Date.now().toString(36).toUpperCase()}-${aleatorio}`;
}
