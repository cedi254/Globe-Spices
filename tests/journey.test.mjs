import test from 'node:test';
import assert from 'node:assert/strict';
import { interpolateDestination, chapterState } from '../app/journey-math.mjs';
const stops=[[8.2,46.8],[78.9,22.6],[35.2,39],[12.6,42.5]];
test('direct jumps settle exactly on destination',()=>{stops.forEach((point,i)=>assert.deepEqual(interpolateDestination(stops,i),point));});
test('scrolling backward is deterministic and continuous',()=>{const forward=interpolateDestination(stops,.5);interpolateDestination(stops,2);assert.deepEqual(interpolateDestination(stops,.5),forward);assert.ok(forward[0]>8.2&&forward[0]<78.9);});
test('out of range scroll stays at endpoints',()=>{assert.deepEqual(interpolateDestination(stops,-1),stops[0]);assert.deepEqual(interpolateDestination(stops,5),stops[3]);});
test('direct country selection and backwards navigation select the right chapter',()=>{const tops=[1000,1800,2600,3400];for(const i of [0,3,1,2,0])assert.deepEqual(chapterState(tops,tops[i]+1),{index:i,progress:i});});
test('globe remains still while reading then transitions near the next chapter',()=>{const tops=[1000,1800,2600,3400];assert.equal(chapterState(tops,1400).progress,0);assert.ok(chapterState(tops,1700).progress>.6);assert.deepEqual(chapterState(tops,0),{index:0,progress:0});});
