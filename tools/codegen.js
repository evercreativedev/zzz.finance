const fs = require("fs");
const { createTemplates } = require("./templates");

const args = process.argv.slice(2);
const command = args.splice(0, 1)[0];

let folder = `${process.cwd()}/src/components/`;

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}

function createFile(target, content) {
  if (!fileExists(target)) {
    console.log("Creating file: ", target);
    fs.writeFileSync(target, content, "utf8");
  } else {
    console.log("File exists: ", target);
  }
}

if (command === "component") {
  const type = "tsx";
  // eslint-disable-next-line prefer-const
  let [component] = args;
  if (component.indexOf("/") > -1) {
    const path = component.split("/");
    component = path[path.length - 1];
    component = component.charAt(0).toUpperCase() + component.slice(1);
    path.pop();
    folder = folder.concat(`${path.join("/")}/`);
  } else {
    component = component.charAt(0).toUpperCase() + component.slice(1);
  }
  console.log(`Creating component ${component}.${type}`);
  const dir = `${folder}${component}/`;
  fs.mkdirSync(dir, { recursive: true });
  const { componentscript, componentscss, packagejson } = createTemplates(
    component
  );
  createFile(`${dir + component}.${type}`, componentscript);
  createFile(`${dir + `${component}.styles`}.tsx`, componentscss);
  createFile(`${dir}package.json`, packagejson);
}
