const path = require('path');
const fs = require('fs');

const placeholderFile = path.join(__dirname, '..', '_index.d.ts');
const placeholderLines = fs.readFileSync(placeholderFile).toString().split('\n');

const typesPath = path.join(__dirname, '..', 'types');

const indexLines = [];
placeholderLines.forEach(placeholderLine => {
   if (placeholderLine.trim().length <= 0) {
        return;
   }

   if (!placeholderLine.startsWith("//")) {
       return;
   }

   const comment = placeholderLine.substring(2).trim();
   if (!comment.startsWith("@merge-here")) {
       return;
   }

   const type = comment.substring("@merge-here".length).trim();
   const typeFile = path.join(typesPath, type + '.d.ts');

   if (!fs.existsSync(typeFile)) {
       console.error(`Could not find file ${typeFile}`);
       return;
   }

   const typeLines = fs.readFileSync(typeFile).toString().split('\n');
   typeLines.forEach(typeLine => {
      if (typeLine.startsWith("import")) {
          return;
      }

      let pushingLine = typeLine;
      if (pushingLine.startsWith("export ")) {
          pushingLine = pushingLine.substring("export ".length);
      }

      indexLines.push(pushingLine);
   });
});

const indexFile = path.join(__dirname, '..', 'index.d.ts');
fs.writeFileSync(indexFile, indexLines.join('\n'));
