import React from 'react';
import '../assets/Lirios.css'; 

const LiriosSVG = () => {
  // Esta función ayuda a no repetir el bloque de 6 pétalos y 8 luces en cada flor
  const LirioEstructura = () => (
    <>
      <div className="flower__leaf flower__leaf--1"></div>
      <div className="flower__leaf flower__leaf--2"></div>
      <div className="flower__leaf flower__leaf--3"></div>
      <div className="flower__leaf flower__leaf--4"></div>
      <div className="flower__leaf flower__leaf--5"></div>
      <div className="flower__leaf flower__leaf--6"></div>
      <div className="flower__white-circle"></div>
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`flower__light flower__light--${i + 1}`}></div>
      ))}
    </>
  );

  return (
    <div className="container-lirios">
      <div className="night"></div>
      <div className="flowers">
        
        {/* Lirio 1 */}
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1"><LirioEstructura /></div>
          <div className="flower__line">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Lirio 2 */}
        <div className="flower flower--2">
          <div className="flower__leafs flower__leafs--2"><LirioEstructura /></div>
          <div className="flower__line">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Lirio 3 */}
        <div className="flower flower--3">
          <div className="flower__leafs flower__leafs--3"><LirioEstructura /></div>
          <div className="flower__line">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Hierba y decoraciones */}
        <div className="grow-ans" style={{ '--d': '1.2s' }}>
          <div className="flower__g-long">
            <div className="flower__g-long__top"></div>
            <div className="flower__g-long__bottom"></div>
          </div>
        </div>

        <div className="growing-grass">
          {[1, 2].map((num) => (
            <div key={num} className={`flower__grass flower__grass--${num}`}>
              <div className="flower__grass--top"></div>
              <div className="flower__grass--bottom"></div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}></div>
              ))}
              <div className="flower__grass__overlay"></div>
            </div>
          ))}
        </div>

        <div className="grow-ans" style={{ '--d': '2.8s' }}>
          <div className="flower__g-front">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i + 1}`}>
                <div className="flower__g-front__leaf"></div>
              </div>
            ))}
            <div className="flower__g-front__line"></div>
          </div>
        </div>
        
        {[...Array(8)].map((_, i) => (
           <div key={i} className={`long-g long-g--${i}`}>
             {[3, 2.2, 3.4, 3.6].map((delay, j) => (
                <div key={j} className="grow-ans" style={{ '--d': `${delay}s` }}>
                   <div className={`leaf leaf--${j}`}></div>
                </div>
             ))}
           </div>
        ))}
      </div>

      {/* Contenedor de Mariposas */}
      <div className="mariposas-container">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className={`mariposa mariposa--animada`} 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 15}s`
            }}
          >
            <div className="mariposa__cuerpo"></div>
            <div className="mariposa__ala mariposa__ala--izq"></div>
            <div className="mariposa__ala mariposa__ala--der"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiriosSVG;