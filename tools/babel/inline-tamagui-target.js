module.exports = function inlineTamaguiTarget() {
  const inlineValue = process.env.TAMAGUI_TARGET;

  return {
    name: 'inline-tamagui-target',
    visitor: {
      MemberExpression(path) {
        if (!inlineValue) {
          return;
        }

        if (path.matchesPattern('process.env.TAMAGUI_TARGET')) {
          path.replaceWithSourceString(JSON.stringify(inlineValue));
        }
      },
    },
  };
};
