


function organizeFn(dirPath){
    console.log("Organize command implemented for ",dirPath);
// Pseudo code[what to do]
   let destPath;
    if(dirPath==undefined){
        destPath=process.cwd();
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
            let category = getCategory(childnames[i]);
            //console.log(category);
            sendFiles(childAddress,dest,category);
        }
    }
}

function sendFiles(srcFilePath, dest, category){
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName= path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    //console.log(fileName," copied to ", category); Just to check everyting working fine or not.
    //below line to perform cut operation
    fs.unlinkSync(srcFilePath);
}

function getCategory(name){
    let ext = path.extname(name);
    ext=ext.slice(1);
    for(let type in types){
        let cTypeArray= types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext==cTypeArray[i]){
                return type;
            }
        }
    }
    return "others";
}

module.exports={
    organizeKey:organizeFn
}