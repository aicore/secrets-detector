import allRules from "./rules/allRules.js";
import * as parser from 'gitignore-parser';
import * as fs from 'fs';
import * as lineReader from 'line-reader';

const path = process.cwd()+"/.gitignore";
console.log("cwd ", path);


function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

let newfiles=getFiles('.');
function strip(string) {
    return string.replace(/^\s+|\s+$/g, '');
}
function rule(key,value){

}

try {
    if (fs.existsSync(path)) {
        console.log("Scanning on files other then gitignore...");
        var gitignore = parser.compile(fs.readFileSync('.gitignore', 'utf8'));
        //console.log(gitignore);
        for(let i=0;i<newfiles.length;i++){
            newfiles[i]=newfiles[i].replace("./","");
        }
        let obj=newfiles.filter(gitignore.accepts);
        obj=Object.values(obj);
        newfiles=obj;
    } else {
        console.log("gitignore does not exist, scanning on all the files...");

    }
} catch(err) {
    console.error(err);
}
try {
    let flag=false;
    for(let i=0;i<newfiles.length;i++){
        let ext=newfiles[i].split(".")[1];
        lineReader.eachLine(newfiles[i],function (line,last){
            //console.log(line);
            if(ext==='js'){
                if(line.match(/=/g)===1){
                    let key,value=line.split("=");
                    key=strip(key);
                    value=value.replace(";", "");
                    value=strip(value);
                    let result=rule(key,value);
                    //here commits should fail
                    if(result===false){
                        flag=true;
                        console.log("secret-key found");
                    }
                }
            }
            if(ext==='yml'){

            }
            if(ext==='xml'){

            }
            if(ext==='shell'){

            }
            if(ext==='json'){

            }
            if(ext==='html'){

            }
            if(last){

            }
        });
    }
    if(flag===false){
        console.log("No secrets found");
    }
} catch (err) {
    console.error(err);
}

export default allRules;
