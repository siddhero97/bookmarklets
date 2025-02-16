(function () {
    let script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';
    script.onload = function () {
        // Get a timestamp and an element with a dialog
        let ts = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14),
            el = document.querySelector('div.flex.flex-1.flex-col.gap-3.px-4');
        // Create a PDF from the element with a dialog
        html2pdf().set({margin: 5, filename: `${ts}.pdf`, html2canvas: {scale: 2, logging: false}}).from(el).save();
    };
    document.body.appendChild(script);
})();