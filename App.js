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
  apiKey: "AIzaSyCnyS_yVsC7LFfiCIP8U64jclOGnwYUhcI",
  authDomain: "sitesnoticias-webscrapper.firebaseapp.com",
  projectId: "sitesnoticias-webscrapper",
  storageBucket: "sitesnoticias-webscrapper.appspot.com",
  messagingSenderId: "248716292469",
  appId: "1:248716292469:web:863d10b10a3e8610a5a33c",
  measurementId: "G-S4EBXSZHQM"
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

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);
  
  const ListaNoticias = props.noticias[0]
  const nomesSites = pegarNomesNoticiarios(ListaNoticias)
  
  return <>
  <div>
    <div>
      <ul>Ultimas Vez atualizado:</ul>
      <ul>{ ListaNoticias.DataPesquisa }</ul>
      <div>
        { nomesSites.map( noticiario => <BlocoNoticias key={noticiario} contagem={counter} noticiario={noticiario} noticias={ ListaNoticias.dadosNoticias[noticiario]  } /> ) }
      </div> 
    </div>
  </div>
    <div>
      Carregado!
    </div>
  </>
}

function BlocoNoticias(props) {
  const { contagem, noticiario, noticias } = props
 
  return ( 
  <>
    <Accordion defaultActiveKey="0" flush>
      <Accordion.Item eventKey={ contagem.toString() }>
        <Accordion.Header>{ noticiario }</Accordion.Header>
        <Accordion.Body>
        <section>
          <header>{ noticiario }</header>
          <main>
            { noticias.map(noticia => <NoticiaIndividual noticia={noticia} /> ) }
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

  
  return(<>
    <div className='divisor'>
      <picture><img src={URLimagem} /></picture>
      <section>
        <ul>{titulo}</ul>
        {subtitulos.map( subtitulo => <ul className='subtitulo'>{ subtitulo }</ul>)}
        <div className='botaoMateria'><a href={linkMateria}><button>Acessar Conteudo</button></a></div>
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
