import { ESCALA_CONFIANCA } from '../data/imagens.js';

export default function EscalaLikert({ valor, onEscolher }) {
  const selecionada = ESCALA_CONFIANCA.find((item) => item.valor === valor);

  return (
    <div className="likert surgir">
      <p className="quiz__pergunta">Quão confiante você está?</p>
      <div className="likert__opcoes" role="radiogroup">
        {ESCALA_CONFIANCA.map((item) => (
          <button
            type="button"
            key={item.valor}
            role="radio"
            aria-checked={valor === item.valor}
            aria-label={`${item.valor} - ${item.rotulo}`}
            title={item.rotulo}
            className={`likert__ponto ${valor === item.valor ? 'likert__ponto--ativo' : ''}`}
            onClick={() => onEscolher(item.valor)}
          >
            {item.valor}
          </button>
        ))}
      </div>
      <div className="likert__extremos">
        <span>Nada confiante</span>
        <span>Totalmente confiante</span>
      </div>
      <p className={`likert__rotulo ${selecionada ? 'likert__rotulo--visivel' : ''}`}>
        {selecionada ? selecionada.rotulo : '—'}
      </p>
    </div>
  );
}
