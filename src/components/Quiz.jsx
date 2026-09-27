import { useEffect, useRef, useState } from 'react';
import CartaoImagem from './CartaoImagem.jsx';
import EscalaLikert from './EscalaLikert.jsx';
import { MIN_CARACTERES_JUSTIFICATIVA } from '../data/imagens.js';
import '../styles/quiz.css';

const OPCOES = [
  { valor: 'real', icone: '📷', rotulo: 'Real' },
  { valor: 'fake', icone: '🤖', rotulo: 'Fake' },
];

function novaMedicao() {
  return { inicio: performance.now(), primeiraClassificacao: null, trocas: 0 };
}

export default function Quiz({ ordem, justificar, onFinalizar }) {
  const [indice, setIndice] = useState(0);
  const [resposta, setResposta] = useState(null);
  const [confianca, setConfianca] = useState(null);
  const [justificativa, setJustificativa] = useState('');
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [respostas, setRespostas] = useState([]);
  const [sequencia, setSequencia] = useState(0);
  const medicao = useRef(novaMedicao());
  const campoJustificativa = useRef(null);
  const botaoProximo = useRef(null);

  const imagem = ordem[indice];
  const ultima = indice === ordem.length - 1;
  const pedeJustificativa = justificar.includes(imagem.id);
  const justificativaOk = !pedeJustificativa || justificativa.trim().length >= MIN_CARACTERES_JUSTIFICATIVA;
  const erroJustificativa = tentouEnviar && !justificativaOk;

  useEffect(() => {
    medicao.current = novaMedicao();
  }, [indice]);

  useEffect(() => {
    if (feedback) botaoProximo.current?.focus({ preventScroll: true });
  }, [feedback]);

  // O tempo de resposta passa a contar quando a imagem termina de carregar
  function aoCarregarImagem() {
    if (medicao.current.primeiraClassificacao === null) medicao.current.inicio = performance.now();
  }

  function classificar(valor) {
    const m = medicao.current;
    if (m.primeiraClassificacao === null) m.primeiraClassificacao = performance.now();
    else if (valor !== resposta) m.trocas += 1;
    setResposta(valor);
  }

  function confirmar() {
    if (!resposta || !confianca) return;
    if (!justificativaOk) {
      setTentouEnviar(true);
      campoJustificativa.current?.focus();
      return;
    }

    const m = medicao.current;
    const correta = (resposta === 'fake') === (imagem.tipo === 'sintetica');
    const novaSequencia = correta ? sequencia + 1 : 0;

    setRespostas((atual) => [
      ...atual,
      {
        ordem: indice + 1,
        imagemId: imagem.id,
        arquivo: imagem.arquivo,
        contexto: imagem.contexto,
        titulo: imagem.titulo,
        tipoReal: imagem.tipo,
        resposta,
        correta,
        confianca,
        pediuJustificativa: pedeJustificativa,
        justificativa: pedeJustificativa ? justificativa.trim() : null,
        trocasDeResposta: m.trocas,
        tempoAteClassificacaoMs: Math.round(m.primeiraClassificacao - m.inicio),
        tempoTotalMs: Math.round(performance.now() - m.inicio),
        respondidoEm: new Date().toISOString(),
      },
    ]);
    setSequencia(novaSequencia);
    setFeedback({ correta, sequencia: novaSequencia });
  }

  function avancar() {
    if (ultima) {
      onFinalizar(respostas);
      return;
    }
    setIndice((i) => i + 1);
    setResposta(null);
    setConfianca(null);
    setJustificativa('');
    setTentouEnviar(false);
    setFeedback(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <section className="quiz">
      <header className="placar">
        <span className="placar__contador">
          Imagem <strong>{indice + 1}</strong> de {ordem.length}
        </span>
        {/* <ol className="placar__trilha" aria-hidden="true">
          {ordem.map((item, i) => (
            <li
              key={item.id}
              className={`${i < respostas.length ? 'feito' : ''} ${i === indice ? 'atual' : ''}`}
            >
              {i + 1}
            </li>
          ))}
        </ol> */}
      </header>

      <div className="palco" key={imagem.id}>
        <CartaoImagem imagem={imagem} onCarregar={aoCarregarImagem} />

        {!feedback ? (
          <div className="respostas">
            <p className="quiz__pergunta">Essa imagem é real ou fake?</p>
            <div className="classificacao">
              {OPCOES.map((opcao) => (
                <button
                  type="button"
                  key={opcao.valor}
                  className={`classificacao__botao classificacao__botao--${opcao.valor} ${resposta === opcao.valor ? 'classificacao__botao--ativo' : ''
                    } ${resposta && resposta !== opcao.valor ? 'classificacao__botao--apagado' : ''}`}
                  aria-pressed={resposta === opcao.valor}
                  onClick={() => classificar(opcao.valor)}
                >
                  {/* <span className="classificacao__icone">{opcao.icone}</span> */}
                  {opcao.rotulo}
                </button>
              ))}
            </div>

            {resposta && <EscalaLikert valor={confianca} onEscolher={setConfianca} />}

            {resposta && confianca && pedeJustificativa && (
              <div className={`painel-branco justificativa surgir ${erroJustificativa ? 'justificativa--erro' : ''}`}>
                <label htmlFor="justificativa" className="justificativa__titulo">
                  Quais elementos da imagem fundamentaram a sua decisão?
                </label>
                <textarea
                  id="justificativa"
                  ref={campoJustificativa}
                  className="campo-texto"
                  rows={4}
                  value={justificativa}
                  onChange={(e) => setJustificativa(e.target.value)}
                  aria-invalid={erroJustificativa}
                  aria-describedby={erroJustificativa ? 'erro-justificativa' : undefined}
                />
                {erroJustificativa && (
                  <p id="erro-justificativa" className="justificativa__aviso" role="alert">
                    Campo obrigatório: escreva pelo menos {MIN_CARACTERES_JUSTIFICATIVA} caracteres.
                  </p>
                )}
              </div>
            )}

            {resposta && confianca && (
              <button type="button" className="botao botao--dourado botao--grande surgir" onClick={confirmar}>
                Confirmar resposta
              </button>
            )}
          </div>
        ) : (
          <div className={`feedback ${feedback.correta ? 'feedback--acerto' : 'feedback--erro'}`}>
            <span className="feedback__icone">{feedback.correta ? '✔' : '✘'}</span>
            <h2>{feedback.correta ? 'Correto!' : 'Incorreto!'}</h2>
            <p>{imagem.tipo === 'sintetica' ? 'Essa imagem foi gerada por IA' : 'Essa é uma foto real'}</p>
            {/* {feedback.sequencia >= 2 && (
              <span className="feedback__sequencia">🔥 {feedback.sequencia} acertos seguidos</span>
            )} */}
            <button ref={botaoProximo} type="button" className="botao botao--branco botao--grande" onClick={avancar}>
              {ultima ? 'Ver meu resultado 🏆' : 'Próxima imagem ▶'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
