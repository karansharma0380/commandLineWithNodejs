let path = require("path");
let fs = require("fs");


function treeFn(dirPath){
    console.log("Tree command implemented for ",dirPath);
    if(dirPath==undefined){
        treeHelper(process.cwd(),"");
        return;
    }
    else{
        let doespath = fs.existsSync(dirPath);
        if(doespath){
            treeHelper(dirPath,"");
        }
        else{
            console.log("Please enter the valid path");
            return;
        }
    }
}

function treeHelper(dirPath, indent){
    // is  a file or folder 
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile){
        let fileName=path.basename(dirPath);
        console.log(indent+"├──"+fileName);
    }
    else{
        let dirName = path.basename(dirPath)
        console.log(indent + "└──" + dirName);
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports={
    treeKey:treeFn
}