function helpFn(){
    console.log(`
    List of all the command this program can run:
                   node main.js tree "directorypath"
                   node main.js organize "directorypath"
                   node main.js help 
    `);
}

module.exports={
    helpKey:helpFn
}