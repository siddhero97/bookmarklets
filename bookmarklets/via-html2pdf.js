(function () {
    let script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';
    script.onload = function () {
        // Get a timestamp and elements with a dialog and artifacts
        let ts = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14),
            e1 = document.querySelector('div.flex.flex-1.flex-col.gap-3.px-4'),
            e2 = document.querySelector('div.flex.flex-1.overflow-x-auto.overflow-y-scroll');
        // Create a PDF from the element with a dialog
        let pdf = html2pdf().set({margin: 5, filename: `${ts}.pdf`, html2canvas: {scale: 2, logging: false}}).from(e1);
        // Add the element with artifacts if open
        e2 && (pdf = pdf.toPdf().get('pdf').then(pdfObj => pdfObj.addPage()).from(e2).toContainer().toCanvas().toPdf());
        // Render the PDF
        pdf.save();
    };
    document.body.appendChild(script);
})();