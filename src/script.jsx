import React from "react";
import Script from "next/script";

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

  translationMode,
  langParameter,
  customLanguageCode,
  mergeInline,
  excludeContents,
  debounce,
  translateFormPlaceholder,
  translateSelectOptions,
  domainSourcePrefix,
  translationCache,
}) {

  const dataAttributes = {
    [DATA_API_KEY]: apiKey,
    [DATA_ORIGINAL_LANG]: originalLanguage,
    [DATA_ALLOWED_LANGUAGES]: allowedLanguages,
    [DATA_USE_BROWSER_LANG]: useBrowserLanguage,
    [DATA_EXCLUDE_CLASSES]: excludeClasses,
    [DATA_EXCLUDE_IDS]: excludeIds,
    [DATA_REPLACE_LINKS]: replaceLinks,
    [DATA_AUTO_CREATE_SELECTOR]: autoCreateSelector,
    [DATA_DELAY]: delay,
    [DATA_DYNAMIC_TRANSLATION]: dynamicTranslation,
    [DATA_TRANSLATE_ATTR]: translateAttributes,
    [DATA_TRANSLATION_MODE]: translationMode,
    [DATA_LANG_PARAMETER]: langParameter,
    [DATA_CUSTOM_LANG_CODE]: customLanguageCode,
    [DATA_MERGE_INLINE]: mergeInline,
    [DATA_EXCLUDE_CONTENTS]: excludeContents,
    [DATA_DEBOUNCE]: debounce,
    [DATA_TRANSLATE_FORM_PLACEHOLDER]: translateFormPlaceholder,
    [DATA_TRANSLATE_SELECT_OPTIONS]: translateSelectOptions,
    [DATA_DOMAIN_SOURCE_PREFIX]: domainSourcePrefix,
    [DATA_TRANSLATION_CACHE]: translationCache,
  }

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
