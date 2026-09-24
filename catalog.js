const products = {
 'python-part1':{title:'Python · Part 1',price:3000,assets:['python1']},
 'python-bundle':{title:'Python · Both parts',price:5900,assets:['python1','python2']},
 'numpy-part1':{title:'NumPy · Part 1',price:3900,assets:['numpy1']},
 'numpy-part2':{title:'NumPy · Part 2',price:3900,assets:['numpy2']},
 'numpy-bundle':{title:'NumPy · Both notes',price:5900,assets:['numpy1','numpy2']},
 'numpy-complete':{title:'NumPy · Complete package',price:9900,assets:['numpy1','numpy2','numpyzip']}
};
function quote(ids){
 if(!Array.isArray(ids)||!ids.length||ids.length>6||ids.some(id=>typeof id!=='string'||!Object.hasOwn(products,id))) throw Error('Invalid cart');
 let items=[...new Set(ids)];
 if(items.includes('numpy-complete')) items=items.filter(x=>!['numpy-part1','numpy-part2','numpy-bundle'].includes(x));
 else if(items.includes('numpy-bundle')||(items.includes('numpy-part1')&&items.includes('numpy-part2'))) items=[...items.filter(x=>!x.startsWith('numpy-')),'numpy-bundle'];
 if(items.includes('python-bundle')) items=items.filter(x=>x!=='python-part1');
 return {items,amount:items.reduce((n,id)=>n+products[id].price,0),assets:[...new Set(items.flatMap(id=>products[id].assets))]};
}
module.exports={products,quote};
