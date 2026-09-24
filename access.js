const {handler,identity,db}=require('../lib/server');
const legacy=require('../lib/legacy-links.json');
const links={python1:legacy[0],python2:legacy[1],numpy1:'https://drive.google.com/file/d/1X9e778Ad7HdkPqON9-1kEM19UUTJZrG2/preview',numpy2:'https://drive.google.com/file/d/1OACdMv9ABwF-zSVI3adqAtYLHDksv97h/preview',numpyzip:'https://drive.google.com/file/d/1CLJgoot-u0729905eRG6PJilOiIcEvmg/view'};
module.exports=handler(async(req,res)=>{if(req.method!=='GET')return res.status(405).end();const user=await identity(req);const assets=(await db().collection('entitlements').doc(user.uid).get()).data()?.assets||[];const asset=req.query.asset;if(typeof asset!=='string'||!Object.hasOwn(links,asset)||!assets.includes(asset))throw Error('Not purchased');res.json({url:links[asset]});});
