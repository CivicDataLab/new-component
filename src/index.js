#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const program = require('commander');

const {
  getConfig,
  buildPrettifier,
  logIntro,
  logItemCompletion,
  logConclusion,
  logError,
  fileCreation
} = require('./helpers');
const {
  mkDirPromise,
  writeFilePromise,
} = require('./utils');

// Load our package.json, so that we can pass the version onto `commander`.
const { version } = require('../package.json');

// Get the default config for this component (looks for local/global overrides,
// falls back to sensible defaults).
const config = getConfig();

// Convenience wrapper around Prettier, so that config doesn't have to be
// passed every time.
const prettify = buildPrettifier(config.prettierConfig);

program
  .version(version)
  .arguments('<componentName>')
  .option(
    '-t, --type <componentType>',
    'Type of React component to generate (default: "functional")',
    /^(class|pure-class|functional)$/i,
    config.type
  )
  .option(
    '-d, --dir <pathToDirectory>',
    'Path to the "components" directory (default: "src/components")',
    config.dir
  )
  .option(
    '-x, --extension <fileExtension>',
    'Which file extension to use for the component (default: "js")',
    config.extension
  )
  .parse(process.argv);

const [componentName] = program.args;

// Find the path to the selected template file.
const templatePath = `./templates/${program.type}.tsx`;
const styleTemplatePath = `./templates/styling.scss`;
const testTemplatePath = `./templates/test.tsx`;
const storyTemplatePath = `./templates/storybook.tsx`;

// Get all of our file paths worked out, for the user's project.
const componentDir = `${program.dir}/${componentName}`;
const filePath = `${componentDir}/${componentName}.${program.extension}`;
const stylePath = `${componentDir}/${componentName}.module.scss`;
const testPath = `${componentDir}/${componentName}.test.${program.extension}`;
const storyPath = `${componentDir}/${componentName}.stories.${program.extension}`;
const indexPath = `${componentDir}/index.${program.extension}`;

// Our index template is super straightforward, so we'll just inline it for now.
const indexTemplate = prettify(`\
export { ${componentName} } from './${componentName}';
`);

logIntro({ name: componentName, dir: componentDir, type: program.type });

// Check if componentName is provided
if (!componentName) {
  logError(
    `Sorry, you need to specify a name for your component like this: new-component <name>`
  );
  process.exit(0);
}

// Check to see if a directory at the given path exists
const fullPathToParentDir = path.resolve(program.dir);
if (!fs.existsSync(fullPathToParentDir)) {
  logError(
    `Sorry, you need to create a parent "components" directory.\n(new-component is looking for a directory at ${program.dir}).`
  );
  process.exit(0);
}

// Check to see if this component has already been created
const fullPathToComponentDir = path.resolve(componentDir);
if (fs.existsSync(fullPathToComponentDir)) {
  logError(
    `Looks like this component already exists! There's already a component at ${componentDir}.\nPlease delete this directory and try again.`
  );
  process.exit(0);
}

// Start by creating the directory that our component lives in.
mkDirPromise(componentDir)
  .then(() => logItemCompletion('Directory created.'))
  // Create Main Component
  .then(() => fileCreation(componentName, prettify, templatePath, filePath))
  .then(() => logItemCompletion(`Component built and saved to disk.`))

  // Create Style Module Component
  .then(() => fileCreation(componentName, prettify, styleTemplatePath, stylePath, true))
  .then(() => logItemCompletion(`Style File built and saved to disk.`))

  // Create Test File
  .then(() => fileCreation(componentName, prettify, testTemplatePath, testPath))
  .then(() => logItemCompletion(`Test File built and saved to disk.`))

  // Create Storybook file
  .then(() => fileCreation(componentName, prettify, storyTemplatePath, storyPath, true))
  .then(() => logItemCompletion(`Story built and saved to disk.`))

  .then((template) =>
    // We also need the `index.js` file, which allows easy importing.
    writeFilePromise(indexPath, prettify(indexTemplate))
  )
  .then((template) => {
    logItemCompletion('Index file built and saved to disk.');
    return template;
  })
  .then((template) => {
    logConclusion();
  })
  .catch((err) => {
    console.error(err);
  });
