chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fact-check") {
    fetchFactCheckData(message.text).then((factCheckResults) => {
      sendResponse({ results: factCheckResults });
    });
    return true; // Will respond asynchronously
  }
});

async function fetchFactCheckData(text) {
  // Replace with actual API call to fact-checking service
  const response = await fetch(
    `https://fact-check-api.example.com/check?text=${encodeURIComponent(text)}`
  );
  const data = await response.json();
  return data;
}
