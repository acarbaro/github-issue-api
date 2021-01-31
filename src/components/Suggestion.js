import React from 'react'
import Label from './Label'
import {OpenIcon, CloseIcon} from '../icons';

export default function Suggestion({ 
   suggestion, 
   handleSuggestionClick, 
   activeOption, 
   suggestionKey 
}) {

   return (
      <li 
         onClick={handleSuggestionClick} 
         className={suggestionKey === activeOption ? 'active-suggestion' : ''}
         title={suggestion.title}
      >  
         <div className="title-container">
            <div>
               {suggestion.state === "open" ? 
                  <OpenIcon className="open-icon" />
                  :
                  <CloseIcon className="close-icon" /> 
               }
            </div>
            <span>{suggestion.title}</span>
         </div>
         <div className="label-container">
         {
            suggestion.labels && suggestion.labels.length ?
               suggestion.labels.map(label => 
                  <Label label={label} key={label.id} />
               )
            :
            null
         }
         </div>
      </li>
   )
}
