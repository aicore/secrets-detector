# Secrets-scanner
Secrets detector is a tool that finds secrets like AWS keys, API secrets, and tokens. It does so by looking at all the files in the current folder and attempting to match them against a list of secret signatures.

Secrets scanner is a stand-alone package written purely in node-js and does not have any dependency on python or other secret scanner utilities.

## How to install
To install the secrets scanner globally, run the following command in the terminal.

```shell
npm install -g secrets-scanner
```
If you have to install it as a development time utility.
```shell
npm install --save-dev secrets-scanner
```

# How to execute
To execute the secrets scanning tool on a specific folder, run the following command in the terminal:
```shell
secrets-scanner
```
* The scanner will check for secrets in all files in the current folder recursively.

* The scanner will honor and ignore all files specified in .gitignore file.
  On completion, the command will succeed if it did not find any secrets.

If any secrets are detected, the command will exit with -1 and the offending secrets will be displayed:
```shell
secrets-scanner
Error! Secrets Detected in the following files:
src/a.json, line 32, col 21: password: pass
test/a.html, line 2, col 1: awsaccesskey: 23
```

# Ignoring false positives
Sometimes, the secret scanner may flag a line as offending, but it might be an essential component of code. In such cases, we can selectively specify secret scanner to ignore a specific line by placing a comment secrets-ignore above the offending line.

For eg. In a file below test.js , password=”pass” can be ignored by adding a line comment above the code as follows:
```shell
...
function test(){
  //secrets-ignore
  let password = "pass";
  ...
}
...
```
## Other Languages
```shell
For python, bash:

#secrets-ignore
password="pass"

HTML:
<!-- secrets-ignore -->
password="pass"

CSS:
/* secrets-ignore */

JSON:
use additional configuration file below to exclude json keys from secret scanner.

```

## Additional configuration
Create a file secrets-scanner.json to specify additional configuration options.  The configuration options are listed below:
```shell
{
 "version": 1,
 "gitIgnore": [true|false], // weather to honor git-ignore or not.
 "jsonIgnore": {
   // https://stackoverflow.com/questions/8481380/is-there-a-json-equivalent-of-xquery-xpath
   "<file path1>": ["<jsonpath of key 1>", "jsonpath of key 2"...]
 }
}
```

## jsonIgnore
Since JSON does not support inline comments to ignore false positives, the configuration file can be used to ignore specific json keys. For example, consider the following json files:
```shell
// a.json
{"login":{
   "pass": "pass"
}}
// src/b.json
{"login":{
   "user":{"pass": "pass"}
}}
```
The secrets can be whitelisted using the following  secrets-scanner.json configuration file:
```shell
{
 "version": 1,
 "gitIgnore": [true|false], // weather to honor git-ignore or not.
 "jsonIgnore": {
   "a.json": ["login.pass"],
   "src/b.json": ["login.user.pass"]
 }
}
```

## Supported languages
The following language files will be scanned for secrets:
```shell
1.HTML
2.JS
```
## Development notes
This section is relevant only if you are developing or making changes to the secrets-scanner itself.

## Testing
To run all tests:
```shell
> npm run test
  Hello world Tests
    ✔ should return Hello World
    #indexOf()
      ✔ should return -1 when the value is not present
```
Additionally, to run unit/integration tests only, use the commands:
```shell
> npm run test:unit
> npm run test:integ
```
## Coverage Reports
To run all tests with coverage:

```shell
> npm run cover
  Hello world Tests
    ✔ should return Hello World
    #indexOf()
      ✔ should return -1 when the value is not present


  2 passing (6ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |                   
 backup.js |     100 |      100 |     100 |     100 |                   
----------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 100% ( 5/5 )
Branches     : 100% ( 2/2 )
Functions    : 100% ( 1/1 )
Lines        : 100% ( 5/5 )
================================================================================
Detailed unit test coverage report: file:///template-nodejs/coverage-unit/index.html
Detailed integration test coverage report: file:///template-nodejs/coverage-integration/index.html
```
After running coverage, detailed reports can be found in the coverage folder listed in the output of coverage command.
Open the file in browser to view detailed reports.

To run unit/integration tests only with coverage
```shell
> npm run cover:unit
> npm run cover:integ
```

Sample coverage report:
![image](https://user-images.githubusercontent.com/5336369/148687351-6d6c12a2-a232-433d-ab62-2cf5d39c96bd.png)

### Unit and Integration coverage configs
Unit and integration test coverage settings can be updated by configs `.nycrc.unit.json` and `.nycrc.integration.json`.

See https://github.com/istanbuljs/nyc for config options.
