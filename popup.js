document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "get-results" },
      (response) => {
        displayResults(response.results);
      }
    );
  });
});

function displayResults(results) {
  const resultsDiv = document.getElementById("results");
  results.forEach((result) => {
    const div = document.createElement("div");
    div.textContent = `${result.text}: ${result.isFalse ? "False" : "True"}`;
    resultsDiv.appendChild(div);
  });
}
