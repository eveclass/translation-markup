import { FormatOptions } from '../enums/FormatOptions';
import { ICompileOptions } from '../interfaces/ICompileOptions';
import { GlobWrapper } from '../wrappers/GlobWrapper';
import { Compiler } from './Compiler';
import { Translator } from './Translator';

/**
 * Engine translator class
 */
export class Engine {
  private readonly glob: GlobWrapper;
  private readonly compiler: Compiler;
  private readonly translator: Translator;

  constructor() {
    this.compiler = new Compiler();
    this.glob = new GlobWrapper();
    this.translator = new Translator();
  }

  /**
   * @method yamlCompile Does the actual yaml to js/json translation
   * @param globAsync Glob style path where to find the yaml files
   * @param outputDirectory Directory to output the translations
   * @param options Compile options
   */
  public async yamlCompile({
    globPath = './**/*.yaml',
    outputDirectory = './translations',
    options = {}
  }: {
    globPath?: string;
    outputDirectory?: string;
    options?: ICompileOptions;
  } = {}): Promise<boolean> {
    if (!options.format) {
      options.format = FormatOptions.JSON;
    }
    if (!options.splitFiles) {
      options.splitFiles = true;
    }
    if (!options.outputName) {
      options.outputName = 'translations';
    }

    //Get every yaml translations file path
    const filePaths = await this.glob.globAsync({
      pattern: globPath
    });

    const outDir = this.cleanOutputDir({ outputDirectory });

    await Promise.all(
      filePaths.map(async (path: string) => {
        const fileTranslations = await this.translator.generateYamlFileTranslationsArray(
          {
            filePath: path
          }
        );

        return this.compiler.compileTranslations({
          fileTranslations,
          outputDirectory: outDir,
          splitFiles: options.splitFiles,
          format: options.format
        });
      })
    );

    return true;
  }

  private cleanOutputDir({
    outputDirectory
  }: {
    outputDirectory: string;
  }): string {
    let outputDir = outputDirectory;

    if (outputDirectory.substr(-1) === '/' && outputDirectory.length > 1) {
      outputDir = outputDirectory.slice(0, outputDirectory.length - 1);
    }

    return outputDir;
  }
}
