import React, { useCallback, useState } from "react";
import useDebounce from "./hooks/useDebounce";
import VirtualizedList from "./VirtualizedList";

type AutocompleteComponentProps = {
  options: string[];
}

const AutocompleteComponent: React.FC<AutocompleteComponentProps> = ({
  options,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showAutoSuggest, setShowAutoSuggest] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce(inputValue, 500);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if ((inputRef.current && event.target instanceof Node && !inputRef.current.contains(event.target))) {
      setShowAutoSuggest(false);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleInputFocus = useCallback(() => {
    setShowAutoSuggest(true);
  }, [])

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  }, []);

  const filterOptions = useCallback(async (value: string) => {
    // Use a mock API call that returns a Promise with a delay of 500ms
    const filteredOptions = await new Promise<string[]>((resolve) =>
      setTimeout(() => {
        const filteredOptions = options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        );
        resolve(filteredOptions);
      }, 1000)
    );

    setFilteredOptions(filteredOptions);
  }, [options]);

  React.useEffect(() => {
    filterOptions(inputValue)
  }, [debouncedValue]);

  const handleOptionSelect = useCallback((option: string) => {
    setInputValue(option);
  }, []);

  const renderOption = useCallback((option: string) => {
    const parts = option.split(new RegExp(`(${inputValue})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          <span className={part.toLocaleLowerCase() === inputValue.toLocaleLowerCase() ? 'bold' : ''} key={i}>
            {part}
          </span>
        ))}
        {' '}
      </span>
    )
  }, [inputValue])

  return (
    <div className="autocomplete">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleInputFocus}
        placeholder="Type to search..."
      />
      {
        showAutoSuggest && filteredOptions.length > 0 && (
          <VirtualizedList
            data={filteredOptions}
            onSelect={handleOptionSelect}
            renderItem={renderOption}
          />
        )
      }
      {
        showAutoSuggest && !filteredOptions.length && (
          <div className="empty">no suggestions data</div>
        )
      }
    </div>
  );
};

export default AutocompleteComponent;
