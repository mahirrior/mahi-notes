const {test}=require('node:test');const assert=require('node:assert/strict');const {quote}=require('../lib/catalog');
test('individual NumPy parts cost 39',()=>{assert.equal(quote(['numpy-part1']).amount,3900);assert.equal(quote(['numpy-part2']).amount,3900)});
test('both parts automatically cost 59',()=>assert.equal(quote(['numpy-part1','numpy-part2']).amount,5900));
test('complete package removes overlapping notes',()=>{const q=quote(['numpy-complete','numpy-bundle','numpy-part1']);assert.equal(q.amount,9900);assert.deepEqual(q.assets,['numpy1','numpy2','numpyzip'])});
test('duplicate and mixed items',()=>{assert.equal(quote(['numpy-part1','numpy-part1']).amount,3900);assert.equal(quote(['numpy-bundle','python-bundle']).amount,11800)});
test('rejects invalid carts and prototype keys',()=>{for(const ids of [[],['__proto__'],['constructor'],['fake'],null])assert.throws(()=>quote(ids))});
