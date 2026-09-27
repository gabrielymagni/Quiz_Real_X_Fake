import { useState } from 'react';

export default function CartaoImagem({ imagem, onCarregar }) {
  const [estado, setEstado] = useState('carregando');

  function finalizarCarregamento(novoEstado) {
    setEstado(novoEstado);
    onCarregar?.();
  }

  return (
    <div className="moldura">
      {estado === 'erro' && (
        <div className="moldura__placeholder">
          <span>🖼️</span>
          <strong>{imagem.id}</strong>
          <small>{imagem.arquivo}</small>
        </div>
      )}
      {estado === 'carregando' && (
        <div className="moldura__placeholder moldura__placeholder--carregando">
          <span className="moldura__spinner" aria-label="Carregando imagem" />
        </div>
      )}
      {estado !== 'erro' && (
        <img
          className="moldura__img"
          src={imagem.arquivo}
          alt="Imagem para classificar"
          hidden={estado === 'carregando'}
          onLoad={() => finalizarCarregamento('ok')}
          onError={() => finalizarCarregamento('erro')}
          draggable={false}
        />
      )}
    </div>
  );
}
