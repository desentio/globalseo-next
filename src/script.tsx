import React from "react";
import Script from "next/script";
import { LanguageEnum } from './languages'

// CORE ATTRIBUTES
const DATA_API_KEY = `data-globalseo-key`
const DATA_ORIGINAL_LANG = "data-original-language";
const DATA_ALLOWED_LANGUAGES = "data-allowed-languages";

// COMMON OPTIONAL ATTRIBUTES
const DATA_USE_BROWSER_LANG = "data-use-browser-language"; // default: true
const DATA_EXCLUDE_CLASSES = "data-exclude-classes";
const DATA_EXCLUDE_IDS = "data-exclude-ids";
const DATA_REPLACE_LINKS = "data-replace-links"; // default: true
const DATA_AUTO_CREATE_SELECTOR = "data-auto-create-selector"; // default: true
const DATA_DELAY = "data-timeout"; // default: 0
const DATA_DYNAMIC_TRANSLATION = "data-dynamic-translation"; // default: true
const DATA_TRANSLATE_ATTR = "data-translate-attributes"; // default: false

// SUBDOMAIN OPTIONAL ATTRIBUTES
const DATA_TRANSLATION_MODE = "data-translation-mode"; // default: "searchParams"

// ADVANCED OPTIONAL ATTRIBUTES
const DATA_LANG_PARAMETER = "data-lang-parameter"; // default: "lang"
const DATA_CUSTOM_LANG_CODE = "data-custom-language-code"; // format: "kk=kz, en=us, ru=rs"
const DATA_MERGE_INLINE = "data-translate-splitted-text"; // default: false
const DATA_EXCLUDE_CONTENTS = "data-exclude-contents"; // format: "{{content1}}, {{content2}}"
const DATA_DEBOUNCE = "data-debounce" // format: "2000"
const DATA_TRANSLATE_FORM_PLACEHOLDER = "data-translate-form-placeholder"
const DATA_TRANSLATE_SELECT_OPTIONS = "data-translate-select-options"
const DATA_DOMAIN_SOURCE_PREFIX = "data-domain-source-prefix"
const DATA_TRANSLATION_CACHE = "data-translation-cache";

interface BaseGlobalSeoScriptProps {
  apiKey: string;
  originalLanguage: string;
  allowedLanguages: string | LanguageEnum[];
  
  useBrowserLanguage?: string;
  excludeClasses?: string;
  excludeIds?: string;
  replaceLinks?: string;
  autoCreateSelector?: string;
  delay?: string;
  dynamicTranslation?: string;
  translateAttributes?: string;

  langParameter?: string;
  customLanguageCode?: string;
  mergeInline?: string;
  excludeContents?: string;
  debounce?: string;
  translateFormPlaceholder?: string;
  translateSelectOptions?: string;
  translationCache?: string;
}

interface GlobalSeoScriptWithSubdomainProps extends BaseGlobalSeoScriptProps {
  translationMode: 'subdomain';
  domainSourcePrefix?: string;
  // object of languageIsoCodes as key and string as value
  customLinks?: Record<string, Partial<Record<LanguageEnum, string>>>;
}

interface GlobalSeoScriptWithSearchParamsProps extends BaseGlobalSeoScriptProps {
  translationMode: 'client_side_only';
}

export default async function GlobalSeoScript({
  apiKey,
  originalLanguage,
  allowedLanguages,
  
  useBrowserLanguage,
  excludeClasses,
  excludeIds,
  replaceLinks,
  autoCreateSelector,
  delay,
  dynamicTranslation,
  translateAttributes,
  translationMode = 'client_side_only',

  langParameter,
  customLanguageCode,
  mergeInline,
  excludeContents,
  debounce,
  translateFormPlaceholder,
  translateSelectOptions,
  translationCache,

  ...props
} : GlobalSeoScriptWithSearchParamsProps | GlobalSeoScriptWithSubdomainProps) {

  const dataAttributes: Record<string, string | undefined> = {
    [DATA_API_KEY]: apiKey,
    [DATA_ORIGINAL_LANG]: originalLanguage,
    [DATA_ALLOWED_LANGUAGES]: typeof allowedLanguages == 'string' ? allowedLanguages : allowedLanguages.join(', '),
    [DATA_USE_BROWSER_LANG]: useBrowserLanguage,
    [DATA_EXCLUDE_CLASSES]: excludeClasses,
    [DATA_EXCLUDE_IDS]: excludeIds,
    [DATA_REPLACE_LINKS]: replaceLinks,
    [DATA_AUTO_CREATE_SELECTOR]: autoCreateSelector,
    [DATA_DELAY]: delay,
    [DATA_DYNAMIC_TRANSLATION]: dynamicTranslation,
    [DATA_TRANSLATE_ATTR]: translateAttributes,
    [DATA_LANG_PARAMETER]: langParameter,
    [DATA_CUSTOM_LANG_CODE]: customLanguageCode,
    [DATA_MERGE_INLINE]: mergeInline,
    [DATA_EXCLUDE_CONTENTS]: excludeContents,
    [DATA_DEBOUNCE]: debounce,
    [DATA_TRANSLATE_FORM_PLACEHOLDER]: translateFormPlaceholder,
    [DATA_TRANSLATE_SELECT_OPTIONS]: translateSelectOptions,
    [DATA_TRANSLATION_CACHE]: translationCache,
  }

  // if translationMode is subdomain, we need to add the data-translation-mode, otherwise we don't need it because it's actually "searchParams" in the globalseo npm package, not "client_side_only".
  if (translationMode != 'client_side_only') {
    dataAttributes[DATA_TRANSLATION_MODE] = translationMode;
    dataAttributes[DATA_DOMAIN_SOURCE_PREFIX] = (props as GlobalSeoScriptWithSubdomainProps).domainSourcePrefix;
  }

  const customLinks = (props as GlobalSeoScriptWithSubdomainProps).customLinks;
  if (customLinks) {
    // the end results will be like this:
    // data-custom-links-de="['/file.pdf', '/file_de.pdf']"

    let results: Partial<Record<LanguageEnum, [string, string][]>> = {}

    Object.keys(customLinks).forEach((originalUrl) => {
      const langCodes = customLinks[originalUrl]; // { de: '/file_de.pdf', fr: '/file_fr.pdf' }
      Object.keys(langCodes).forEach(langCode => {
        const inferredLangCode = langCode as LanguageEnum;
        if (!results[inferredLangCode]) {
          results[inferredLangCode] = [[originalUrl, langCodes[inferredLangCode] ?? '']]
        } else {
          results[inferredLangCode].push([originalUrl, langCodes[inferredLangCode] ?? ''])
        }
      })
    })

    Object.keys(results).forEach(langCode => {
      dataAttributes[`data-custom-links-${langCode}`] = JSON.stringify(results[langCode as LanguageEnum]).slice(1, -1);
    })
  }

  Object.keys(dataAttributes).forEach(key => {
    if (dataAttributes[key] == null) {
      delete dataAttributes[key];
    }
  })

  // the div with id="globalseo-settings" is helpful to speedup the translation process
  return (
    <>
      {translationMode == "subdomain" && <div id="globalseo-settings" {...dataAttributes}></div>}
      <Script
        src="https://unpkg.com/globalseo/dist/translate.js"
        {...dataAttributes}
      ></Script>
    </>
  )
}
