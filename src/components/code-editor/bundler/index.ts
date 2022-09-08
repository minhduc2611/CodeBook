import * as esBuild from 'esbuild-wasm';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

let service: void;

const bundle = async (rawCode: string) => {
  let result: esBuild.BuildResult;
  try {
    result = await build('');
  } catch (error) {
    service = await esBuild.initialize({
      worker: true,
      wasmURL: '/static/esbuild.wasm',
    });
  }

  try {
    result = await build(rawCode);
    return {
      code: result.outputFiles[0].text,
      err: null,
    };
  } catch (error) {
    return {
      code: '',
      err: error,
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
      global: 'window',
    },
  });
export default bundle;
