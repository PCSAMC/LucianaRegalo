import React, { useState, useEffect, useMemo } from 'react';
import YouTube from 'react-youtube';
import LirioSVG from './componenets/LirioSVG'; 
import GirasolesSVG from './componenets/girasoles';
import { BookHeart, ListMusic, X, RefreshCw } from 'lucide-react'; 

function App() {
  const [comenzar, setComenzar] = useState(false);
  const [player, setPlayer] = useState(null);
  const [estaReproduciendo, setEstaReproduciendo] = useState(false);
  
  // Guardamos toda la info de la canción actual (índice, título, imagen)
  const [indiceActual, setIndiceActual] = useState(0);
  const [cancionActual, setCancionActual] = useState({ titulo: '', miniatura: null });
  
  // Estados de visualización
  const [mostrarLista, setMostrarLista] = useState(false);
  const [mostrarBiblia, setMostrarBiblia] = useState(false);
  const [esGirasol, setEsGirasol] = useState(true);
  
  // Estado para el versículo manual (el del frasquito - sigue siendo "suerte")
  const [versiculoFrasco, setVersiculoFrasco] = useState(null);
  const [animandoVerso, setAnimandoVerso] = useState(false);

  // NUEVO: Estado para el Modal Automático (Versículo Específico)
  const [modalVisible, setModalVisible] = useState(false);
  const [versoModal, setVersoModal] = useState({ texto: '', cita: '' });

  // --- BASE DE DATOS: CANCIONES + VERSÍCULOS VINCULADOS ---
  // He unido tus canciones con tus versículos basándome en el sentimiento de la canción.
  const PLAYLIST_DATA = useMemo(() => [
    { titulo: "Delicate", verso: { texto: "Como el lirio entre los espinos, así es mi amiga entre las doncellas.", cita: "Cantares 2:2" } },
    { titulo: "Just the Two of Us", verso: { texto: "Mi amado es mío, y yo suya; él apacienta entre los lirios.", cita: "Cantares 2:16" } },
    { titulo: "Iris", verso: { texto: "Toda tú eres hermosa, amiga mía, y en ti no hay mancha.", cita: "Cantares 4:7" } },
    { titulo: "Gone, Gone, Gone", verso: { texto: "Con amor eterno te he amado; por tanto, te prolongué mi misericordia.", cita: "Jeremías 31:3" } },
    { titulo: "Loving You", verso: { texto: "Nosotros amamos a Dios porque él nos amó primero.", cita: "1 Juan 4:19" } },
    { titulo: "Hasta la Piel", verso: { texto: "Ponme como un sello sobre tu corazón, como una marca sobre tu brazo.", cita: "Cantares 8:6" } },
    { titulo: "Los Lugares Donde Irás", verso: { texto: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes.", cita: "Josué 1:9" } },
    { titulo: "Wonderwall", verso: { texto: "El Señor es mi fuerza y mi escudo; mi corazón en él confía.", cita: "Salmos 28:7" } },
    { titulo: "The Night We Met", verso: { texto: "Cercano está Jehová a los quebrantados de corazón.", cita: "Salmos 34:18" } },
    { titulo: "Hold On", verso: { texto: "Echa sobre Jehová tu carga, y él te sustentará.", cita: "Salmos 55:22" } },
    { titulo: "Carry You Home", verso: { texto: "Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo.", cita: "Salmos 23:4" } },
    { titulo: "Until I Found You", verso: { texto: "Mujer ejemplar, ¿quién la hallará? Es más valiosa que las piedras preciosas.", cita: "Proverbios 31:10" } },
    { titulo: "Infinity", verso: { texto: "Las muchas aguas no podrán apagar el amor, ni lo ahogarán los ríos.", cita: "Cantares 8:7" } },
    { titulo: "About You", verso: { texto: "Mi amado ha descendido a su huerto... para recoger lirios.", cita: "Cantares 6:2" } },
    { titulo: "Anchor", verso: { texto: "Tenemos como ancla del alma, una esperanza segura y firme.", cita: "Hebreos 6:19" } }, // Agregué este porque quedaba perfecto con Anchor
    { titulo: "Next To You", verso: { texto: "Ciertamente el bien y la misericordia me seguirán todos los días de mi vida.", cita: "Salmos 23:6" } },
    { titulo: "Shallow", verso: { texto: "La paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones.", cita: "Filipenses 4:7" } },
    { titulo: "Brújula", verso: { texto: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", cita: "Salmos 119:105" } },
    { titulo: "Daylight", verso: { texto: "Te he puesto como luz para las naciones.", cita: "Hechos 13:47" } },
    { titulo: "Mystery of Love", verso: { texto: "El que no ama, no ha conocido a Dios; porque Dios es amor.", cita: "1 Juan 4:8" } },
    { titulo: "Found", verso: { texto: "Yo soy la rosa de Sarón, el lirio de los valles.", cita: "Cantares 2:1" } },
    { titulo: "Burning", verso: { texto: "Por encima de todo, vístanse de amor, que es el vínculo perfecto.", cita: "Colosenses 3:14" } },
    { titulo: "Te Lo Prometo", verso: { texto: "Hagan todo con amor.", cita: "1 Corintios 16:14" } },
    { titulo: "My Blood", verso: { texto: "El amor es paciente, es bondadoso.", cita: "1 Corintios 13:4" } },
    { titulo: "Compass", verso: { texto: "Confía en el Señor con todo tu corazón.", cita: "Proverbios 3:5" } },
    { titulo: "Every Breath You Take", verso: { texto: "El amor no hace mal al prójimo; así que el cumplimiento de la ley es el amor.", cita: "Romanos 13:10" } },
    { titulo: "Luna (En Vivo)", verso: { texto: "Considerad los lirios, cómo crecen; no trabajan ni hilan.", cita: "Lucas 12:27" } },
    { titulo: "These Memories", verso: { texto: "Y ahora permanecen la fe, la esperanza y el amor.", cita: "1 Corintios 13:13" } },
    { titulo: "Amor Completo", verso: { texto: "Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.", cita: "Colosenses 3:14" } },
    { titulo: "Por Eso Te Amo", verso: { texto: "Nosotros amamos a Dios porque él nos amó primero.", cita: "1 Juan 4:19" } },
    { titulo: "Ser Parte", verso: { texto: "Para que habite Cristo por la fe en vuestros corazones.", cita: "Efesios 3:17" } },
    { titulo: "Scared Of Loving You", verso: { texto: "En el amor no hay temor, sino que el perfecto amor echa fuera el temor.", cita: "1 Juan 4:18" } },
    { titulo: "Freeze", verso: { texto: "Sea bendito tu manantial, y alégrate con la mujer de tu juventud.", cita: "Proverbios 5:18" } },
    { titulo: "Wherever I May Go", verso: { texto: "En lugares de delicados pastos me hará descansar.", cita: "Salmos 23:2" } },
    { titulo: "Everything", verso: { texto: "Te alabaré; porque formidables, maravillosas son tus obras.", cita: "Salmos 139:14" } },
    { titulo: "MANADA", verso: { texto: "Amados, amémonos unos a otros; porque el amor es de Dios.", cita: "1 Juan 4:7" } },
    { titulo: "Little Freak", verso: { texto: "Sobre toda cosa guardada, guarda tu corazón, porque de él mana la vida.", cita: "Proverbios 4:23" } },
    { titulo: "I Found", verso: { texto: "Muchas mujeres hicieron el bien; mas tú sobrepasas a todas.", cita: "Proverbios 31:29" } },
    { titulo: "M.A.I", verso: { texto: "Engañosa es la gracia, y vana la hermosura; la mujer que teme a Jehová, esa será alabada.", cita: "Proverbios 31:30" } },
    { titulo: "Don't Give Up On Me", verso: { texto: "Todo lo puedo en Cristo que me fortalece.", cita: "Filipenses 4:13" } },
    { titulo: "BAILE INOLVIDABLE", verso: { texto: "El corazón alegre hermosea el rostro.", cita: "Proverbios 15:13" } }
  ], []);

  // Versículos aleatorios solo para el frasquito (Juego extra)
  const versiculosRandom = useMemo(() => PLAYLIST_DATA.map(item => item.verso), [PLAYLIST_DATA]);

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

  // --- LÓGICA PRINCIPAL ---

  const actualizarInfo = (target) => {
    // Obtenemos el índice de la canción actual en la lista de reproducción (0, 1, 2...)
    const index = target.getPlaylistIndex();
    const data = target.getVideoData();
    
    // Guardamos el índice para saber qué verso mostrar
    if (index !== -1 && index !== undefined) {
        setIndiceActual(index);
    }

    if (data) {
      setCancionActual({
        titulo: data.title,
        miniatura: data.video_id ? `https://img.youtube.com/vi/${data.video_id}/mqdefault.jpg` : null
      });
    }
  };

  // 1. DETECTAR CAMBIO DE CANCIÓN Y MOSTRAR VERSO VINCULADO
  useEffect(() => {
    if (cancionActual.titulo && PLAYLIST_DATA[indiceActual]) {
       // Aquí ocurre la magia: Usamos el índice actual para sacar el verso exacto
       const versoCorrespondiente = PLAYLIST_DATA[indiceActual].verso;
       
       setVersoModal(versoCorrespondiente);
       setModalVisible(true);

       // Ocultar automáticamente después de 12 segundos (un poco más de tiempo para leer)
       const timer = setTimeout(() => {
           setModalVisible(false);
       }, 12000); 

       return () => clearTimeout(timer);
    }
  }, [indiceActual, cancionActual.titulo, PLAYLIST_DATA]); 


  const saltarA = (indice) => {
    if (player) {
      player.playVideoAt(indice);
      setIndiceActual(indice); // Actualizamos manualmente también
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

  // Funciones de UI
  const toggleLista = () => { setMostrarLista(!mostrarLista); setMostrarBiblia(false); };
  const toggleBiblia = () => { setMostrarBiblia(!mostrarBiblia); setMostrarLista(false); };

  // El frasquito sigue siendo aleatorio (como sacar un papelito de la suerte)
  const sacarPapelito = () => {
    setAnimandoVerso(true);
    setTimeout(() => {
        const random = Math.floor(Math.random() * versiculosRandom.length);
        setVersiculoFrasco(versiculosRandom[random]);
        setAnimandoVerso(false);
    }, 500);
  };

  return (
    <div className="main-container">
      {!comenzar ? (
        <button className="boton-inicio" onClick={() => setComenzar(true)}>
          Para lutawas la rata  🌸 <br/> <span>(Click para empezar)</span>
        </button>
      ) : (
        <>
          {esGirasol ? <GirasolesSVG /> : <LirioSVG />}
          
          <button 
            className="btn-cambio-flor" 
            onClick={() => setEsGirasol(!esGirasol)}
          >
            {esGirasol ? <>✨ ¿Prefieres ver Lirios?</> : <>🌻 ¿Estás con ganas de Girasoles?</>}
          </button>
          
          {/* MODAL FLOTANTE - Muestra el verso vinculado a la canción */}
          <div className={`verse-toast ${modalVisible ? 'show' : ''}`}>
             <div className="toast-content">
                <span className="toast-icon">💌</span>
                <div>
                  <p className="toast-text">"{versoModal.texto}"</p>
                  <p className="toast-cite">{versoModal.cita}</p>
                  <span className="toast-note">Para esta canción...</span>
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
                title="Frasquito de Versículos Random"
              >
                <BookHeart size={20} />
              </button>

              <div className="song-info-mini">
                <span className="scrolling-text">
                    {/* Usamos el título de nuestra base de datos para que sea más limpio */}
                    {PLAYLIST_DATA[indiceActual] ? PLAYLIST_DATA[indiceActual].titulo : "Cargando..."}
                </span>
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
                    {PLAYLIST_DATA.map((item, i) => (
                      <button key={i} onClick={() => saltarA(i)} className={`pista-btn ${indiceActual === i ? 'playing' : ''}`}>
                        <span className="pista-num">{i + 1}</span>
                        <div className="pista-info">
                            <span className="pista-name">{item.titulo}</span>
                            <span className="pista-verse-preview">{item.verso.cita}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!mostrarLista && mostrarBiblia && (
                <div className="bible-overlay">
                  <div className="jar-container">
                    {!versiculoFrasco ? (
                        <div className="jar-closed" onClick={sacarPapelito}>
                            <span className="jar-emoji">🏺</span>
                            <p>Toca para un mensaje sorpresa</p>
                        </div>
                    ) : (
                        <div className={`paper-slip ${animandoVerso ? 'hidden' : 'visible'}`}>
                            <p className="verse-text">"{versiculoFrasco.texto}"</p>
                            <span className="verse-cite">{versiculoFrasco.cita}</span>
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
            <h2 className="texto-romantico">Ves el cielo luyahuita para mi eres desde la estrella mas pequeña hasta el universo mas grande</h2>
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
               // 1 = Reproduciendo, 3 = Buffering, -1 = Unstarted
               if (e.data === 1 || e.data === 3) actualizarInfo(e.target); 
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