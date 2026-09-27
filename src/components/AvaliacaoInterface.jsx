import { useState } from 'react';
import '../styles/inicio.css';
import '../styles/avaliacao.css';

const ESCALA_FACILIDADE = [1, 2, 3, 4, 5];
const OPCOES_DIFICULDADE = ['Não', 'Sim'];

export default function AvaliacaoInterface({ onConcluir }) {
  const [facilidade, setFacilidade] = useState(null);
  const [dificuldade, setDificuldade] = useState(null);
  const [comentario, setComentario] = useState('');

  const completo = facilidade !== null && dificuldade !== null;

  function enviar(evento) {
    evento.preventDefault();
    if (!completo) return;
    onConcluir({
      facilidadeUso: facilidade,
      encontrouDificuldade: dificuldade,
      comentario: comentario.trim() || null,
    });
  }

  return (
    <form className="avaliacao" onSubmit={enviar}>
      <header className="avaliacao__cabecalho surgir">
        <span className="inicio__selo">Quase lá!</span>
        <h1>Antes de ver os seus resultados, conte como foi sua experiência utilizando esta interface.</h1>
      </header>

      <fieldset className={`painel-branco pergunta ${facilidade !== null ? 'pergunta--ok' : ''}`}>
        <legend className="pergunta__titulo">
          <span className="pergunta__numero">{facilidade !== null ? '✓' : 1}</span>
          Foi fácil entender como utilizar a interface?
        </legend>
        <div className="opcoes avaliacao__escala">
          {ESCALA_FACILIDADE.map((valor) => (
            <button
              type="button"
              key={valor}
              className={`opcao-chip ${facilidade === valor ? 'opcao-chip--ativa' : ''}`}
              aria-pressed={facilidade === valor}
              onClick={() => setFacilidade(valor)}
            >
              {valor}
            </button>
          ))}
        </div>
        <div className="avaliacao__extremos">
          <span>Muito difícil</span>
          <span>Muito fácil</span>
        </div>
      </fieldset>

      <fieldset className={`painel-branco pergunta ${dificuldade !== null ? 'pergunta--ok' : ''}`}>
        <legend className="pergunta__titulo">
          <span className="pergunta__numero">{dificuldade !== null ? '✓' : 2}</span>
          Você encontrou alguma dificuldade durante a utilização?
        </legend>
        <div className="opcoes">
          {OPCOES_DIFICULDADE.map((opcao) => (
            <button
              type="button"
              key={opcao}
              className={`opcao-chip ${dificuldade === opcao ? 'opcao-chip--ativa' : ''}`}
              aria-pressed={dificuldade === opcao}
              onClick={() => setDificuldade(opcao)}
            >
              {opcao}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="painel-branco pergunta">
        <label htmlFor="comentario" className="pergunta__titulo">
          <span className="pergunta__numero">3</span>
          Quer contar mais? <span className="avaliacao__opcional">(opcional)</span>
        </label>
        <p className="avaliacao__dica">
          Compartilhe o que você gostou, o que poderia ser melhorado ou qualquer dificuldade que encontrou.
        </p>
        <textarea
          id="comentario"
          className="campo-texto"
          rows={4}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
      </div>

      <button type="submit" className="botao botao--dourado botao--grande" disabled={!completo}>
        {completo ? 'Ver meu resultado 🏆' : 'Responda as perguntas 1 e 2 para continuar'}
      </button>
    </form>
  );
}
