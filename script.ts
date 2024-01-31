document.addEventListener("DOMContentLoaded", () => {
  const quoteBox = document.getElementById("quote-box");
  const textElement = document.getElementById("text");
  const authorElement = document.getElementById("author");
  const newQuoteButton = document.getElementById("new-quote");
  const tweetQuoteLink = document.getElementById("tweet-quote");

  const fetchQuote = async () => {
    try {
      toggleLoading(true);

      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }

      const { content, author } = await response.json();
      updateQuote(content, author);

      toggleLoading(false);
    } catch (error) {
      console.error("Error fetching quote:", error);
      toggleLoading(false);
    }
  };

  const updateQuote = (text, author) => {
    textElement.textContent = text;
    authorElement.textContent = `- ${author}`;
    tweetQuoteLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `${text} - ${author}`
    )}`;
  };

  const toggleLoading = (isLoading) => {
    quoteBox.classList.toggle("loading", isLoading);
    newQuoteButton.disabled = isLoading;
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  fetchQuote();

  newQuoteButton.addEventListener("click", handleNewQuote);
});
