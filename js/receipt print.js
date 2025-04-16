function printAndRedirect() {
    window.print();
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1000);
}
