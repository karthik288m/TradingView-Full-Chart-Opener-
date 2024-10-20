// Content script to modify the behavior of the TradingView and Chartink pages
document.addEventListener('click', function(event) {
    const target = event.target;

    // Check if the clicked element is an anchor tag from TradingView symbols
    const linkElementTradingView = target.closest('a[href*="/symbols/"]');
    if (linkElementTradingView) {
        const targetUrl = linkElementTradingView.getAttribute('href');

        // Extract the EXCHANGE and SYMBOL from the TradingView target URL
        const match = targetUrl.match(/\/symbols\/(\w+)-(\w+)/);
        
        if (match) {
            const exchange = match[1]; // Extract EXCHANGE (e.g., NSE)
            const symbol = match[2];    // Extract SYMBOL (e.g., HDFCBANK)
            const modifiedUrl = `https://www.tradingview.com/chart/?symbol=${exchange}:${symbol}`;
            
            // Open the modified URL in a new tab next to the current tab
            chrome.runtime.sendMessage({ url: modifiedUrl });
            event.preventDefault(); // Prevent the default action of the link
            return; // Exit to avoid checking the Chartink condition
        }
    }

    // Check if the clicked element is an anchor tag from Chartink
    const linkElementChartink = target.closest('a[href^="/stocks-new?"]');
    if (linkElementChartink) {
        const targetUrl = linkElementChartink.getAttribute('href');

        // Extract the SYMBOL from the Chartink target URL
        const match = targetUrl.match(/symbol=([A-Z]+)/); // Regex to extract the symbol

        if (match) {
            const symbol = match[1]; // Extract SYMBOL (e.g., VOLTAS or RAILTEL)
            const exchange = "NSE";   // Hardcoded EXCHANGE for Chartink
            const modifiedUrl = `https://in.tradingview.com/chart/?symbol=${exchange}:${symbol}`;
            
            // Open the modified URL in a new tab next to the current tab
            chrome.runtime.sendMessage({ url: modifiedUrl });
            event.preventDefault(); // Prevent the default action of the link
        }
    }
});
