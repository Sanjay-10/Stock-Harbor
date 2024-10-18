import { useState, useEffect, useRef } from "react";
import { TextField, List, ListItem, ListItemText, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchedWord } from "../state/index.js";

const Search = ({ placeholder, style = {} }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // Start with the first option selected
  const listRef = useRef(null); // Reference to the list for scrolling

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setSelectedIndex(0); // Set the first option as selected when focused
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100); // Delay to allow click events to register before blur
  };

  const fetchData = async (searchQuery) => {
    if (!searchQuery) return;
    const response = await fetch(
      `http://localhost:5001/?searchingSymbol=${searchQuery.toLowerCase()}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    // console.log(result);
    setData(result);
    setSelectedIndex(0); // Reset to first option when new data is fetched
  };

  const mouseClick = (e) => {
    const searched = e.Symbol;
    dispatch(setSearchedWord(searched));
  };

  useEffect(() => {
    if (query.length > 0) {
      fetchData(query);
    } else {
      setData([]);
    }
  }, [query]);

  useEffect(() => {
    // Scroll to the selected item if it exists
    if (listRef.current) {
      const selectedItem = listRef.current.children[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: "nearest", inline: "start" });
      }
    }
  }, [selectedIndex]);

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      if (data.length > 0 && selectedIndex >= 0) {
        const selected = data[selectedIndex];

        const searched = selected.Symbol;

        dispatch(setSearchedWord(searched));

        setQuery("");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent default scrolling behavior
      setSelectedIndex((prevIndex) => {
        if (prevIndex < data.length - 1) return prevIndex + 1; // Move down
        return prevIndex; // Stay at last item
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent default scrolling behavior
      setSelectedIndex((prevIndex) => {
        if (prevIndex > 0) return prevIndex - 1; // Move up
        return prevIndex; // Stay at first item
      });
    }
  };

  return (
    <div style={{ ...style, position: "relative" }}>
      <TextField
        onKeyDown={handleKeyDown}
        autoComplete="off"
        onFocus={handleFocus}
        onBlur={handleBlur}
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyPress}
        variant="outlined"
        fullWidth
        InputProps={{
          style: {
            borderRadius: "5px",
            fontSize: "large",
          },
        }}
      />
      {isFocused && data.length > 0 && (
        <Paper
          elevation={3}
          style={{
            cursor: "pointer",
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            position: "absolute",
            zIndex: 1000,
            borderRadius: "8px",
            marginTop: "4px",
          }}
        >
          <List ref={listRef}>
            {data.map((item, index) => (
              <ListItem
                button
                key={index}
                sx={{
                  backgroundColor:
                    selectedIndex === index ? "lightgreen" : "transparent",
                  "&:hover": { backgroundColor: "lightgreen" },
                }}
                onMouseEnter={() => setSelectedIndex(index)} // Update selected index on hover
                onClick={() => mouseClick(item)} // Handle item selection
              >
                <ListItemText
                  primary={item["Symbol"]}
                  secondary={item["Security"]}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default Search;
