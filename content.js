// Extract text content from the page
const pageText = document.body.innerText;

// Send message to background script for fact-checking
chrome.runtime.sendMessage(
  { action: "fact-check", text: pageText },
  (response) => {
    highlightFactCheckResults(response.results);
  }
);

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
