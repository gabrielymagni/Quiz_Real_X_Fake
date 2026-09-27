import { useEffect, useMemo, useRef, useState } from 'react';
import { obterNivel } from '../utils/gamificacao.js';
import { baixarJSON } from '../utils/registro.js';
import { FONTE_IMAGENS } from '../data/imagens.js';
import '../styles/resultado.css';

const CORES_CONFETE = ['#e21b3c', '#1368ce', '#ffc934', '#26890c', '#ffffff'];

function useContagem(alvo, duracaoMs = 1600) {
  const [valor, setValor] = useState(0);
  useEffect(() => {
    let quadro;
    const inicio = performance.now();
    const passo = (agora) => {
      const t = Math.min((agora - inicio) / duracaoMs, 1);
      setValor(alvo * (1 - Math.pow(1 - t, 3)));
      if (t < 1) quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [alvo, duracaoMs]);
  return valor;
}

export default function Resultado({ registro }) {
  const d = registro.desempenho;
  const nivel = obterNivel(d.percentual);
  const percentualAnimado = useContagem(d.percentual);
  const baixou = useRef(false);

  useEffect(() => {
    if (baixou.current) return;
    baixou.current = true;
    baixarJSON(registro);
  }, [registro]);

  const confetes = useMemo(
    () =>
      Array.from({ length: d.percentual >= 60 ? 70 : 0 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1.5}s`,
        duracao: `${2.5 + Math.random() * 2}s`,
        cor: CORES_CONFETE[i % CORES_CONFETE.length],
        rotacao: `${Math.random() * 360}deg`,
      })),
    [d.percentual]
  );

  return (
    <section className="resultado">
      <div className="confetes" aria-hidden="true">
        {confetes.map((c, i) => (
          <span
            key={i}
            style={{ left: c.left, animationDelay: c.delay, animationDuration: c.duracao, background: c.cor, rotate: c.rotacao }}
          />
        ))}
      </div>

      <span className="inicio__selo">Resultado final</span>

      <div className="anel" style={{ '--progresso': `${percentualAnimado * 3.6}deg` }}>
        <div className="anel__miolo">
          <strong>{Math.round(percentualAnimado)}%</strong>
          <span>
            {d.acertos} de {d.total} acertos
          </span>
        </div>
      </div>

      <div className="nivel">
        <span className="nivel__rotulo">Seu nível</span>
        <span className="nivel__icone">{nivel.icone}</span>
        <h1 className="nivel__titulo">{nivel.titulo}</h1>
        <p className="nivel__texto">{nivel.texto}</p>
      </div>

      <div className="painel-branco resultado__final">
        <h2>Obrigada por participar!</h2>
        <p>
          O arquivo com as suas respostas foi baixado automaticamente
          (<code>resposta_{registro.participanteId}.json</code>). Se o download não começou, clique no botão abaixo e
          envie o arquivo para a pasta pública.
        </p>
        <div className="resultado__acoes">
          <button type="button" className="botao botao--dourado" onClick={() => baixarJSON(registro)}>
            ⬇ Baixar respostas (JSON)
          </button>
        </div>
        <p className="resultado__fonte">As imagens utilizadas neste quiz foram retiradas do site https://www.magnific.com/.</p>
      </div>
    </section>
  );
}
