import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import TranslationsProvider from '../components/TranslationsProvider';
import initTranslations from '@/app/i18n';
import { createInstance } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';

//unit tests usetranslation method used in TranslationsProvider file 

export default function CustomComponent() {
  const { t } = useTranslation();

  return <div>{t('some.key', { some: 'variable' })}</div>;
}

//unit tests usetranslation method used in TranslationsProvider file

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

it('test render', () => {
  
  const tSpy = jest.fn((key) => key);
    useTranslation.mockReturnValue({ t: tSpy });

    const result = CustomComponent();

  expect(result.props.children).toBe('some.key');

  
  expect(tSpy).toHaveBeenCalledTimes(1);
  expect(tSpy).toHaveBeenLastCalledWith('some.key', { some: 'variable' });
});