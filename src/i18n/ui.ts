import es from './es.json';
import en from './en.json';
interface LanguageMap {
  [key: string]: string;
}
export const languages = {
  en: 'EN',
  es: 'ES',
};
const english = en as LanguageMap;
const spanish = es as LanguageMap;

export const defaultLang = 'en';

export async function fetchTranslations(): Promise<{
  en: LanguageMap;
  es: LanguageMap;
}> {
  // if(process.env.NODE_ENV === 'development') {
    return { en: english, es: spanish };
  // }
  // let translations: Promise<{}>[] = [];
  // Object.keys(languages).forEach(lang => {
  //   translations.push(new Promise((resolve) => {
  //     const url = `https://raw.githubusercontent.com/yuli-ferna/portfolio-assets/refs/heads/main/locale/${lang}.json`;
  //     resolve(fetch(url)
  //     .then(res => res.json()).catch(() => ({})))
  //   }));
  // });
  // const [en, es] = await Promise.all(translations);
  // return { en, es };
}
