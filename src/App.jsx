import { useEffect, useState } from 'react';
import Inicio from './components/Inicio.jsx';
import Quiz from './components/Quiz.jsx';
import AvaliacaoInterface from './components/AvaliacaoInterface.jsx';
import Resultado from './components/Resultado.jsx';
import { IMAGENS, QTD_JUSTIFICATIVAS } from './data/imagens.js';
import { embaralhar, sortearJustificativas, gerarIdParticipante } from './utils/sorteio.js';
import { montarRegistro, salvarBackupLocal } from './utils/registro.js';

export default function App() {
  const [etapa, setEtapa] = useState('inicio');
  const [sessao, setSessao] = useState(null);
  const [demografia, setDemografia] = useState(null);
  const [respostas, setRespostas] = useState(null);
  const [fimQuiz, setFimQuiz] = useState(null);
  const [registro, setRegistro] = useState(null);

  // Pré-carrega as imagens enquanto o participante preenche o formulário
  useEffect(() => {
    for (const imagem of IMAGENS) {
      new Image().src = imagem.arquivo;
    }
  }, []);

  function iniciar(dadosDemograficos) {
    setDemografia(dadosDemograficos);
    setSessao({
      participanteId: gerarIdParticipante(),
      inicio: new Date().toISOString(),
      ordem: embaralhar(IMAGENS),
      justificar: sortearJustificativas(IMAGENS, QTD_JUSTIFICATIVAS),
    });
    setEtapa('quiz');
    window.scrollTo({ top: 0 });
  }

  function finalizarQuiz(respostasQuiz) {
    setRespostas(respostasQuiz);
    setFimQuiz(new Date().toISOString());
    setEtapa('avaliacao');
    window.scrollTo({ top: 0 });
  }

  function concluirAvaliacao(avaliacaoInterface) {
    const novoRegistro = montarRegistro({ sessao, demografia, respostas, fimQuiz, avaliacaoInterface });
    salvarBackupLocal(novoRegistro);
    setRegistro(novoRegistro);
    setEtapa('resultado');
    window.scrollTo({ top: 0 });
  }

  return (
    <main className="app">
      {etapa === 'inicio' && <Inicio onIniciar={iniciar} />}
      {etapa === 'quiz' && (
        <Quiz ordem={sessao.ordem} justificar={sessao.justificar} onFinalizar={finalizarQuiz} />
      )}
      {etapa === 'avaliacao' && <AvaliacaoInterface onConcluir={concluirAvaliacao} />}
      {etapa === 'resultado' && <Resultado registro={registro} />}
    </main>
  );
}
