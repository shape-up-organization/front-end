import { Cookies } from 'react-cookie'

const downloadTxtFile = (title, content) => {
  const sanitizedTitle = title.replace(/[^\w\d]/g, '_')
  const anchor = document.createElement('a')
  const blob = new Blob([content], { type: 'text/plain' })

  if ('download' in anchor) {
    anchor.href = URL.createObjectURL(blob)
    anchor.download = `${sanitizedTitle}.txt`

    anchor.style.display = 'none'
    document.body.appendChild(anchor)

    anchor.click()

    document.body.removeChild(anchor)
    URL.revokeObjectURL(anchor.href)
  } else {
    const errorMessage =
      'Your browser does not support the download functionality. Please try using a different browser.'
    alert(errorMessage)
    console.error(errorMessage)
  }
}

const extractTextFromFile = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const content = reader.result
      resolve(content)
    }

    reader.onerror = () => {
      reject(new Error('An error occurred while reading the file.'))
    }

    reader.readAsText(file)
  })

const getJwtToken = () => new Cookies().get('jwt-token')

const objectToQueryString = obj =>
  `?${Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&')}`

const imageUrlToFileBlob = async url => {
  const response = await fetch(url)
  const blob = await response.blob()
  return blob
}

export {
  downloadTxtFile,
  extractTextFromFile,
  getJwtToken,
  imageUrlToFileBlob,
  objectToQueryString,
}
