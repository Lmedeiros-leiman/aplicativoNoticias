// importa componentes essenciais
import React, { useEffect, useState } from 'react'

// importa componentes visuais
import './App.css';
import Accordion from 'react-bootstrap/Accordion'
// importa firebase e componentes backEnd
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'


// realiza ações essenciais
const firebaseConfig = {
  /*
  ...
  Insira suas credenciais de projeto do firebase aqui...
  ...
  */
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()


// decreta as funcões

function App() {

  const notciasRef = db.collection('NoticiasAtuaais')
  const query = notciasRef.orderBy('DataPesquisa')

  const [noticias] = useCollectionData(query, {idField: 'id'})


  return (
    <div className="App App-header">
      
        <div> 
          { noticias ? <TabelaNoticias noticias={ noticias } /> : <LoadingScreen />}
        </div>
        
    
    </div>
  );
}

export default App;

function TabelaNoticias(props) {
  function pegarNomesNoticiarios(noticias) {
    return Object.keys(noticias.dadosNoticias).map( (nomeObjeto) => nomeObjeto ).filter( (nome) => nome.trim() !== ''  ) 
  }

  
  const ListaNoticias = props.noticias[0]
  const nomesSites = pegarNomesNoticiarios(ListaNoticias)
  
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return <>
  <div>
    <div>
      <div>Ultimas Vez atualizado: { ListaNoticias.DataPesquisa }</div>
      <div>
        { nomesSites.map( noticiario => 
          <BlocoNoticias
            contagem={counter}
            noticiario={noticiario} 
            noticias={ ListaNoticias.dadosNoticias[noticiario] } 
            /> )}
      </div> 
    </div>
  </div>
    
  </>
}

function BlocoNoticias(props) {
  const { contagem, noticiario, noticias } = props
 
  return ( 
  <>
    <Accordion className='blocopadrao' >
        <Accordion.Item eventKey={ contagem.toString() }>
            <Accordion.Header>{noticiario}</Accordion.Header>
              <Accordion.Body>
                <section className='container'>
                  <main>
                       { noticias.map( (noticias) =>  < NoticiaIndividual noticia={noticias} /> )}
                  </main>
                <footer></footer>
              </section>
            </Accordion.Body>
          </Accordion.Item>
      </Accordion>  
  </>)
}
function NoticiaIndividual(props){
  const titulo = props.noticia.titulo
  const subtitulos = props.noticia.subtitulo
  const linkMateria = props.noticia.linkMateria
  const URLimagem = props.noticia.URLimagem

  if (titulo === 'Vídeos curtos do g1') {
    return (<></>)
  }
  
  return(<>
    <div className='divisor'>
      <picture><img src={URLimagem} alt='Imagem sobre a máteria' /></picture>
      <section>
        <div>{titulo}</div>
        {subtitulos.map( subtitulo => <div className='subtitulo'>{ subtitulo }</div>)}
        <div className='botaoMateria'><a target="_blank" href={linkMateria} rel="noreferrer"><button>Acessar Conteudo</button></a></div>
      </section>
    </div>
  </>)
}


function LoadingScreen() {


  return <>
    <div>
      Loading...
    </div>

  </>
}
