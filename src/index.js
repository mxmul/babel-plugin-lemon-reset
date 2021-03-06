function lemonTagToDomTag(name) {
  let domTag = name.toLowerCase();
  if (domTag === 'domobject') {
    domTag = 'object';
  }

  return domTag;
}

function replaceDomTagReferencePath({
  t,
  lemonResetStylesIdentifier,
  referencePath,
  domTag
}) {
  const className = `lemon--${domTag}`;

  if (
    referencePath.isJSXIdentifier() ||
    referencePath.isJSXMemberExpression()
  ) {
    referencePath.node.name = domTag;
    referencePath.node.type = 'JSXIdentifier'; // Is this allowed??
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
  }
}

export default function transform({types: t}) {
  return {
    name: 'babel-plugin-lemon-reset',
    inherits: require('babel-plugin-syntax-jsx'),
    visitor: {
      Program(path) {
        this.lemonResetStylesIdentifier = path.scope.generateUidIdentifier(
          'lemonStyles'
        );
      },
      ImportDeclaration(path) {
        if (path.node.source.value === 'lemon-reset') {
          // Inject an import of the lemon-reset CSS if this is the first occurence.
          if (!this.lemonStylesImported) {
            path.insertBefore(
              t.importDeclaration(
                [t.importDefaultSpecifier(this.lemonResetStylesIdentifier)],
                t.stringLiteral(
                  'lemon-reset/lib/components/LemonReset/LemonReset.css'
                )
              )
            );
            this.lemonStylesImported = true;
          }

          const specifiers = path.node.specifiers;

          specifiers.forEach((specifier) => {
            if (specifier.type === 'ImportNamespaceSpecifier') {
              const moduleLocalName = specifier.local.name;
              const moduleBindings = path.scope.bindings[moduleLocalName];
              moduleBindings.referencePaths.forEach((referencePath) => {
                if (referencePath.parent.property) {
                  const domTag = lemonTagToDomTag(
                    referencePath.parent.property.name
                  );
                  replaceDomTagReferencePath({
                    t,
                    lemonResetStylesIdentifier: this.lemonResetStylesIdentifier,
                    referencePath: referencePath.parentPath,
                    domTag
                  });
                }
              });
            } else {
              const domTag = lemonTagToDomTag(specifier.imported.name);
              const localName = specifier.local.name;
              const binding = path.scope.bindings[localName];
              binding.referencePaths.forEach((referencePath) => {
                replaceDomTagReferencePath({
                  t,
                  lemonResetStylesIdentifier: this.lemonResetStylesIdentifier,
                  referencePath,
                  domTag
                });
              });
            }
          });
        }
      }
    }
  };
}
