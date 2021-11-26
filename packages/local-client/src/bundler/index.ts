import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetch } from './plugins/fetch-plugin';

let service: any;
export default async (rawCode: string) => {
  if (!service) {
    await esbuild.initialize({
      wasmURL: '/esbuild.wasm',
      worker: true,
    });
    service = esbuild;
  }

  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetch(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    });

    return {
      code: result.outputFiles[0].text,
      error: '',
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        code: '',
        error: err.message,
      };
    }
  }
};
