import React, { useState, useCallback } from 'react'
import Suggestion from './Suggestion';

export default function Autocomplete({ options }) {

   const [autocompleteInput, setAutocompleteInput] = useState("")
   const [activeOption, setActiveOption] = useState(0);
   const [showOptions, setShowOptions] = useState(false);
   const [suggestions, setSuggestions] = useState([]);

   const handleAutocomplete = (e) => {
      getIssuesFromGithub(e.target.value);
   }

   const getIssuesFromGithub = (inputValue) => {
      const match = options.filter(options => options.title.toLowerCase().indexOf(autocompleteInput.toLocaleLowerCase()) > -1);
      setSuggestions(match)
      setShowOptions(true)
      setAutocompleteInput(inputValue)
   }

   const handleKeyDown = (e) => {
      if(e.keyCode === 13){
         setActiveOption(0);
         setShowOptions(false);
         setAutocompleteInput(suggestions[activeOption].title)
         window.open(suggestions[activeOption].html_url, "_blank")
      } else if (e.keyCode === 38) {
         if (activeOption === 0) 
           return;
         setActiveOption(activeOption - 1);
      } else if(e.keyCode === 40) {
         if (activeOption - 1 === suggestions.length) 
            return;
         setActiveOption(activeOption + 1)
      }
   };

   const handleSuggestionClick = useCallback((e, suggestion) => {
      setActiveOption(0);
      setShowOptions(false);
      setAutocompleteInput(e.currentTarget.innerText)
      window.open(suggestion.html_url, "_blank")
   }, [])

   return (
      <div className="autocomplete-container">
         <input 
            className="autocomplete-input"
            name="autocomplete" 
            value={autocompleteInput} 
            placeholder="Search all issues"
            onChange={handleAutocomplete}
            onKeyDown={handleKeyDown}
            autoComplete="off"
         />
         { showOptions && autocompleteInput ?
            suggestions && suggestions.length ?
               <ul className="autocomplete-results">
                  {suggestions.map((suggestion, suggestionKey) => 
                     <Suggestion 
                        suggestionKey={suggestionKey}
                        key={suggestion.id}
                        suggestion={suggestion} 
                        handleSuggestionClick={e => handleSuggestionClick(e,suggestion)} 
                        activeOption={activeOption}
                     />
                  )}
               </ul>
               : 
               <div className="no-options">
                  <span>No results matched your search.</span>
               </div>
            :
            null
         }
      </div>
   )
}
