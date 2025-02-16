(function () {
    let script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.2/html2pdf.bundle.min.js';
    script.onload = function () {
        let element = document.querySelector('div.flex-1.flex.flex-col.gap-3.px-4');
        let timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
        html2pdf().set({
            margin: 5,
            filename: `${timestamp}.pdf`,
            html2canvas: {scale: 2, logging: false}
        }).from(element).save();
    };
    document.body.appendChild(script);
})();