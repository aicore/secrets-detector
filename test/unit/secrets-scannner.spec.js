
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */

// jshint ignore: start
/*global describe, it*/

import * as chai from 'chai';
import * as parser from 'gitignore-parser';
import * as fs from 'fs';
import * as lineReader from 'line-reader';


var gitignore = parser.compile(fs.readFileSync('.gitignore', 'utf8'));

let expect = chai.expect;

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

for(let i=0;i<newfiles.length;i++){
    let ret=newfiles[i].replace('./','');
    newfiles[i]=ret;
}
//console.log("accepts");
//console.log(newfiles.filter(gitignore.accepts));
function strip(string) {
    return string.replace(/^\s+|\s+$/g, '');
}
function rule(key,value){
    var key_regex1 = new RegExp("^(?!.*name)");
    var val_regex1=new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9\\+\\/]{40}$");
    var key_regex2=new RegExp(".*[A-Za-z0-9\\-\\_]+(key|token)$");
    var val_regex2=new RegExp("^(?!.*[ ])");
    var key_regex3=new RegExp("^function$");
    var val_regex3=new RegExp("^(aiohttp_cors.)?ResourceOptions.*(allow_credentials|expose_headers|allow_headers)=(True|'?\"?\\*'?\"?)");
    var key_regex4=new RegExp("^function$");
    var val_regex4=new RegExp("^(eval|exec|(os.)?system|popen|call|subprocess\\.(check_output|call))\\(");
    var key_regex5=new RegExp("^\\S*(passwords?|passwd|pass|pwd)_?(hash)?[0-9]*$");
    var key_regex6=new RegExp(".*(secrets?)_?(hash)?$");
    var key_regex7=new RegExp("^file$");
    var val_regex7=new RegExp("'.*(\n" +
        "        rsa|dsa|ed25519|ecdsa|pem|crt|cer|ca-bundle|p7b|p7c|p7s|(private-)?key|keystore|jks|pkcs12|pfx|p12|asc\n" +
        "        |dockercfg|npmrc|pypirc|pip.conf|terraform.tfvars|env|cfg|conf|config|ini|s3cfg\n" +
        "        |\\.aws/credentials|htpasswd|(\\.|-)?netrc|git-credentials|gitconfig|gitrobrc\n" +
        "        |(password|credential|secret)(\\.[A-Za-z0-9]+)?\n" +
        "        |servlist-?\\.conf|irssi/config|keys\\.db\n" +
        "        |settings\\.py|database\\.yml\n" +
        "        |(config(\\.inc)?|LocalSettings)\\.php\n" +
        "        |(secret-token|omniauth|carrierwave|schema|knife)\\.rb\n" +
        "        |(accounts|dbeaver-data-sources|BapSshPublisherPlugin|credentials|filezilla|recentservers)\\.xml\n" +
        "        |(ba|z|da)?sh-history|(bash|zsh)rc|(bash-|zsh-)?(profile|aliases)\n" +
        "        |kdbx?|(agile)?keychain|key(store|ring)\n" +
        "        |mysql-history|psql-history|pgpass|irb-history\n" +
        "        |log|pcap|sql(dump)?|gnucash|dump\n" +
        "        |backup|back|bck|~1\n" +
        "        |kwallet|tblk|pubxml(\\.user)?\n" +
        "        |Favorites\\.plist|configuration\\.user\\.xpl\n" +
        "        |proftpdpasswd|robomongo\\.json\n" +
        "        |ventrilo-srv.ini|muttrc|trc|ovpn|dayone|tugboat\n" +
        "      )$'");
    var val_regex8=new RegExp("(http|ftp|smtp|scp|ssh|jdbc[:\\w\\d]*|s3)s?://?.+");
    var val_regex9=new RegExp("^(gh[pous]_[a-zA-Z0-9]{36}|ghr_[a-zA-Z0-9]{76})$");
    var key_regex10=new RegExp("^htpasswd Hash$");
    var key_regex11=new RegExp("^htpasswd Hash$");
    var val_regex12=new RegExp("^((([A-Z]|file|root):)?(\\.+)?[/\\\\]+).*$");
    var val_regex13=new RegExp(".*[\\-]{3,}BEGIN (RSA|DSA|EC|OPENSSH|PRIVATE)? ?(PRIVATE)? KEY[\\-]{3,}.*");

    if (key_regex1.test(key) && val_regex1.test(value)) {
        console.log("Secret key-value pair found");
        return true;
    }
    if(key_regex2.test(key) && val_regex2.test(value)){
        console.log("Secret key-value pair found");
        return true;
    }
    if(key_regex3.test(key) && val_regex3.test(value)){
        console.log("Secret key-value pairfound");
        return true;
    }
    if(key_regex4.test(key) && val_regex4.test(value)){
        console.log("Secret key-value pair found");
        return  true;
    }
    if(key_regex7.test(key) && val_regex7.test(value)){
        console.log("Secret key-value pair found");
        return  true;
    }
    if(key_regex5.test(key) || key_regex6.test(key) || key_regex10.test(key) || key_regex11.test(key)){
        console.log("Secret key found");
        return true;
    }
    if(val_regex8.test(value) || val_regex9.test(value) || val_regex12.test(value) || val_regex13.test(value)){
        console.log("Secret value found");
        return true;
    }
    return false;
}
try {
    describe('unit Test for secret key', function (){
        for(let i=0;i<newfiles.length;i++){
            //const data=fs.readFileSync(newfiles[i], 'utf8');
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
                        it('check for secret key ', function () {
                            expect(result).to.be.equal(false);
                        });
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
    });

} catch (err) {
    console.error(err);
}

//discord_client_secret :="^(?!.*name)"

