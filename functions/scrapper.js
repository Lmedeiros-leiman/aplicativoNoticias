const puppeteer = require('puppeteer')

let browser = ''

async function pegardadosCorreioPovo (browser) {
  try {
    const page = await browser.newPage()
    await page.goto('https://www.correiodopovo.com.br/', {
      waitUntil: 'domcontentloaded'
    })
    const dados = await page.evaluate(() => {
      const site = 'Correio Do Povo'
      const noticias = []

      const conteudo = document.querySelector('.Lista.Listaabertura')
      const conteudoPrincipal = conteudo.querySelectorAll('[class^="item1"],[class^="item2"],[class^="item3"],[class^="item4"],[class^="item5"],[class^="item6"]')
      const CarroselNoticias = conteudo.querySelectorAll('.owl-item')

      conteudoPrincipal.forEach((item) => {
        const titulo = item.querySelectorAll('a')[1] ? item.querySelectorAll('a')[1].textContent : ''
        const subtitulo = item.querySelector('p') ? item.querySelector('p').textContent : ''
        const linkMateria = item.querySelectorAll('a')[1] ? item.querySelectorAll('a')[1].href : ''
        const URLimagem = item.querySelector('img') ? item.querySelector('img').src : 'https://portal.correiodopovo.com.br/imagens/Correio_do_Povo.png'

        const itens = { titulo, subtitulo, linkMateria, URLimagem, site }
        noticias.push(itens)
      })

      CarroselNoticias.forEach((item) => {
        const titulo = item.querySelector('span.section') ? item.querySelector('span.section').textContent : ''
        const subtitulo = item.querySelector('h3 a') ? item.querySelector('h3 a').textContent : ''
        const linkMateria = item.querySelector('h3 a') ? item.querySelector('h3 a').href : ''
        const URLimagem = item.querySelector('img') ? item.querySelector('img').src : 'https://portal.correiodopovo.com.br/imagens/Correio_do_Povo.png'

        const itens = { titulo, subtitulo, linkMateria, URLimagem, site }
        noticias.push(itens)
      })

      return noticias
    })

    await page.close()
    return dados
  } catch (error) { return error }
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

      const blocoNoticias = document.querySelectorAll('div._evg:nth-child(2) .feed-post-body')
      blocoNoticias.forEach(async (item) => {
        const corpobloco = item
        const titulo = await corpobloco.querySelectorAll('a')[0] ? await corpobloco.querySelectorAll('a')[0].textContent : ''
        const subtitulo = await corpobloco.querySelectorAll('a')[2] ? await corpobloco.querySelectorAll('a')[2].textContent : ''
        const linkMateria = await corpobloco.querySelectorAll('a')[0] ? await corpobloco.querySelectorAll('a')[0].href : ''
        const URLimagem = await corpobloco.querySelector('picture img') ? await corpobloco.querySelector('picture img').src : 'https://upload.wikimedia.org/wikipedia/commons/3/34/Logotipo_g1.svg'

        const itens = { titulo, subtitulo, linkMateria, URLimagem, site }
        noticias.push(itens)
      })

      return noticias
    })
    await page.close()
    return dados
  } catch (error) { return error }
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
    console.log("ok!")
    return [...CorreioDoPovo, ...G1]
  
}

exports.atualizarnoticias = pegarNoticias
//pegarNoticias()
