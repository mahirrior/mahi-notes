# Mahirrior design update

The site now uses Mahirrior as its brand and Mahi Sharma as its creator name.

## What changed

- Cream, forest and terracotta palette, clearer headings, practical product cards and a consistent section layout. The existing dark/light switch remains.
- An original lightweight SVG floating-car scene with CSS animation. No video, graphics framework or paid asset is required. Pause/resume motion and system reduced-motion preferences are supported.
- An in-page OneCompiler editor for Python, Java, C, C++, JavaScript, TypeScript, Go and Rust, with language selection, expanded view and a separate-window fallback.
- Existing guided Python examples remain available below the compiler.
- Mobile styles at 680 px, tablet styles at 900 px and compact desktop styles at 1150 px.

## Preserved

The Firebase project, login, Google sign-in, account-linked purchases, Razorpay order/verification code, prices, bundle normalization, restore purchases, PDF access, reviews, contact form, note search/filter/sort, bookmarks, learning progress, legal pages and deployment configuration remain in place. The entire `api/` and `lib/` directories, Firestore rules, package configuration and Vercel configuration are unchanged.

## Deploy

1. Extract this ZIP.
2. Update your existing repository with the full project contents, keeping `public/`, `api/` and `lib/` at the repository root. Do not upload only index.html.
3. Keep your existing Vercel environment variables and Firebase setup. See `SETUP.md` for the original configuration.
4. Push to the connected Git repository and let Vercel redeploy.
5. On the deployed site, check desktop and phone layouts, sign-in, cart, a test-mode payment, purchase restoration and the PDF reader.
6. Open **Code lab**, choose a language and click **Launch editor**, then use **Run** inside the editor. Use **I/O** to enter standard input when needed.

## Compiler behavior

The editor uses OneCompiler's officially supported iframe integration:
https://onecompiler.com/apis/embed-editor

No new server secret, compiler API key or backend installation is needed for this embed. It requires internet access and depends on OneCompiler availability, policies and browser permissions. Running code sends it to OneCompiler; do not paste credentials into the editor. Some browser privacy settings may block embedding; the separate-window link remains available.

Each selected language is mounted once and retained while you stay on this page, preserving its live editor session when switching languages. Refreshing or leaving the page is not a guaranteed draft save: copy or download important code using the editor before leaving. The surrounding website theme does not reload an editor and erase work; the embedded editor has its own theme control.

## Validation

- Existing cart suite: 5/5 tests passed.
- Inline and external JavaScript syntax checks passed.
- CSS delimiter check passed.
- All original HTML IDs retained; no duplicate IDs or broken section anchors.
- Backend, catalog pricing, deployment configuration and security rules checked byte-for-byte against the uploaded ZIP.
- The Python embed executed its starter program in a browser and returned Hello, World! successfully. Other language runtimes have not been individually executed.
- The local preview could not be opened in the available cloud browser. Rendered desktop/mobile layouts and live Firebase/Razorpay flows have not been verified in this environment. No real payment was made.

## Files

Modified: `public/index.html`, `public/store.js` (branding, display text and checkout accent only).
Added: `public/mahirrior.css`, `public/mahirrior.js`, `public/assets/hover-car.svg`, this guide.
