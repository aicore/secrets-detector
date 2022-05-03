import allRules from "./rules/allRules.js";
import * as parser from 'gitignore-parser';
import * as fs from 'fs';
import * as lineReader from 'line-reader';
import {json} from "mocha/lib/reporters/index.js";

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
    for(var i in allRules){
        var key = i;
        var val = allRules[i];
        for(var j in val){
            //var sub_key = j;
            var sub_val = val[j];
            for(var k in sub_val){
                console.log("k is ",k);
                var key_regex_str=null;
                var val_regex_str=null;
                if(k==='key'){
                    key_regex_str=sub_val.key.regex;
                }
                if(k==='value'){
                    val_regex_str=sub_val.value.regex;
                }
                var key_regex_obj=null;
                var val_regex_obj=null;
                if(key_regex_str!=null){
                    key_regex_obj=new RegExp(key_regex_str);
                }
                if(val_regex_str!=null){
                    val_regex_obj=new RegExp(val_regex_str);
                }
                if(key_regex_obj!=null && key_regex_obj.test(key)){
                    console.log("secret key found");
                    return false;
                }
                if(val_regex_obj!=null && val_regex_obj.test(key)){
                    console.log("secret value found");
                    return false;
                }
            }
        }
    }
    return true;
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
    var flag=true;
    var document="";
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
                        flag=false;
                        process.exit(1);
                    }
                }
            }
            if(ext==='config'){
                if(line.match(/=/g)===1){
                    let key,value=line.split("=");
                    key=strip(key);
                    value=value.replace(";", "");
                    value=strip(value);
                    let result=rule(key,value);
                    //here commits should fail
                    if(result===false){
                        flag=false;
                        process.exit(1);
                    }
                }
            }
            if(ext==='npmrc'){
                if(line.match(/:_authtoken/g)===1){
                    let key,value=line.split(":_authtoken=");
                    key=strip(key);
                    value=value.replace(";", "");
                    value=strip(value);
                    //here commit should fail
                    if(value){
                        console.log("npm auth token ",value);
                        flag=false;
                        process.exit(1);
                    }
                }
            }
            if(ext==='json'){
                if(line.startsWith("//")==true){
                }
                else{
                    String.prototype.replace(" // ?.*$","",line);
                    document+=line;
                }
            }
        });
    }
    if(document.length>0){
        try{
            document=json.load(document);
        }
        catch (e){
            console.log(e);
        }
    }
    if(flag===true){
        console.log("No secrets found");
    }
} catch (err) {
    console.error(err);
}

export {allRules,flag};
