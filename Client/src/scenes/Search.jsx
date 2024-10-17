import {useState} from 'react';

const Search = ({onSearch, placeholder, style ={}}) => {
    
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false); // State to track if input is focused

    
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    const handleFocus = () => {
        setIsFocused(true); // Set focus state to true
    };

    const handleBlur = () => {
        setIsFocused(false); // Set focus state to false
    };
    
    const handleInputKeyPress = (e) => {
        if(e.key === "Enter") {
            onSearch(query);
        }
    }

  return (
    <div style={{ ...style}}>
    <input 
    onFocus={handleFocus}  
    onBlur={handleBlur}
        type="text" 
        value={query}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyUp={handleInputKeyPress}
        style={{ flex: 1, padding: '8px',backgroundColor: isFocused ? '#e0f7fa' : 'white', // Change color based on focus
            border: '2px solid',
            borderRadius: '5px',
            fontFamily: 'inherit',
            borderColor: isFocused ? 'green' : '', 
            outline: "none" 
            }}
        >
    </input>
    
    </div>
  )
}

export default Search;