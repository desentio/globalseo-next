import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import { GlobalSeoScript } from 'globalseo-next'

function GlobalSeoWithSubdomain() {
  return (
    <GlobalSeoScript
      apiKey="YOUR_API_KEY"
      originalLanguage="en"
      allowedLanguages="en, es"
      excludeClasses="class1, class2"
      excludeIds="id1, id2"
      translationMode="subdomain"
      customLinks={{
        'https://www.example.com/file_en.pdf': {
          de: 'https://www.example.com/file_de.pdf',
          fr: 'https://www.example.com/file_fr.pdf',
          es: 'https://www.example.com/file_es.pdf',
        },
        'https://www.example.com/file_en.doc': {
          de: 'https://www.example.com/file_de.doc',
          fr: 'https://www.example.com/file_fr.doc',
          es: 'https://www.example.com/file_es.doc',
        },
      }}
    />
  )
}

function GlobalSeoClientSideOnly() {
  return (
    <GlobalSeoScript
      apiKey="YOUR_API_KEY"
      originalLanguage="en"
      allowedLanguages="en, es"
      excludeClasses="class1, class2"
      excludeIds="id1, id2"
      useBrowserLanguage="true"
      translationMode='client_side_only'
    />
  )
}

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />

        {/* Add one, either with or without subdomain, don't add both! */}
        <GlobalSeoWithSubdomain />
        <GlobalSeoClientSideOnly />
      </body>
    </Html>
  )
}
