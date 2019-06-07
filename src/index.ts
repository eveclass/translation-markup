import { ICompileOptions } from './interfaces/ICompileOptions';
import { Engine } from './model/Engine';

const engine = new Engine();

export async function compile({
  globPath = './**/*.lang.yaml',
  outputDirectory = './translations',
  options = {}
}: {
  globPath?: string;
  outputDirectory?: string;
  options?: ICompileOptions;
} = {}): Promise<void> {
  return engine.compile({ globPath, outputDirectory, options });
}

export async function getJSTranslation({
  yamlLangContent
}: {
  yamlLangContent: string;
}): Promise<string> {
  return engine.getJSTranslation({ yamlLangContent });
}

export async function getJSONTranslation({
  yamlLangContent
}: {
  yamlLangContent: string;
}): Promise<string> {
  return engine.getJSONTranslation({ yamlLangContent });
}
