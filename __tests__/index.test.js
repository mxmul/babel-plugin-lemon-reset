import path from 'path';
import pluginTester from 'babel-plugin-tester';
import plugin from '../src';

pluginTester({
  plugin,
  babelOptions: {
    generatorOpts: {
      retainLines: true
    }
  },
  fixtures: path.join(__dirname, '..', '__fixtures__')
});
