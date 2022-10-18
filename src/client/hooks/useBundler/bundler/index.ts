import * as esBuild from 'esbuild-wasm';

import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const bundle = async (rawCode: string) => {
  let result: esBuild.BuildResult;
  try {
    result = await build('');
  } catch (error) {
    console.log('error bundling 1', error);

    await esBuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.14.54/esbuild.wasm'
      // wasmModule: 'esbuild.wasm'
    });
  }

  try {
    result = await build(rawCode);
    return {
      code: result.outputFiles[0].text,
      err: null
    };
  } catch (error2: any) {
    console.log('error bundling 2', error2);

    return {
      code: '',
      err: error2
    };
  }
};

const build = async (rawCode: string) =>
  await esBuild.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      'process.env.NODE_ENV': '"production"',
      global: 'window'
    }
  });
export default bundle;
