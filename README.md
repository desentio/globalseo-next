# About globalseo-next

Globalseo is a translation service that allows you to translate your website into multiple languages with low effort (powered by AI). This package provides a simple way to integrate [Globalseo](https://app.globalseo.ai) with your Next.js website.

## Integration with subdomains (Recommended, better for SEO)
For SEO purposes, it is recommended to use subdomains because our subdomain server will translate the page and return the html to the client. This way, the search engine will see the translated content without executing javascript.

**Usage**: put GlobalSeoScript component at the end of the body tag.

**File to modify for page router**: [pages/_document.tsx](./example/src/pages/_document.tsx)

**File to modify app router**: [app/layout.tsx](./example/src/app/layout.tsx)

```
import {GlobalSeoScript} from "globalseo-next";

<body>
  <GlobalSeoScript
    translationMode="subdomain"
    apiKey="YOUR_API_KEY"
    originalLanguage="en"
    allowedLanguages="en, es"
    excludeClasses="class1, class2"
    excludeIds="id1, id2"
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
</body>
```

## Integration using client side translation
Best for single page applications that don't need SEO.

**Usage**: put GlobalSeoScript component at the end of the body tag.

**File to modify for page router**: [pages/_document.js](./example/src/pages/_document.tsx)

**File to modify app router**: [app/layout.js](./example/src/app/layout.tsx)

```
import Head from "next/head";
import {GlobalSeoScript} from "globalseo-next";

<body>
  <GlobalSeoScript
    translationMode="client_side_only"
    apiKey="YOUR_API_KEY"
    originalLanguage="en"
    allowedLanguages="en, es"
    excludeClasses="class1, class2"
    excludeIds="id1, id2"
    useBrowserLanguage="true"
  />
</body>
```

# Add language switcher

Put GlobalSeoSelector component where you want the language switcher to appear.

**Example on page router**: [pages/language-selector-app-router.tsx](./example/src/pages/language-selector-page-router.tsx)

**Example on app router**: [app/language-selector-app-router/page.tsx](./example/src/app/language-selector-app-router/page.tsx)

```
import {GlobalSeoSelector} from "globalseo-next";

<GlobalSeoSelector color="#000" />
```


# Script Props:

#### Required Configuration:

- **apiKey**: Replace YOUR_API_KEY with the actual API key obtained from your project.
- **originalLanguage**: The original language of the website.
- **allowedLanguages**:  The languages that the website will be translated to.

#### Subdomain Configuration:
- **translationMode**: Set to `subdomain` to use subdomains for translated pages.
- **domainSourcePrefix**: If your website already implemented internationalization with path prefix, you can set this to the path prefix. For example, if your website has `/en/page-name` you can set this to `/en` so we can serve the page from `en.yourdomain.com/page-name` instead of `en.yourdomain.com/en/page-name`
- **customLinks**: Custom links for each language. The key must be exactly the same as the value of the `href` attribute of the link.

#### Optional Configuration:
- **useBrowserLanguage**: Automatically sets the language based on the user's browser language. Set to `false` to disable.
- **excludeClasses**: List CSS class names to exclude from translation, separated by commas (e.g., `chatbot, no-translate`).
- **excludeIds**: List IDs to exclude from translation, separated by commas (e.g., `user-comment, code-snippet` will prevent translation of elements with ID `user-comment` and `code-snippet`).

#### Advanced Configuration:
- **translateAttributes**: Translates `title` & `alt` attributes of images and links. Improves SEO and accessibility. Set to `true` to enable.
- **langParameter**: URL parameter for setting the language (default: "lang"). Use a custom value if preferred.
- **delay**: Delay (in milliseconds) before the translation service activates, ensuring the page content is fully loaded.
- **replaceLinks**:  Replaces links with translated URLs by appending the language code. Set to `false` to disable.
- **customLanguageCode**: Custom language code for the language selector (e.g., `kk=kz` for "KZ" instead of "KK").
- **excludeContents**: Excludes specific text from translation using regular expressions. Format: `{{regex1}} {{regex2}}`.
- **translateFormPlaceholder**: Translates form placeholders. Set to `true` to enable.
- **dynamicTranslation**: Allow GlobalSEO to automatically generate new translations. Set to `false` to disable. If you have already reached the quota limit, setting this to false will prevent the error message from appearing on your site.
- **translateSelectOptions**: Translate options inside select tag. Set to `true` to enable. The `globalseo-exclude` class will still be respected. 
