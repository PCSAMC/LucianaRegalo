import React from 'react';
import '../assets/Rosas.css'; // Importando el CSS en francés

const RosesSVG = () => {
  // Estructura de la Rosa en francés
  const RoseStructure = () => (
    <>
      <div className="rose__centre"></div>
      {/* Pétalos externos */}
      <div className="rose__petale rose__petale--1"></div>
      <div className="rose__petale rose__petale--2"></div>
      <div className="rose__petale rose__petale--3"></div>
      {/* Pétalos internos */}
      <div className="rose__petale rose__petale--4"></div>
      <div className="rose__petale rose__petale--5"></div>
      <div className="rose__petale rose__petale--6"></div>
      
      {/* Luces mágicas */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`rose__lumiere rose__lumiere--${i + 1}`}></div>
      ))}
    </>
  );

  return (
    <div className="conteneur-roses">
      <div className="nuit"></div>
      <div className="jardin-roses">
        
        {/* Rose 1 (Izquierda) */}
        <div className="rose rose--1">
          <div className="rose__tetess rose__tetess--1"><RoseStructure /></div>
          <div className="rose__tige">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`tige__feuille tige__feuille--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Rose 2 (Centro) */}
        <div className="rose rose--2">
          <div className="rose__tetess rose__tetess--2"><RoseStructure /></div>
          <div className="rose__tige">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`tige__feuille tige__feuille--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Rose 3 (Derecha) */}
        <div className="rose rose--3">
          <div className="rose__tetess rose__tetess--3"><RoseStructure /></div>
          <div className="rose__tige">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`tige__feuille tige__feuille--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Hierba y decoraciones del suelo */}
        <div className="anim-pousser" style={{ '--d': '1.2s' }}>
          <div className="herbe-longue">
            <div className="herbe-longue__haut"></div>
            <div className="herbe-longue__base"></div>
          </div>
        </div>

        <div className="herbe-pousser">
          {[1, 2].map((num) => (
            <div key={num} className={`herbe herbe--${num}`}>
              <div className="herbe--haut"></div>
              <div className="herbe--base"></div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`herbe__feuille herbe__feuille--${i + 1}`}></div>
              ))}
              <div className="herbe__superposition"></div>
            </div>
          ))}
        </div>

        <div className="anim-pousser" style={{ '--d': '2.8s' }}>
          <div className="herbe-avant">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`herbe-avant__feuille-wrapper herbe-avant__feuille-wrapper--${i + 1}`}>
                <div className="herbe-avant__feuille"></div>
              </div>
            ))}
            <div className="herbe-avant__ligne"></div>
          </div>
        </div>
        
        {[...Array(8)].map((_, i) => (
           <div key={i} className={`herbe-eparse herbe-eparse--${i}`}>
             {[3, 2.2, 3.4, 3.6].map((delay, j) => (
                <div key={j} className="anim-pousser" style={{ '--d': `${delay}s` }}>
                   <div className={`feuille feuille--${j}`}></div>
                </div>
             ))}
           </div>
        ))}
      </div>

      {/* Contenedor de Mariposas */}
      <div className="conteneur-papillons">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className={`papillon papillon--anime`} 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 15}s`
            }}
          >
            <div className="papillon__corps"></div>
            <div className="papillon__aile papillon__aile--gauche"></div>
            <div className="papillon__aile papillon__aile--droite"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RosesSVG;