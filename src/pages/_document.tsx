import Document, { Html, Head, Main, NextScript, DocumentInitialProps } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'

import { createEmotionCache } from '@utils/styles/createEmotionCache'

import { theme, ubuntu } from '@styles/theme'

interface MyDocumentProps extends DocumentInitialProps {
  emotionStyleTags?: JSX.Element[]
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR" className={ubuntu.className}>
        <Head>
          <meta name="theme-color" content={theme.light.palette.primary.main} />
          <meta name="emotion-insertion-point" content="" />
          {(this.props as MyDocumentProps).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage

  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        },
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  return {
    ...initialProps,
    emotionStyleTags,
  }
}
