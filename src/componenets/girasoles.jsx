import React from 'react';
import '../assets/Girasoles.css'; // Asegúrate de que este sea el nombre de tu archivo CSS

const GirasolesSVG = () => {

  // Estructura de la Cabeza del Girasol (Centro + Pétalos)
  const GirasolEstructura = () => (
    <>
      <div className="flor__centro"></div>
      <div className="flor__cabeza">
        {/* Generamos 12 pétalos */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`flor__petalo flor__petalo--${i + 1}`}></div>
        ))}
      </div>
    </>
  );

  return (
    <div className="contenedor-girasoles">
      <div className="noche"></div>
      
      <div className="flores">
        
        {/* Girasol 1 */}
        <div className="flor flor--1">
          <GirasolEstructura />
          <div className="flor__tallo">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`flor__hoja-tallo flor__hoja-tallo--${i + 1}`}></div>
            ))}
            {/* Luces mágicas */}
            {[...Array(4)].map((_, i) => (
               <div key={i} className={`flor__luz flor__luz--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Girasol 2 */}
        <div className="flor flor--2">
          <GirasolEstructura />
          <div className="flor__tallo">
             {[...Array(4)].map((_, i) => (
              <div key={i} className={`flor__hoja-tallo flor__hoja-tallo--${i + 1}`}></div>
            ))}
             {[...Array(4)].map((_, i) => (
               <div key={i} className={`flor__luz flor__luz--${i + 5}`}></div>
            ))}
          </div>
        </div>

        {/* Girasol 3 */}
        <div className="flor flor--3">
          <GirasolEstructura />
          <div className="flor__tallo">
             {[...Array(4)].map((_, i) => (
              <div key={i} className={`flor__hoja-tallo flor__hoja-tallo--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* --- DECORACIÓN DEL JARDÍN (PASTO, ARBUSTOS) --- */}
        <div className="animacion-crecer" style={{ '--d': '1.2s' }}>
          <div className="flor__pasto-largo">
            <div className="flor__pasto-largo--top"></div>
            <div className="flor__pasto-largo--bottom"></div>
          </div>
        </div>

        <div className="pasto-creciendo">
          {[1, 2].map((num) => (
            <div key={num} className={`flor__pasto flor__pasto--${num}`}>
              <div className="flor__pasto--top"></div>
              <div className="flor__pasto--bottom"></div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`flor__hoja-pasto flor__hoja-pasto--${i + 1}`}></div>
              ))}
              <div className="flor__pasto--capa"></div>
            </div>
          ))}
        </div>

        {/* Decoración de vegetación larga de fondo */}
         {[...Array(4)].map((_, i) => (
            <div key={i} className={`pasto-fondo pasto-fondo--${i}`}>
                <div className="hoja hoja--0"></div>
                <div className="hoja hoja--1"></div>
                <div className="hoja hoja--2"></div>
            </div>
         ))}

      </div>

      {/* --- MARIPOSAS --- */}
      <div className="contenedor-mariposas">
        {[...Array(25)].map((_, i) => (
          <div 
            key={i} 
            className="mariposa mariposa--animada" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
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

export default GirasolesSVG;