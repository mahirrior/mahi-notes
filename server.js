const admin=require('firebase-admin');
const crypto=require('node:crypto');
const {products,quote}=require('./catalog');
function db(){if(!admin.apps.length)admin.initializeApp({credential:admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON))});return admin.firestore();}
async function identity(req){db();const token=(req.headers.authorization||'').replace(/^Bearer /,'');if(!token)throw Error('Please log in');return admin.auth().verifyIdToken(token,true);}
async function razor(path,body){const r=await fetch('https://api.razorpay.com/v1/'+path,{method:body?'POST':'GET',headers:{Authorization:'Basic '+Buffer.from(process.env.RAZORPAY_KEY_ID+':'+process.env.RAZORPAY_KEY_SECRET).toString('base64'),'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});if(!r.ok)throw Error('Payment provider unavailable');return r.json();}
function signature(data,sig,secret){if(typeof sig!=='string'||!/^[a-f0-9]{64}$/i.test(sig)||!secret)return false;return crypto.timingSafeEqual(Buffer.from(sig,'hex'),crypto.createHmac('sha256',secret).update(data).digest());}
async function settle(orderId,paymentId){
 if(!/^order_[a-zA-Z0-9]+$/.test(orderId)||!/^pay_[a-zA-Z0-9]+$/.test(paymentId))throw Error('Invalid payment');
 const ref=db().collection('storeOrders').doc(orderId),snap=await ref.get();if(!snap.exists)throw Error('Unknown order');const order=snap.data();
 const payment=await razor('payments/'+paymentId);
 if(payment.order_id!==orderId||payment.status!=='captured'||payment.currency!=='INR'||payment.amount!==order.amount)throw Error('Payment is not captured yet. Use Restore purchases shortly.');
 await db().runTransaction(async tx=>{const fresh=await tx.get(ref);if(fresh.data().paid)return;tx.set(db().collection('entitlements').doc(order.uid),{assets:admin.firestore.FieldValue.arrayUnion(...order.assets)},{merge:true});tx.update(ref,{paid:true,paymentId,paidAt:admin.firestore.FieldValue.serverTimestamp()});});
}
function handler(fn){return async(req,res)=>{res.setHeader('Cache-Control','no-store');try{await fn(req,res)}catch(e){res.status(400).json({error: e.message.startsWith('Payment')||['Please log in','Invalid cart','Not purchased'].includes(e.message)?e.message:'Request could not be completed. Check your login or contact support.'});}}}
module.exports={db,identity,razor,signature,settle,handler,products,quote};
