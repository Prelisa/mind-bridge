import React from "react";
import { useNavigate } from "react-router-dom";
import "./noResult.css";
function NoResultFound({ keySearch = "" }) {
  const nav = useNavigate();

  return (
    <div class="search-container">
      <div class="no-results">
        <h3 class="no-results-header">
          Your search - <span class="search-query">{keySearch}</span> - did not
          match any documents.
        </h3>
        <div class="suggestions">
          <p>Suggestions:</p>
          <ul class="suggestions-list">
            <li>Make sure all words are spelled correctly.</li>
            <li>Try different keywords.</li>
            <li>Try more general keywords.</li>
            <li>Try fewer keywords.</li>
          </ul>
        </div>
      </div>

      <div class="alternative-searches">
        <h4 class="alternative-title">Related searches</h4>
        <div class="related-searches">
          <a
            class="related-search-item"
            onClick={(e) => {
              nav(`/searchResult/${encodeURIComponent("Health")}`);
            }}
          >
            <svg
              class="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            Health
          </a>
          <a
            class="related-search-item"
            onClick={(e) => {
              nav(`/searchResult/${encodeURIComponent("Mental")}`);
            }}
          >
            <svg
              class="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            Mental
          </a>
          <a
            class="related-search-item"
            onClick={(e) => {
              nav(`/searchResult/${encodeURIComponent("Depression")}`);
            }}
          >
            <svg
              class="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            Depression
          </a>
        </div>
      </div>
    </div>
  );
}

export default NoResultFound;
