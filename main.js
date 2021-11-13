let path = require("path");
let fs = require("fs");

let inputArr = process.argv.slice(2);
console.log(inputArr);

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

// node main.js tree "directorypath"
// node main.js organize "directorypath"
// node main.js help 

let command= inputArr[0];

switch(command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Please input right command");
        break;
}

function treeFn(dirPath){
    console.log("Tree command implemented for ",dirPath);
}

function organizeFn(dirPath){
    console.log("Organize command implemented for ",dirPath);
// Pseudo code[what to do]
   let destPath;
    if(dirPath==undefined){
        console.log("Please enter the valid path for command");
        return;
    }
    else{
        let doespath = fs.existsSync(dirPath);
        if(doespath){
            destPath = path.join(dirPath,"organized_files");
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath);
            }
        }
        else{
            console.log("Please enter the valid path");
            return;
        }
    }
    organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest){
// 3. Identify the type of file in the input directory
    let childnames = fs.readdirSync(src);
    // console.log("ChildNames: ",childnames);
    for(let i=0;i<childnames.length;i++){
        let childAddress = path.join(src,childnames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            // console.log(childnames[i]);
            // 4. cut/copy files to that organized directory inside of any category folder

        }
    }
}



function helpFn(){
    console.log(`
    List of all the command this program can run:
                   node main.js tree "directorypath"
                   node main.js organize "directorypath"
                   node main.js help 
    `);
}



