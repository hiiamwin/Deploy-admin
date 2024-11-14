/* eslint-disable */
"use client";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function ExPage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Sử dụng useDebouncedCallback để giảm tần suất gọi API
  const debouncedFetchSuggestions = useDebouncedCallback(async (value) => {
    if (value.length > 2) {
      setLoading(true);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          value
        )}&format=json&addressdetails=1&countrycodes=VN`
      );

      const data = await response.json();
      setSuggestions(data);
      setLoading(false);
    } else {
      setSuggestions([]);
    }
  }, 500); // Độ trễ debounce là 500ms

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchSuggestions(value); // Gọi hàm debounce khi nhập liệu
  };

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.display_name);
    setSuggestions([]);
  };

  return (
    <div style={{ width: "300px", margin: "0 auto", padding: "20px" }}>
      <h1>Tìm kiếm địa điểm</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Nhập tên địa điểm"
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />
      {loading && <p>Đang tải...</p>}
      <ul style={{ listStyleType: "none", padding: 0, marginTop: "8px" }}>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.place_id}
            onClick={() => handleSuggestionClick(suggestion)}
            style={{
              padding: "8px",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              marginBottom: "4px",
              borderRadius: "4px",
            }}
          >
            {suggestion.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExPage;
