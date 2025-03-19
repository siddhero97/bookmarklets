# Bookmarklet for Claude

This bookmarklet allows you to export the content from [Claude](https://claude.ai/) to a PDF with a single click. The
PDF can be searchable or not, depending on your choice. It's completely secure with no installations, data sharing to
third parties, or extensions needed. Everything runs entirely in your browser.

## How to use

1. Add a new bookmark to your browser with any name (e.g. "Export to PDF") and the following code as URL:

   ```javascript
   javascript:(function () { /* v. 0.5, github.com/give-me/claude */ let elements = [ (document.querySelector('div[data-test-render-count]').parentElement), document.querySelector('div.fixed div.relative.w-full[class*="overflow-"]') ]; console.debug(`Found elements at ${location.hostname}:`, elements); elements = elements.filter(n => n); if (confirm('Confirm if a PDF should be searchable')) { let temp = document.createElement('div'); temp.id = 'id-' + Math.random().toString(36).slice(2, 9); elements.forEach(el => el && temp.appendChild(el.cloneNode(true))); let style = document.createElement('style'); style.textContent = `@media print{body>*{display:none!important}#${temp.id}{display:flex!important;flex-direction:column}}`; document.head.appendChild(style); document.body.appendChild(temp); print(); setTimeout(() => { document.head.removeChild(style); document.body.removeChild(temp); }, 1000); } else { let script = document.createElement('script'); script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.3/html2pdf.bundle.min.js'; script.onload = function () { let ts = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14); let pdf = html2pdf().set({ margin: 5, filename: `${ts}.pdf`, html2canvas: {scale: 2, logging: false} }).from(elements.shift()); elements.forEach(el => pdf = pdf.toPdf().get('pdf').then(pdfObj => pdfObj.addPage()).from(el).toContainer().toCanvas().toPdf()); pdf.save(); }; document.body.appendChild(script); } })();
   ```

2. Open any dialog in [Claude](https://claude.ai/) and click on the bookmark.
3. Confirm if the PDF should be searchable and wait for the PDF.

## Under the hood

If you choose that the PDF should be searchable, this bookmarklet will create a temporary print-specific stylesheet and
a temporary container, clone the content of the dialog and related data into this container. When printing, only this
container will be displayed while all other page elements will be hidden. The native browser print function is used,
allowing to print directly or save as PDF. After printing, the temporary stylesheet and container will be automatically
removed.

If you choose that the PDF shouldn't be searchable, this bookmarklet will load
the [html2pdf](https://github.com/eKoopmans/html2pdf.js) library from the Cloudflare CDN to work locally in order to
avoid sending any data to any server. The library will be used to convert the content of the dialog and related data to
a PDF file (A4 format, portrait orientation, 5mm margins, and 2x scale). The filename will be generated based on the
current date and time.

## About

Source code is available [here](https://github.com/give-me/claude/blob/main/bookmarklets/pdf.js). When the user
interface of the chatbot changes, this tool may need to be updated because the content of dialogs and related data are
found using CSS selectors.