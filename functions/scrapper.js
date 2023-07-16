const { info } = require('firebase-functions/logger')
const puppeteer = require('puppeteer')

async function pegardadosCorreioPovo (browser) {

  const page = await browser.newPage()
  await page.goto('https://www.correiodopovo.com.br/', { waitUntil: 'domcontentloaded' } )

  const dados = await page.evaluate( async () => {
    const noticias = []
    const site = 'Correio Do povo'

    // busca os blocos com noticias:
    document.querySelectorAll('.Lista') ? document.querySelectorAll('.Lista').forEach( bloco => {
      // busca dentro dos blocos de noticias
      bloco.querySelectorAll('[class^="item1"],[class^="item2"],[class^="item3"],[class^="item4"],[class^="item5"],[class^="item6"],[class^="item7"],[class^="item8"],[class^="item9"],[class^="item10"],[class^="item11"],[class^="item12"]') ? bloco.querySelectorAll('[class^="item1"],[class^="item2"],[class^="item3"],[class^="item4"],[class^="item5"],[class^="item6"],[class^="item7"],[class^="item8"],[class^="item9"],[class^="item10"],[class^="item11"],[class^="item12"]')
        .forEach (  (item) => {
          
          const titulo = item.querySelector('h2 a') ?  item.querySelector('h2 a').textContent : ( item.querySelector('h3 a') ? item.querySelector('h3 a').textContent : '' )
          
          const subtitulo = []
          item.querySelectorAll('p a') ? item.querySelectorAll('p a').forEach( (item) => {
            const texto = item.textContent
            subtitulo.push(texto)
          }) : subtitulo.push('')
          
          const linkMateria = item.querySelector('a') ?  item.querySelector('a').href : ''
          const URLimagem = item.querySelector('img') ?  item.querySelector('img').src : 'https://portal.correiodopovo.com.br/imagens/Correio_do_Povo.png'

          const dados = {titulo, subtitulo, linkMateria, URLimagem, site}
          noticias.push(dados)

        }) : '' // não carregou lista de itens
      
      // busca por carroseis
      bloco.querySelectorAll('.owl-item') ? bloco.querySelectorAll('.owl-item')
        .forEach( (item) => {
          const titulo = item.querySelector('section.section') ? item.querySelector('section.section').textContent : ''
          //
          const subtitulo = []
          const textosubtitulo = item.querySelector('h2 a') ?  item.querySelector('h2 a').textContent : ( item.querySelector('h3 a') ? item.querySelector('h3 a').textContent : '' )
          subtitulo.push(textosubtitulo)
          //
          const linkMateria = item.querySelector('a') ?  item.querySelector('a').href : ''
          const URLimagem = item.querySelector('img') ?  item.querySelector('img').src : 'https://portal.correiodopovo.com.br/imagens/Correio_do_Povo.png'

          const dados = {titulo, subtitulo, linkMateria, URLimagem, site}
          noticias.push(dados)     
        }) : '' // não encontrou carrosel


    }) : noticias.push('Erro ao carregar .LISTA')


    return noticias
  })
  return dados
}
async function pegardadosG1 (browser) {
  try {
    const page = await browser.newPage()
    await page.goto('https://g1.globo.com/', {
      waitUntil: 'domcontentloaded'
    })
    await page.waitForSelector('div._evg:nth-child(2) .feed-post-body')

    const dados = await page.evaluate(() => {
      const noticias = []
      const site = 'G1'

      const blocoNoticias = document.querySelectorAll('div._evg:nth-child(2) .feed-post-body') ? document.querySelectorAll('div._evg:nth-child(2) .feed-post-body') : []
      blocoNoticias.forEach( async (item) =>  {
        const corpobloco = item
        const titulo = await corpobloco.querySelector('a') ? await corpobloco.querySelector('a').textContent : ''
        const blocosubtitulos = await item.querySelectorAll('.bstn-relateditem') ? await item.querySelectorAll('.bstn-relateditem') : []
        const blocoparagrafos = await item.querySelectorAll('.feed-post-body-resumo') ? await item.querySelectorAll('.feed-post-body-resumo') : []

        let subtitulo = []
        blocosubtitulos.forEach( async (item) => {
          let texto = await item.querySelector('a').textContent
          subtitulo.push(texto)
          teste.push(texto)
        })

        blocoparagrafos.forEach( async (item) =>  {
          let texto = await item.querySelector('a').textContent
          subtitulo.push(texto)
          teste.push(texto)
        })

        const linkMateria = await corpobloco.querySelectorAll('a')[0] ? await corpobloco.querySelectorAll('a')[0].href : ''
        const URLimagem = await corpobloco.querySelector('picture img') ? await corpobloco.querySelector('picture img').src : 'https://upload.wikimedia.org/wikipedia/commons/3/34/Logotipo_g1.svg'

        const itens = { titulo, subtitulo, linkMateria, URLimagem, site }
        noticias.push(itens)
      })

      return noticias
    })
    await page.close()
    return dados
  } catch (error) { return [] }
}

const pegarNoticias = async () => {
    browser = await puppeteer.launch({
      headless: 'new',
    })
    
    // pega as noticias:
    const CorreioDoPovo = await pegardadosCorreioPovo(browser)
    const G1 = await pegardadosG1(browser)
    // fecha o browser + qualquer website.
    await browser.close()
    return {CorreioDoPovo, G1}
}

exports.atualizarnoticias = pegarNoticias
