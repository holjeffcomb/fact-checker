document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("fact-check-button").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "fact-check" },
        (response) => {
          chrome.runtime.sendMessage(
            { action: "fact-check", text: response.text },
            (response) => {
              displayResults(response.results);
            }
          );
        }
      );
    });
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
