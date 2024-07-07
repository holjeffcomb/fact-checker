// Extract text content from the page
const pageText = document.body.innerText;

// Send message to background script for fact-checking
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fact-check") {
    // Extract text content from the page
    const pageText = document.body.innerText;

    // Send the text back to the sender
    sendResponse({ text: pageText });
  }
});

function highlightFactCheckResults(results) {
  // Highlight or flag the content based on the fact-checking results
  results.forEach((result) => {
    if (result.isFalse) {
      const regex = new RegExp(result.text, "gi");
      document.body.innerHTML = document.body.innerHTML.replace(
        regex,
        `<span style="background-color: yellow;">${result.text}</span>`
      );
    }
  });
}
