import { useState } from 'react';
import { PERGUNTAS_DEMOGRAFIA } from '../data/demografia.js';
import '../styles/inicio.css';

export default function Inicio({ onIniciar }) {
  const [respostas, setRespostas] = useState({});

  const faltam = PERGUNTAS_DEMOGRAFIA.filter((pergunta) => !respostas[pergunta.id]).length;

  function escolher(perguntaId, valor) {
    setRespostas((atual) => ({ ...atual, [perguntaId]: valor }));
  }

  function enviar(evento) {
    evento.preventDefault();
    if (faltam === 0) onIniciar(respostas);
  }

  return (
    <section className="inicio">
      <header className="inicio__hero">
        <span className="inicio__selo">Pesquisa acadêmica · TCC</span>
        <h1 className="inicio__titulo">
          <span className="inicio__real">Real</span>
          <span className="inicio__x">x</span>
          <span className="inicio__fake">Fake</span>
        </h1>
        {/* <p className="inicio__subtitulo">Descubra o seu nível de detecção de imagens geradas por IA</p> */}
      </header>

      <form className="formulario" onSubmit={enviar}>
        {PERGUNTAS_DEMOGRAFIA.map((pergunta, i) => {
          const respondida = Boolean(respostas[pergunta.id]);
          return (
            <fieldset
              key={pergunta.id}
              className={`painel-branco pergunta ${respondida ? 'pergunta--ok' : ''}`}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <legend className="pergunta__titulo">
                <span className="pergunta__numero">{respondida ? '✓' : i + 1}</span>
                {pergunta.titulo}
              </legend>
              <div className="opcoes">
                {pergunta.opcoes.map((opcao) => (
                  <button
                    type="button"
                    key={opcao}
                    className={`opcao-chip ${respostas[pergunta.id] === opcao ? 'opcao-chip--ativa' : ''}`}
                    aria-pressed={respostas[pergunta.id] === opcao}
                    onClick={() => escolher(pergunta.id, opcao)}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </fieldset>
          );
        })}

        <button type="submit" className="botao botao--dourado botao--grande" disabled={faltam > 0}>
          {faltam > 0 ? `Responda todas as perguntas (faltam ${faltam})` : 'Iniciar quiz ▶'}
        </button>
      </form>
    </section>
  );
}
