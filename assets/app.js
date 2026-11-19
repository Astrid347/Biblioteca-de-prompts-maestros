'use strict';
(() => {
  const catalog = window.PROMPT_CATALOG;
  const get = id => document.getElementById(id);
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let resourceType = '';
  let activeResource = null;
  let returnFocus = null;
  let copyReset;
  const dialog = get('resourceDialog');
  const categories = [...new Set(catalog.map(item => item.category))];
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    get('category').append(option);
  });
  function renderCatalog() {
    const query = normalize(get('search').value.trim());
    const category = get('category').value;
    const results = catalog.filter(item =>
      (!resourceType || item.type === resourceType) &&
      (!category || item.category === category) &&
      normalize(item.title + ' ' + item.purpose + ' ' + item.category).includes(query)
    );
    const fragment = document.createDocumentFragment();
    results.forEach(item => {
      const article = document.createElement('article');
      article.className = 'resource-card';
      const top = document.createElement('div');
      top.className = 'card-top';
      const categoryLabel = document.createElement('span');
      categoryLabel.textContent = item.category;
      const typeLabel = document.createElement('span');
      typeLabel.textContent = item.type;
      top.append(categoryLabel, typeLabel);
      const title = document.createElement('h3');
      title.textContent = String(item.id).padStart(2, '0') + ' · ' + item.title;
      const description = document.createElement('p');
      description.textContent = item.purpose;
      const button = document.createElement('button');
      button.className = 'open-resource';
      button.type = 'button';
      button.textContent = item.type === 'Guía' ? 'Consultar guía y aplicar' : 'Abrir y personalizar';
      button.setAttribute('aria-label', button.textContent + ' · ' + item.title);
      const arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';
      button.append(arrow);
      button.addEventListener('click', () => { location.hash = 'recurso-' + String(item.id).padStart(2, '0'); });
      article.append(top, title, description, button);
      fragment.append(article);
    });
    get('grid').replaceChildren(fragment);
    get('resultCount').textContent = results.length + (results.length === 1 ? ' recurso disponible' : ' recursos disponibles');
    get('empty').hidden = results.length > 0;
  }
  get('search').addEventListener('input', renderCatalog);
  get('category').addEventListener('change', renderCatalog);
  document.querySelectorAll('[data-type]').forEach(button => {
    button.addEventListener('click', () => {
      resourceType = button.dataset.type;
      document.querySelectorAll('[data-type]').forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
      renderCatalog();
    });
  });
  get('clearFilters').addEventListener('click', () => {
    get('search').value = '';
    get('category').value = '';
    resourceType = '';
    document.querySelectorAll('[data-type]').forEach(choice => choice.setAttribute('aria-pressed', String(choice.dataset.type === '')));
    renderCatalog();
    get('search').focus();
  });
  function renderGuide(text) {
    const fragment = document.createDocumentFragment();
    text.split('\n\n').forEach(block => {
      const element = document.createElement(block.startsWith('### ') ? 'h4' : 'p');
      element.textContent = block.replace(/^### /, '');
      element.style.whiteSpace = 'pre-line';
      fragment.append(element);
    });
    get('guideContent').replaceChildren(fragment);
  }
  function updatePrompt() {
    if (!activeResource) return;
    const values = {};
    get('fieldsForm').querySelectorAll('textarea').forEach(input => { values[input.dataset.key] = input.value.trim(); });
    // A single pass preserves brackets in a user's input without treating them as further substitutions.
    get('promptText').value = activeResource.prompt.replace(/\[([^\]\n]+)\]/g, (token, key) => values[key] || token);
    const pending = activeResource.fields.filter(field => !values[field.key]).length;
    get('pendingFields').textContent = pending ? pending + ' campos por completar' : 'Contexto completado';
    clearTimeout(copyReset);
    get('copyStatus').textContent = '';
  }
  function openResource(item) {
    if (activeResource?.id === item.id && dialog.open) return;
    returnFocus = document.activeElement;
    activeResource = item;
    get('resourceCategory').textContent = item.category;
    get('resourceKind').textContent = item.type + ' ' + String(item.id).padStart(2, '0') + ' · Versión ' + item.version;
    get('resourceTitle').textContent = item.title;
    get('resourcePurpose').textContent = item.purpose;
    get('resourceExample').textContent = item.example;
    get('guidePanel').hidden = !item.guide;
    renderGuide(item.guide);
    const fragment = document.createDocumentFragment();
    item.fields.forEach((field, index) => {
      const label = document.createElement('label');
      const id = 'context-field-' + index;
      label.htmlFor = id;
      label.textContent = field.label;
      const input = document.createElement('textarea');
      input.id = id;
      input.dataset.key = field.key;
      input.placeholder = '[' + field.key + ']';
      input.rows = 2;
      input.addEventListener('input', updatePrompt);
      fragment.append(label, input);
    });
    get('fieldsForm').replaceChildren(fragment);
    updatePrompt();
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
    dialog.scrollTop = 0;
    get('closeDialog').focus();
  }
  function syncHash() {
    const match = location.hash.match(/^#recurso-(\d+)$/);
    const item = match && catalog.find(entry => entry.id === Number(match[1]));
    if (item) openResource(item);
    else if (dialog.open) dialog.close();
  }
  get('closeDialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    clearTimeout(copyReset);
    activeResource = null;
    get('fieldsForm').replaceChildren();
    get('promptText').value = '';
    if (/^#recurso-/.test(location.hash)) history.replaceState(null, '', location.pathname + location.search + '#catalogo');
    if (returnFocus?.isConnected) returnFocus.focus();
  });
  get('fieldsForm').addEventListener('submit', event => event.preventDefault());
  get('resetFields').addEventListener('click', () => { get('fieldsForm').reset(); updatePrompt(); });
  get('copyPrompt').addEventListener('click', async () => {
    const text = get('promptText').value;
    try {
      await navigator.clipboard.writeText(text);
      get('copyStatus').textContent = 'Prompt copiado. Péguelo en su herramienta de IA.';
    } catch {
      get('promptText').focus();
      get('promptText').select();
      const copied = document.execCommand('copy');
      get('copyStatus').textContent = copied ? 'Prompt copiado.' : 'Texto seleccionado. Use Ctrl+C o la opción Copiar de su dispositivo.';
    }
    copyReset = setTimeout(() => { get('copyStatus').textContent = ''; }, 5000);
  });
  get('downloadTxt').addEventListener('click', () => {
    if (!activeResource) return;
    const blob = new Blob([get('promptText').value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeResource.path.split('/').pop().replace(/\.md$/, '.txt');
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  get('downloadMd').addEventListener('click', () => {
    if (activeResource) window.open('https://github.com/Astrid347/Biblioteca-de-prompts-maestros/blob/main/' + activeResource.path, '_blank', 'noopener');
  });
  window.addEventListener('hashchange', syncHash);
  renderCatalog();
  syncHash();
})();
