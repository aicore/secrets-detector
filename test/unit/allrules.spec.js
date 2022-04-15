
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
let expect=chai.expect;
import {default as allRules} from '../../src/rules/allRules.js';

import 'mocha';

const subkeys=new Set();
for(var i in allRules){
    var key = i;
    var val = allRules[i];
    for(var j in val){
        var sub_key = j;
        var sub_val = val[j];
        subkeys.add(sub_key);
    }
}

describe('unit Test for rules', function (){
        it('total rules should be equal to 20 ', function () {
            expect(allRules.length).to.be.equal(20);
        });
    }
);

describe('check for each subkey',function(){
    it('check for apikey',function(){
        expect(subkeys.has('apikey')).to.be.equal(true);
    });
    it('check for aws-id',function(){
        expect(subkeys.has('aws-id')).to.be.equal(true);
    });
    it('check for aws-secret',function(){
        expect(subkeys.has('aws-secret')).to.be.equal(true);
    });
    it('check for aws-token',function(){
        expect(subkeys.has('aws-token')).to.be.equal(true);
    });
    it('check for base64',function(){
        expect(subkeys.has('base64')).to.be.equal(true);
    });
    it('check for comments',function(){
        expect(subkeys.has('comments')).to.be.equal(true);
    });
    it('check for cors',function(){
        expect(subkeys.has('cors')).to.be.equal(true);
    });
    it('check for creditcards',function(){
        expect(subkeys.has('creditcards')).to.be.equal(true);
    });
    it('check for dangerous-functions',function(){
        expect(subkeys.has('dangerous-functions')).to.be.equal(true);
    });
    it('check for dockercfg',function(){
        expect(subkeys.has('dockercfg')).to.be.equal(true);
    });
    it('check for github',function(){
        expect(subkeys.has('github')).to.be.equal(true);
    });
    it('check for htpasswd',function(){
        expect(subkeys.has('htpasswd')).to.be.equal(true);
    });
    it('check for npmrc',function(){
        expect(subkeys.has('npmrc')).to.be.equal(true);
    });
    it('check for password',function(){
        expect(subkeys.has('password')).to.be.equal(true);
    });
    it('check for path',function(){
        expect(subkeys.has('path')).to.be.equal(true);
    });
    it('check for pip',function(){
        expect(subkeys.has('pip')).to.be.equal(true);
    });
    it('check for privatekey',function(){
        expect(subkeys.has('privatekey')).to.be.equal(true);
    });
    it('check for pypirc',function(){
        expect(subkeys.has('pypirc')).to.be.equal(true);
    });
    it('check for secret',function(){
        expect(subkeys.has('secret')).to.be.equal(true);
    });
    it('check for sensitive-files',function(){
        expect(subkeys.has('sensitive-files')).to.be.equal(true);
    });
    it('check for uri',function(){
        expect(subkeys.has('uri')).to.be.equal(true);
    });
    it('check for slack-webhook',function(){
        expect(subkeys.has('slack-webhook')).to.be.equal(true);
    });
    it('check for hubspot-webhook',function(){
        expect(subkeys.has('hubspot-webhook')).to.be.equal(true);
    });
    it('check for twilio-webhook',function(){
        expect(subkeys.has('twilio-webhook')).to.be.equal(true);
    });
});
