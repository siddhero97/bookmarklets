(function () {
    /* v. 0.4, github.com/give-me/claude */
    let style = document.createElement('style');
    style.textContent = '@media print{body>*{display:none!important}#temp{display:flex!important;flex-direction:column}}';
    document.head.appendChild(style);
    // Get elements with a dialog and artifacts
    let temp = document.createElement('div'),
        e1 = document.querySelector('div[data-test-render-count]').parentElement,
        e2 = document.querySelector('div.fixed div.overflow-y-scroll');
    temp.id = 'temp';
    // Add the element with a dialog to print
    temp.appendChild(e1.cloneNode(true));
    // Add the element with artifacts if open
    e2 && temp.appendChild(e2.cloneNode(true));
    // Print the temporary element
    document.body.appendChild(temp);
    print();
    // Clean up after printing
    setTimeout(() => {
        document.head.removeChild(style);
        document.body.removeChild(temp);
    }, 1000);
})();