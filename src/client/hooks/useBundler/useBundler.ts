import { useEffect, useState } from 'react';
import bundle from './bundler';

interface BundlerOptions {
  initiateInput: string;
  inputSetter?: (arg: string) => void;
  autoBundle?: boolean;
  autoBundleTime?: number;
}
const useBundler = ({
  initiateInput,
  inputSetter,
  autoBundleTime = 750,
  autoBundle = true
}: BundlerOptions) => {
  const [input, setInput] = useState(initiateInput);
  const [aB, setAutoBundle] = useState(autoBundle);
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  const setInputMainFunction = (text: string) => {
    setInput(text);
    inputSetter && inputSetter(text);
  };
  const doBundleCode = async () => {
    const output = await bundle(input);
    setCode(output.code);
    setErr(
      output.err && output.err?.message ? output.err?.message : output.err
    );
  };
  const toggleAutoBundle = () => setAutoBundle(!aB);
  useEffect(() => {
    if (aB) {
      const timer = setTimeout(doBundleCode, autoBundleTime);
      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return {
    input,
    setInput: setInputMainFunction,
    code,
    errorString: err,
    doBundleCode,
    isAutoBundle: autoBundle,
    toggleAutoBundle
  };
};
export default useBundler;
