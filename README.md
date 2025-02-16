# Claude.ai Exporter Bookmarklet

This bookmarklet allows you to export the content of any dialog on [Claude.ai](https://claude.ai/) as a PDF file.

This tool is:

- the easiest because it requires only one click without any installation,
- the securest because it works locally and does not send any data to any server,
- the simplest because it uses only one external library hosted on Cloudflare (see details below).

## Usage

1. Add a new bookmark to your browser with any name (e.g. "Claude to PDf") and the following code as URL:

    ```javascript
    javascript:(function(){let s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';s.onload=function(){let e=document.querySelector('div.flex-1.flex.flex-col.gap-3.px-4');let t=new Date().toISOString().replace(/[-:T.]/g,'').slice(0,14);html2pdf().set({margin:5,filename:`${t}.pdf`,html2canvas:{scale:2,logging:false}}).from(e).save();};document.body.appendChild(s);})();
    ```

2. Open any dialog on [Claude.ai](https://claude.ai/).
3. Click on the bookmark.
4. Wait for the PDF.

## Details

On click, the bookmarklet loads the [html2pdf](https://github.com/eKoopmans/html2pdf.js) library from the Cloudflare CDN
to work locally in order to avoid sending any data to any server. The library is used to convert the content of the
dialog to a PDF file (A4 format, portrait orientation, 5mm margins, and 2x scale). The filename is generated based on
the current date and time. Unminified code is
available [here](https://github.com/give-me/claude/blob/main/bookmarklet.js).

When user interface of [Claude.ai](https://claude.ai/) changes, this tool may need to be updated because the content
of dialogs is found using the CSS selector `div.flex-1.flex.flex-col.gap-3.px-4`.