//
// npm run new:sfc -- --tag=p
//

const camelToPascalCase = (text) => text.charAt(0).toUpperCase() + text.slice(1)

module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = [
      {
        type: 'select',
        name: 'category',
        message: 'Which Atomic Design category?',
        choices: ['atoms', 'molecules', 'organisms', 'templates'],
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the name of component?',
      },
      {
        type: 'input',
        name: 'dir',
        message: 'Where is the directory? (No problem in blank)',
      },
      {
        type: 'confirm',
        name: 'haveHooks',
        message: 'Is it have hooks?',
      },
    ]
    return inquirer.prompt(questions).then((answers) => {
      const { category, componentName, dir, ...results } = answers
      const path = `${category}/${dir ? `${dir}/` : ``}${componentName}`
      const absPath = `app/javascript/src/components/${path}`
      const typeAnnotate = 'React.VFC<Props>'
      const props = '()'
      const tag = args.tag ? args.tag : 'div'
      return {
        ...results,
        path,
        absPath,
        typeAnnotate,
        props,
        tag,
        dir,
        category: camelToPascalCase(category),
        componentName: camelToPascalCase(componentName),
      }
    })
  },
}
