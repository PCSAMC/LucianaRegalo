import React, { useState, useEffect, useMemo } from 'react';
import YouTube from 'react-youtube';
import LirioSVG from './componenets/LirioSVG'; 
import GirasolesSVG from './componenets/girasoles';
import { BookHeart, ListMusic, X, RefreshCw } from 'lucide-react'; 

function App() {
  const [comenzar, setComenzar] = useState(false);
  const [player, setPlayer] = useState(null);
  const [estaReproduciendo, setEstaReproduciendo] = useState(false);
  const [cancionActual, setCancionActual] = useState({ titulo: '', miniatura: null });
  
  // Estados de visualización
  const [mostrarLista, setMostrarLista] = useState(false);
  const [mostrarBiblia, setMostrarBiblia] = useState(false);
  
  // Estado para el versículo manual (el del frasquito)
  const [versiculoActual, setVersiculoActual] = useState(null);
  const [animandoVerso, setAnimandoVerso] = useState(false);

  // NUEVO: Estado para el Modal Automático
  const [modalVisible, setModalVisible] = useState(false);
  const [versoModal, setVersoModal] = useState({ texto: '', cita: '' });

  const nombresDeCanciones = [
    "Delicate", "Just the Two of Us", "Iris", "Gone, Gone, Gone", "Loving You", 
    "Hasta la Piel", "Los Lugares Donde Irás", "Wonderwall","The Night We Met", "Hold On", "Carry You Home", 
    "Until I Found You", "Infinity", "About You", "Anchor", "Next To You", 
    "Shallow", "Brújula", "Daylight", "Mystery of Love", "Found", 
    "Burning", "Te Lo Prometo", "My Blood", "Compass", "Every Breath You Take", "Luna (En Vivo)", "These Memories", 
    "Amor Completo", "Por Eso Te Amo", "Ser Parte", "Scared Of Loving You", "Freeze", 
    "Wherever I May Go", "Everything","MANADA", "Little Freak", "I Found", "M.A.I", "Don't Give Up On Me", 
    "BAILE INOLVIDABLE"
  ];

  // LISTA DE 41 VERSÍCULOS (Incluyendo Lirios)
  const versiculosBiblicos = [
    // --- VERSÍCULOS DE LIRIOS ---
    { texto: "Yo soy la rosa de Sarón, el lirio de los valles.", cita: "Cantares 2:1" },
    { texto: "Como el lirio entre los espinos, así es mi amiga entre las doncellas.", cita: "Cantares 2:2" },
    { texto: "Mi amado ha descendido a su huerto, a las eras de las especias, para apacentar en los huertos y recoger lirios.", cita: "Cantares 6:2" },
    { texto: "Yo seré a Israel como rocío; él florecerá como lirio, y extenderá sus raíces como el Líbano.", cita: "Oseas 14:5" },
    { texto: "Considerad los lirios, cómo crecen; no trabajan ni hilan; pero os digo, que ni aun Salomón con toda su gloria se vistió como uno de ellos.", cita: "Lucas 12:27" },
    { texto: "Mi amado es mío, y yo suya; él apacienta entre los lirios.", cita: "Cantares 2:16" },
    
    // --- AMOR Y MUJER VIRTUOSA (Para completar 41) ---
    { texto: "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso.", cita: "1 Corintios 13:4" },
    { texto: "Por encima de todo, vístanse de amor, que es el vínculo perfecto.", cita: "Colosenses 3:14" },
    { texto: "Nosotros amamos a Dios porque él nos amó primero.", cita: "1 Juan 4:19" },
    { texto: "El Señor es mi fuerza y mi escudo; mi corazón en él confía.", cita: "Salmos 28:7" },
    { texto: "Mujer ejemplar, ¿quién la hallará? Es más valiosa que las piedras preciosas.", cita: "Proverbios 31:10" },
    { texto: "Hagan todo con amor.", cita: "1 Corintios 16:14" },
    { texto: "Con amor eterno te he amado; por tanto, te prolongué mi misericordia.", cita: "Jeremías 31:3" },
    { texto: "Las muchas aguas no podrán apagar el amor, ni lo ahogarán los ríos.", cita: "Cantares 8:7" },
    { texto: "Confía en el Señor con todo tu corazón.", cita: "Proverbios 3:5" },
    { texto: "Te he puesto como luz para las naciones.", cita: "Hechos 13:47" },
    { texto: "El amor no hace mal al prójimo; así que el cumplimiento de la ley es el amor.", cita: "Romanos 13:10" },
    { texto: "Y ahora permanecen la fe, la esperanza y el amor, estos tres; pero el mayor de ellos es el amor.", cita: "1 Corintios 13:13" },
    { texto: "Dios es amor; y el que permanece en amor, permanece en Dios, y Dios en él.", cita: "1 Juan 4:16" },
    { texto: "Sea bendito tu manantial, y alégrate con la mujer de tu juventud.", cita: "Proverbios 5:18" },
    { texto: "Ponme como un sello sobre tu corazón, como una marca sobre tu brazo.", cita: "Cantares 8:6" },
    { texto: "Toda tú eres hermosa, amiga mía, y en ti no hay mancha.", cita: "Cantares 4:7" },
    { texto: "Muchas mujeres hicieron el bien; mas tú sobrepasas a todas.", cita: "Proverbios 31:29" },
    { texto: "Engañosa es la gracia, y vana la hermosura; la mujer que teme a Jehová, esa será alabada.", cita: "Proverbios 31:30" },
    { texto: "Jehová es mi pastor; nada me faltará.", cita: "Salmos 23:1" },
    { texto: "En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.", cita: "Salmos 23:2" },
    { texto: "Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo.", cita: "Salmos 23:4" },
    { texto: "Ciertamente el bien y la misericordia me seguirán todos los días de mi vida.", cita: "Salmos 23:6" },
    { texto: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes.", cita: "Josué 1:9" },
    { texto: "Para que habite Cristo por la fe en vuestros corazones, a fin de que, arraigados y cimentados en amor.", cita: "Efesios 3:17" },
    { texto: "Sobre toda cosa guardada, guarda tu corazón, porque de él mana la vida.", cita: "Proverbios 4:23" },
    { texto: "El corazón alegre hermosea el rostro.", cita: "Proverbios 15:13" },
    { texto: "La paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones.", cita: "Filipenses 4:7" },
    { texto: "Todo lo puedo en Cristo que me fortalece.", cita: "Filipenses 4:13" },
    { texto: "Echa sobre Jehová tu carga, y él te sustentará.", cita: "Salmos 55:22" },
    { texto: "Cercano está Jehová a los quebrantados de corazón.", cita: "Salmos 34:18" },
    { texto: "Te alabaré; porque formidables, maravillosas son tus obras.", cita: "Salmos 139:14" },
    { texto: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", cita: "Salmos 119:105" },
    { texto: "Amados, amémonos unos a otros; porque el amor es de Dios.", cita: "1 Juan 4:7" },
    { texto: "El que no ama, no ha conocido a Dios; porque Dios es amor.", cita: "1 Juan 4:8" },
    { texto: "Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.", cita: "Colosenses 3:14" }
  ];

  const playerOptions = useMemo(() => ({
    height: '0',
    width: '0',
    playerVars: { 
      listType: 'playlist', 
      list: 'PLdfHw83gRRpktps58rQZckkItQlbGSOkX',
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      origin: window.location.origin,
    }
  }), []);

  const actualizarInfo = (target) => {
    const data = target.getVideoData();
    if (data) {
      setCancionActual({
        titulo: data.title,
        miniatura: data.video_id ? `https://img.youtube.com/vi/${data.video_id}/mqdefault.jpg` : null
      });
    }
  };

  // NUEVO: Efecto que detecta el cambio de canción y muestra el Modal
  useEffect(() => {
    if (cancionActual.titulo) {
       // Elegir un versículo al azar de la lista de 41
       const random = Math.floor(Math.random() * versiculosBiblicos.length);
       setVersoModal(versiculosBiblicos[random]);
       
       // Mostrar el modal
       setModalVisible(true);

       // Ocultar automáticamente después de 10 segundos
       const timer = setTimeout(() => {
           setModalVisible(false);
       }, 10000); // 10000ms = 10 segundos

       return () => clearTimeout(timer);
    }
  }, [cancionActual.titulo]); // Se ejecuta cada vez que cambia el título

  const saltarA = (indice) => {
    if (player) {
      player.playVideoAt(indice);
      setMostrarLista(false);
    }
  };

  const togglePlay = () => {
    if (player) {
      const state = player.getPlayerState();
      if (state === 1) { 
         player.pauseVideo();
         setEstaReproduciendo(false);
      } else {
         player.playVideo();
         setEstaReproduciendo(true);
      }
    }
  };

  // Lógica de vistas
  const toggleLista = () => { setMostrarLista(!mostrarLista); setMostrarBiblia(false); };
  const toggleBiblia = () => { setMostrarBiblia(!mostrarBiblia); setMostrarLista(false); };

  const sacarPapelito = () => {
    setAnimandoVerso(true);
    setTimeout(() => {
        const random = Math.floor(Math.random() * versiculosBiblicos.length);
        setVersiculoActual(versiculosBiblicos[random]);
        setAnimandoVerso(false);
    }, 500);
  };
const [esGirasol, setEsGirasol] = useState(true);
  return (
    <div className="main-container">
      {!comenzar ? (
        <button className="boton-inicio" onClick={() => setComenzar(true)}>
          Para lutawas la rata  🌸 <br/> <span>(Click para empezar)</span>
        </button>
      ) : (
        <>
         {esGirasol ? <LirioSVG /> : <GirasolesSVG />}
          
          {/* 3. BOTÓN PARA CAMBIAR DE FLOR (Agrégalo aquí, justo antes del Toast o del Player) */}
          <button 
            className="btn-cambio-flor" 
            onClick={() => setEsGirasol(!esGirasol)}
          >
            {esGirasol ? (
               <>✨ ¿Prefieres ver Lirios?</>
            ) : (
               <>🌻 ¿Estás con ganas de Girasoles?</>
            )}
          </button>
          
          {/* MODAL FLOTANTE AUTOMÁTICO (TOAST) */}
          <div className={`verse-toast ${modalVisible ? 'show' : ''}`}>
             <div className="toast-content">
                <span className="toast-icon">🌸</span>
                <div>
                  <p className="toast-text">"{versoModal.texto}"</p>
                  <p className="toast-cite">{versoModal.cita}</p>
                </div>
                <button className="close-toast" onClick={() => setModalVisible(false)}>✕</button>
             </div>
          </div>

          <div className={`player-card ${mostrarLista ? 'list-active' : ''}`}>
            
            {/* Cabecera */}
            <div className="card-header">
              <button 
                className={`icon-btn ${mostrarBiblia ? 'active' : ''}`} 
                onClick={toggleBiblia}
                title="Frasquito de Versículos"
              >
                <BookHeart size={20} />
              </button>

              <div className="song-info-mini">
                <span className="scrolling-text">{cancionActual.titulo || "Cargando..."}</span>
              </div>
              
              <button 
                className={`icon-btn ${mostrarLista ? 'active' : ''}`} 
                onClick={toggleLista}
                title="Lista de Canciones"
              >
                {mostrarLista ? <X size={20}/> : <ListMusic size={20} />}
              </button>
            </div>

            {/* Contenido Central */}
            <div className="card-content-area">
              
              {mostrarLista && (
                <div className="playlist-overlay">
                  <div className="lista-scrollable">
                    {nombresDeCanciones.map((nombre, i) => (
                      <button key={i} onClick={() => saltarA(i)} className="pista-btn">
                        <span className="pista-num">{i + 1}</span>
                        <span className="pista-name">{nombre}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!mostrarLista && mostrarBiblia && (
                <div className="bible-overlay">
                  <div className="jar-container">
                    {!versiculoActual ? (
                        <div className="jar-closed" onClick={sacarPapelito}>
                            <span className="jar-emoji">🏺</span>
                            <p>Toca el frasquito</p>
                        </div>
                    ) : (
                        <div className={`paper-slip ${animandoVerso ? 'hidden' : 'visible'}`}>
                            <p className="verse-text">"{versiculoActual.texto}"</p>
                            <span className="verse-cite">{versiculoActual.cita}</span>
                            <button className="another-one" onClick={sacarPapelito}>
                                <RefreshCw size={14} /> Otro mensajito
                            </button>
                        </div>
                    )}
                  </div>
                </div>
              )}

              {!mostrarLista && !mostrarBiblia && (
                <div className="album-art-view">
                   <div className="thumb-container">
                      {cancionActual.miniatura ? (
                          <img src={cancionActual.miniatura} alt="Album" className="main-thumb" />
                      ) : (
                          <div className="placeholder-thumb"></div>
                      )}
                      {estaReproduciendo && <div className="pulse-ring"></div>}
                   </div>
                </div>
              )}

            </div>

            {/* Controles */}
            <div className="card-controls">
              <button className="control-btn" onClick={() => player && player.previousVideo()}>⏮</button>
              <button className="play-btn-main" onClick={togglePlay}>
                {estaReproduciendo ? '⏸' : '▶'}
              </button>
              <button className="control-btn" onClick={() => player && player.nextVideo()}>⏭</button>
            </div>
          </div>

          <div className="mensaje-final">
            <h2 className="texto-romantico">Ves el cielo luyahuita para mi eres desde la estrella mas pequeña hasta el universo mas grande  </h2>
          </div>

          <YouTube 
            opts={playerOptions} 
            onReady={(e) => {
               setPlayer(e.target);
               e.target.setVolume(70); 
            }}
            onPlay={(e) => { 
               setEstaReproduciendo(true); 
               actualizarInfo(e.target); 
            }}
            onPause={() => setEstaReproduciendo(false)}
            onStateChange={(e) => { 
               if (e.data === 1) actualizarInfo(e.target); 
            }}
            className="youtube-hidden" 
            style={{ display: 'none' }}
          />
        </>
      )}
    </div>
  );
}

export default App;