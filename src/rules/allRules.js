import * as fs from 'fs';
import path from 'src/rules/path.json';

const jsonsInDir = fs.readdirSync('./src/rules').filter(file => path.extname(file) === '.json');
let allRules=[];
jsonsInDir.forEach(file => {
    const fileData = fs.readFileSync(path.join('./src/rules', file));
    const json = JSON.parse(fileData.toString());
    allRules.push(json);
});

export default allRules;
