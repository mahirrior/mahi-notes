/* Isolated presentation + supported OneCompiler embed. No commerce changes. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const motion = $('motionToggle');
  let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
  try { paused = paused || localStorage.getItem('mahirrior:motion') === 'paused'; } catch {}
  function syncMotion() {
    document.body.classList.toggle('motion-paused', paused);
    motion.setAttribute('aria-pressed', String(paused));
    motion.textContent = paused ? 'Resume motion ▷' : 'Pause motion Ⅱ';
  }
  motion.addEventListener('click', () => { paused = !paused; syncMotion(); try { localStorage.setItem('mahirrior:motion', paused ? 'paused' : 'active'); } catch {} });
  syncMotion();
  const languages = {python:['Python','main.py'],java:['Java','Main.java'],c:['C','main.c'],cpp:['C++','main.cpp'],javascript:['JavaScript','index.js'],typescript:['TypeScript','index.ts'],go:['Go','main.go'],rust:['Rust','main.rs']};
  const frames = new Map();
  let started = false;
  function selectLanguage() {
    const lang = $('compilerLanguage').value;
    if (!Object.hasOwn(languages, lang)) return;
    const [label, file] = languages[lang];
    $('compilerFile').textContent = file;
    $('loadCompiler').textContent = 'Launch ' + label + ' editor →';
    $('compilerExternal').href = 'https://onecompiler.com/' + lang;
    if (!started) return;
    $('compilerWelcome').hidden = true;
    for (const frame of frames.values()) frame.hidden = true;
    if (!frames.has(lang)) {
      const frame = document.createElement('iframe');
      frame.className = 'compiler-frame';
      frame.title = label + ' online code editor and output';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.src = 'https://onecompiler.com/embed/' + lang + '?hideLanguageSelection=true&hideNew=true&hideTitle=true';
      frame.addEventListener('load', () => {
        if ($('compilerLanguage').value === lang) $('compilerStatus').textContent = 'Use Run inside the editor. If it is blank, choose Open separately.';
      });
      frames.set(lang, frame);
      $('compilerFrames').append(frame);
      $('compilerStatus').textContent = 'Opening ' + label + ' editor… If it cannot load, use Open separately.';
    } else $('compilerStatus').textContent = label + ' editor selected. Use Run to execute your code.';
    frames.get(lang).hidden = false;
  }
  $('loadCompiler').addEventListener('click', () => { started = true; selectLanguage(); });
  $('compilerLanguage').addEventListener('change', selectLanguage);
  function expandEditor(expand) {
    $('compilerShell').classList.toggle('compiler-expanded', expand);
    $('compilerFocus').setAttribute('aria-pressed', String(expand));
    $('compilerFocus').textContent = expand ? 'Close expanded view ↙' : 'Expand editor ↗';
    document.body.style.overflow = expand ? 'hidden' : '';
  }
  $('compilerFocus').addEventListener('click', () => expandEditor(!$('compilerShell').classList.contains('compiler-expanded')));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && $('compilerShell').classList.contains('compiler-expanded')) { expandEditor(false); $('compilerFocus').focus(); } });
  selectLanguage();
})();
