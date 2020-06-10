export default function transform({types: t}) {
  let lemonStylesImported = false;
  let lemonResetStylesIdentifier;

  return {
    name: 'babel-plugin-lemon-reset',
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      Program(path) {
        lemonResetStylesIdentifier = path.scope.generateUidIdentifier(
          'lemonStyles'
        );
      },
      ImportDeclaration(path) {
        if (path.node.source.value === 'lemon-reset') {
          // Inject an import of the lemon-reset CSS if this is the first occurence.
          if (!lemonStylesImported) {
            path.insertBefore(
              t.importDeclaration(
                [t.importDefaultSpecifier(lemonResetStylesIdentifier)],
                t.stringLiteral(
                  'lemon-reset/lib/components/LemonReset/LemonReset.css'
                )
              )
            );
            lemonStylesImported = true;
          }

          const specifiers = path.node.specifiers;

          specifiers.forEach((specifier) => {
            let domTag = specifier.imported.name.toLowerCase();
            if (domTag === 'domobject') {
              domTag = 'object';
            }

            const className = `lemon--${domTag}`;
            const localName = specifier.local.name;
            const binding = path.scope.bindings[localName];
            binding.referencePaths.forEach((referencePath) => {
              if (referencePath.isJSXIdentifier()) {
                referencePath.node.name = domTag;
                if (referencePath.container.type === 'JSXOpeningElement') {
                  // Replace all tagRef attributes with regular refs
                  referencePath.container.attributes.forEach((attribute) => {
                    if (
                      attribute.type === 'JSXAttribute' &&
                      attribute.name.name === 'tagRef'
                    ) {
                      attribute.name.name = 'ref';
                    }
                  });

                  // Add or prepend className
                  const classNameAttrIdx = referencePath.parent.attributes.findIndex(
                    (attribute) =>
                      attribute.type === 'JSXAttribute' &&
                      attribute.name.name === 'className'
                  );
                  if (classNameAttrIdx >= 0) {
                    const attrValuePath = referencePath.parentPath.get(
                      `attributes.${classNameAttrIdx}.value`
                    );
                    attrValuePath.replaceWith(
                      t.jsxExpressionContainer(
                        t.binaryExpression(
                          '+',
                          t.memberExpression(
                            lemonResetStylesIdentifier,
                            t.stringLiteral(className),
                            true
                          ),
                          t.binaryExpression(
                            '+',
                            t.stringLiteral(' '),
                            attrValuePath.isJSXExpressionContainer()
                              ? attrValuePath.node.expression
                              : attrValuePath.node
                          )
                        )
                      )
                    );
                  } else {
                    referencePath.parent.attributes.push(
                      t.jsxAttribute(
                        t.jsxIdentifier('className'),
                        t.jsxExpressionContainer(
                          t.memberExpression(
                            lemonResetStylesIdentifier,
                            t.stringLiteral(className),
                            true
                          )
                        )
                      )
                    );
                  }
                }
              } else if (referencePath.isIdentifier()) {
                // Replace all non-JSX tag references with the dom tag string literal
                referencePath.replaceWith(t.stringLiteral(domTag));
              }
            });
          });

          // Remove the imports of Lemon Reset tags
          path.remove();
        }
      }
    }
  };
}
