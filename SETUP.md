# Mahi’s Notes — cart and verified payments

This is an update package for your existing Firebase + Vercel website. It has not been deployed. Keep a backup of your current repository before integrating it. Your uploaded index(1).html is the base; its theme, Firebase project, login and reader remain.

## Prices
- Python Part 1: ₹30; both Python parts: ₹59.
- NumPy Part 1: ₹39; Part 2: ₹39.
- Both NumPy notes: ₹59 (Save ₹19, about 24.36%). Exact 20% off ₹78 would be ₹62.40.
- NumPy complete ZIP with both notes, projects and practice: ₹99.
The first supplied Drive link is mapped to NumPy Part 1, the second to Part 2, and the third to the ZIP. Their contents and sharing permissions have not been verified.

## Deploy to your existing Vercel project
1. Copy public/, api/, lib/, package.json, vercel.json and .gitignore into your repository. This package serves public/index.html; do not only upload the HTML. If your repository already has a package.json, API handlers or Vercel configuration, merge these changes rather than overwriting unrelated settings.
2. In Firebase Console → Project settings → Service accounts → Generate new private key. In Vercel → Project → Settings → Environment Variables, add FIREBASE_SERVICE_ACCOUNT_JSON with the complete JSON. Never commit this JSON to GitHub or put it in public/.
3. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Vercel environment variables, starting with test keys. The example file contains placeholders only. Configure automatic payment capture in Razorpay. Redeploy after setting variables.
4. In Firebase Console → Firestore → Rules, merge and publish firestore.rules. These rules prohibit all browser writes to orders and purchase entitlements, and protect existing payment flags. They allow signed-in users to post reviews without claiming verified buyer status. Preserve any unrelated rules your backend needs. Merely uploading this file to GitHub does not activate the rules.
5. In Firebase Authentication, keep Email/Password and Google login enabled and add your Vercel/custom domain to Authorized domains.
6. In Vercel use the Other framework preset and public as the output directory. Install dependencies normally. Deploy to a preview first.
7. Test a new account: add both NumPy parts (₹59), cancel payment, complete a test payment, reopen the account in a different browser, restore purchases, open the purchased PDF and ZIP. Confirm another account cannot use /api/access for those assets. Test a wrong signature, price manipulation and an uncaptured payment against the deployed backend. Confirm reviews still save.
8. After preview checks pass, switch to live Razorpay keys and redeploy. Do not send secret keys in chat.

## Existing customers
The old page let the browser set users.hasPaid=true. The new API deliberately does not trust that flag. Before going live, verify historical payments in Razorpay and create an entitlements/{FIREBASE_UID} document through the Firebase Console for each verified buyer: assets = ["python1", "python2"] (or only "python1" for a Part 1 purchase). Do not bulk trust unverified historical flags. Existing login accounts are preserved.

## Security and file access
Firebase's web API key and Razorpay's checkout key ID are public identifiers and remain visible to the browser. Their visibility is normal. The Razorpay secret and Firebase service-account key are server-only Vercel environment variables. Rotate any actual secrets previously committed or exposed.

The browser no longer writes purchase access. The server verifies Firebase identity, calculates prices, creates an order, verifies the Razorpay HMAC signature, fetches captured payment status and checks the amount, currency and order before granting access. Repeated verification is idempotent. Restore purchases checks the five newest pending orders, allowing recovery if the checkout page closes before verification; there is no background webhook in this package.

Drive links are absent from the public HTML and requested only after the API checks purchased access. HOWEVER, an authorized reader can copy a returned public Drive link, and anyone who already has it can bypass the storefront. This is gated link delivery, not private document hosting. For stronger protection, move the documents to private Cloud Storage and change /api/access to issue short-lived signed URLs after the same entitlement check. Keep the source Drive files restricted once private delivery works. A static HTML file cannot make a public Drive file private. No PDF system can prevent screenshots by an authorized reader.

The cart saves on the current browser; purchases save to the Firebase account. Bundles remove overlapping cart products. Previously owned components are not prorated; buying a larger bundle later charges its displayed full price.

## Validation performed
Five automated pricing/cart tests passed. JavaScript syntax checked. No live Firebase, Razorpay payment, Drive-content, deployment or browser integration tests were performed. Configuration and preview verification above are still required.

Official references:
- https://firebase.google.com/docs/projects/api-keys
- https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/
