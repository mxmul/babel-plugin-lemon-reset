import path from 'path';
import pluginTester from 'babel-plugin-tester';
import plugin from '../src';

pluginTester({
  plugin,
  babelOptions: {
    parserOpts: {
      plugins: ['jsx']
    },
    generatorOpts: {
      retainLines: true
    }
  },
  fixtures: path.join(__dirname, '..', '__fixtures__')
});
