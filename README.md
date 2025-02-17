# Claude.ai Bookmarklets

These bookmarklets allow you to process the content on [Claude.ai](https://claude.ai/) with a single click:

| Bookmarklet                                                                                | Under the hood                                                                                                                                                                                                                                                                                                                                                                                                                  |
|--------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Export the content to PDF](#bookmarklet-to-export-the-content-to-pdf)                     | This bookmarklet loads the [html2pdf](https://github.com/eKoopmans/html2pdf.js) library from the Cloudflare CDN to work locally in order to avoid sending any data to any server. The library is used to convert the content of the dialog and artifacts to a PDF file (A4 format, portrait orientation, 5mm margins, and 2x scale). The filename is generated based on the current date and time.                              |
| [Print the content directly or save as PDF](#bookmarklet-to-print-directly-or-save-as-pdf) | This bookmarklet creates a temporary print-specific stylesheet and a temporary container, clones the content of the dialog and artifacts into this container. When printing, only this container is displayed while all other page elements are hidden. The native browser print function is used, allowing to print directly or save as PDF. After printing, the temporary stylesheet and container are automatically removed. |

It's completely secure with no installations, data sharing to third parties, or extensions needed. Everything runs
entirely in your browser.

When user interface of [Claude.ai](https://claude.ai/) changes, these tools may need to be updated because the content
of dialogs and artifacts are found using the following CSS selectors:

- parent of `div[data-test-render-count]` (dialog),
- `div.fixed div.overflow-y-scroll` (artifacts).

## Bookmarklet to export the content to PDF

1. Add a new bookmark to your browser with any name (e.g. "Claude to PDF") and the following code as URL:

   ```javascript
   javascript:(function(){let s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';s.onload=function(){let t=new Date().toISOString().replace(/[-:T.]/g,'').slice(0,14),e1=document.querySelector('div[data-test-render-count]').parentElement,e2=document.querySelector('div.fixed div.overflow-y-scroll');let pdf=html2pdf().set({margin:5,filename:`${t}.pdf`,html2canvas:{scale:2,logging:false}}).from(e1);e2&&(pdf=pdf.toPdf().get('pdf').then(pdfObj=>pdfObj.addPage()).from(e2).toContainer().toCanvas().toPdf());pdf.save();};document.body.appendChild(s);})();
   ```

2. Open any dialog on [Claude.ai](https://claude.ai/).
3. Click on the bookmark.
4. Wait for the PDF.

Unminified code is available [here](https://github.com/give-me/claude/blob/main/bookmarklets/via-html2pdf.js).

## Bookmarklet to print directly or save as PDF

1. Add a new bookmark to your browser with any name (e.g. "Claude to printer") and the following code as URL:

   ```javascript
   javascript:(function(){let style=document.createElement('style');style.textContent='@media print{body>*{display:none!important}#temp{display:flex!important;flex-direction:column}}';document.head.appendChild(style);let temp=document.createElement('div'),e1=document.querySelector('div[data-test-render-count]').parentElement,e2=document.querySelector('div.fixed div.overflow-y-scroll');temp.id='temp';temp.appendChild(e1.cloneNode(true));e2&&temp.appendChild(e2.cloneNode(true));document.body.appendChild(temp);print();setTimeout(()=>{document.head.removeChild(style);document.body.removeChild(temp);},1000);})();
   ```

2. Open any dialog on [Claude.ai](https://claude.ai/).
3. Click on the bookmark.
4. Wait to print directly or save as PDF.

Unminified code is available [here](https://github.com/give-me/claude/blob/main/bookmarklets/via-print.js).