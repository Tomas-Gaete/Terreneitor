import Image from "next/image";
import initTranslations from '../i18n';
import TranslationsProvider from '@components/TranslationsProvider';

const i18nNamespaces = ['common'];

export default async  function Home({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
    namespaces={i18nNamespaces}
    locale={locale}
    resources={resources}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div>
            <h1 className="text-4xl font-bold">{t(1)}</h1>
            <p className="text-lg text-center">
            {t(2)}
            </p>
          </div>
        </main>
    </TranslationsProvider>
  );
}
