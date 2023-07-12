const functions = require('firebase-functions')
const pegadorNoticias = require('./scrapper')
const admin = require('firebase-admin')

admin.initializeApp()
const db = admin.firestore()

const getToday = () => {
  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const hour = today.getHours()
  const minutes = today.getMinutes()

  return `${day}/${month}/${year} ${hour}:${minutes}`
}

exports.atualizarbd = functions
  .region('southamerica-east1')
  .runWith({ memory: '2GB', timeoutSeconds: 30 })
  .pubsub.schedule('every 1 hours')
  .timeZone('America/Sao_Paulo')
  .onRun(async () => {
    try {
      const DataPesquisa = getToday()
      const dadosNoticias = await pegadorNoticias.atualizarnoticias()

      const colecaoRef = db.collection('NoticiasPassadas')
      const novoDocumentoRef = colecaoRef.doc()
      await novoDocumentoRef.set({ dadosNoticias, DataPesquisa })

      const colecaoUltimasNoticias = db.collection('NoticiasAtuaais')
      await colecaoUltimasNoticias.doc('Recente').set({ dadosNoticias, DataPesquisa })
      //
    } catch (error) {
      throw new Error(error)
    }
  })
