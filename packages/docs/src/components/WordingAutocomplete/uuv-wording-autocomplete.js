import { PrimeReactProvider } from 'primereact/api';
import React, { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './uuv-wording-autocomplete.css';
import frAutocompletionSuggestion from '@site/docs/03-wordings/01-generated-wording-description/fr-autocompletion-suggestion.json';
import enAutocompletionSuggestion from '@site/docs/03-wordings/01-generated-wording-description/en-autocompletion-suggestion.json';
import Highlighter from "react-highlight-words";

function buildItemsForLanguage(lang) {
    switch (lang) {
        case 'fr':
            return frAutocompletionSuggestion;
        default:
            return enAutocompletionSuggestion;
    }
}

function getPlaceholder(lang) {
    switch (lang) {
        case 'fr':
            return 'Saisissez un mot clé pour trouver une phrase';
        default:
            return 'Enter a keyword to find a phrase';
    }
}

export function UuvWordingAutocomplete({lang}) {
    const inputItems = buildItemsForLanguage(lang);
    const placeholder = getPlaceholder(lang);
    const [searchText, setSearchText] = useState(null);
    const [value, setValue] = useState('');
    const [items, setItems] = useState(inputItems);

    const normalizeString = (data) => data?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const search = (event) => {
        const textToSearch = event.query;
        setItems(inputItems.filter(item => normalizeString(item.suggestion)?.includes(normalizeString(textToSearch))));
        setSearchText(textToSearch);
    }

    const itemTemplate = (item) => {
        return (
            <Highlighter
                highlightClassName="HighlightWord"
                searchWords={[searchText]}
                autoEscape={true}
                sanitize={normalizeString}
                textToHighlight={item.suggestion}
            />
        );
    };

    const onSelect = (item) => {
        window.location.href = `${window.location.pathname}#${item.link}`;
    };

    return (
        <PrimeReactProvider>
            <div className="flex AutocompleteContainer">
                <div className="p-float-label Autocomplete">
                    <AutoComplete
                        inputId="ac"
                        field="suggestion"
                        value={value}
                        suggestions={items}
                        completeMethod={search}
                        itemTemplate={itemTemplate}
                        onChange={(e) => setValue(e.value)}
                        onSelect={(e) => onSelect(e.value)}
                    />
                        <label htmlFor="ac">{placeholder}</label>
                </div>
            </div>
        </PrimeReactProvider>
    );
}
