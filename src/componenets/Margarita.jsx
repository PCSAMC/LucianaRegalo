import React from 'react';
import '../assets/margarita.css'; // Importando el CSS alemán

const MargeritenSVG = () => {
  // Estructura de la margarita con nombres en alemán
  const MargeritenStruktur = () => (
    <>
      <div className="blume__zentrum"></div>
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`blume__bluetenblatt blume__bluetenblatt--${i + 1}`}></div>
      ))}
      {[...Array(4)].map((_, i) => (
        <div key={i} className={`blume__licht blume__licht--${i + 1}`}></div>
      ))}
    </>
  );

  return (
    <div className="behaelter-margeriten">
      <div className="nacht"></div>
      <div className="blumen">
        
        {/* Margarita 1 */}
        <div className="blume blume--1">
          <div className="blume__koepfe blume__koepfe--1"><MargeritenStruktur /></div>
          <div className="blume__stiel">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`blume__stiel__blatt blume__stiel__blatt--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Margarita 2 */}
        <div className="blume blume--2">
          <div className="blume__koepfe blume__koepfe--2"><MargeritenStruktur /></div>
          <div className="blume__stiel">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`blume__stiel__blatt blume__stiel__blatt--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Margarita 3 */}
        <div className="blume blume--3">
          <div className="blume__koepfe blume__koepfe--3"><MargeritenStruktur /></div>
          <div className="blume__stiel">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`blume__stiel__blatt blume__stiel__blatt--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Hierba y decoraciones */}
        <div className="wachsen-anim" style={{ '--d': '1.2s' }}>
          <div className="blume__g-lang">
            <div className="blume__g-lang__oben"></div>
            <div className="blume__g-lang__unten"></div>
          </div>
        </div>

        <div className="gras-wachsen">
          {[1, 2].map((num) => (
            <div key={num} className={`blume__gras blume__gras--${num}`}>
              <div className="blume__gras--oben"></div>
              <div className="blume__gras--unten"></div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`blume__gras__blatt blume__gras__blatt--${i + 1}`}></div>
              ))}
              <div className="blume__gras__ueberlagerung"></div>
            </div>
          ))}
        </div>

        <div className="wachsen-anim" style={{ '--d': '2.8s' }}>
          <div className="blume__g-vorne">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`blume__g-vorne__blatt-huelle blume__g-vorne__blatt-huelle--${i + 1}`}>
                <div className="blume__g-vorne__blatt"></div>
              </div>
            ))}
            <div className="blume__g-vorne__linie"></div>
          </div>
        </div>
        
        {[...Array(8)].map((_, i) => (
           <div key={i} className={`langes-gras langes-gras--${i}`}>
             {[3, 2.2, 3.4, 3.6].map((delay, j) => (
                <div key={j} className="wachsen-anim" style={{ '--d': `${delay}s` }}>
                   <div className={`blatt blatt--${j}`}></div>
                </div>
             ))}
           </div>
        ))}
      </div>

      {/* Contenedor de Mariposas */}
      <div className="schmetterlinge-container">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className={`schmetterling schmetterling--animiert`} 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 15}s`
            }}
          >
            <div className="schmetterling__koerper"></div>
            <div className="schmetterling__fluegel schmetterling__fluegel--links"></div>
            <div className="schmetterling__fluegel schmetterling__fluegel--rechts"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MargeritenSVG;