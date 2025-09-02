const fs = require('fs');
const path = require('path');

// Root folder of your project
const rootFolder = './src/pages'; // change to project root if needed

// Convert TitleCase / PascalCase to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

// Store renamed folders
const renamedFolders = [];

// Recursive function (bottom-up) to rename folders
function renameFolders(folder) {
  const items = fs.readdirSync(folder);

  // First, process subfolders
  items.forEach(item => {
    const fullPath = path.join(folder, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory() && item !== 'node_modules') {
      renameFolders(fullPath);
    }
  });

  // Then rename current folder if needed (except root)
  const parent = path.dirname(folder);
  const folderName = path.basename(folder);

  if (folderName !== toKebabCase(folderName) && folder !== rootFolder) {
    const newFolderName = toKebabCase(folderName);
    const newFullPath = path.join(parent, newFolderName);

    // Rename folder
    fs.renameSync(folder, newFullPath);
    renamedFolders.push({ old: folder, new: newFullPath });
    console.log(`Renamed: ${folder} -> ${newFullPath}`);
  }
}

// Start from root folder
renameFolders(rootFolder);

// Log all renamed folders
console.log('\nAll renamed folders:');
renamedFolders.forEach(f => console.log(`${f.old} -> ${f.new}`));
