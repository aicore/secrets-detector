
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
import {allRules} from "../../src/index.js";
import {flag} from "../../src/index.js";
describe('check wether index js works fine or not',function (){
    it('should be equal to 20', function () {
        expect(allRules.length).to.be.equal(20);
    });
    it('flag should be true',function(){
        expect(flag).to.be.equal(true);
    });
});
