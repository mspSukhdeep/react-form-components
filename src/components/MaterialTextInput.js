import React from 'react';

import { useMaterialFormComponent } from './MaterialFormComponent';

const MaterialTextInput = (props) => {
    const [formState, setFormState] = useMaterialFormComponent(props);

    const handleTextChange = (inputValue) => {
        if (props.maxLength && String(inputValue).length > props.maxLength) {
            inputValue = inputValue.slice(0, props.maxLength);
        }
        return {
            displayValue: inputValue,
            propValue: inputValue
        }
    }
    
    const handleMobileChange = (inputValue) => {
        inputValue = inputValue.replace(/\D/g, '');


        let filteredValue = inputValue,
            _specialCharsAdded = 0;

        if (props.variant === "1") {
            let dashedValue = inputValue.slice(0, 3);
            if (inputValue.length > 3) {
                dashedValue += "-" + inputValue.slice(3, 6);
                _specialCharsAdded++;
            }
            if (inputValue.length > 6) {
                dashedValue += "-" + inputValue.slice(6, props.maxLength);
                _specialCharsAdded++;
            }
            inputValue = dashedValue;
        }
        else {
            let dashedValue = inputValue.slice(0, 2);

            if (inputValue.length > 2) {
                dashedValue += "-" + inputValue.slice(2, props.maxLength);
                _specialCharsAdded++;
            }
            inputValue = "+" + dashedValue;
        }

        if (props.maxLength && String(filteredValue).length > props.maxLength) {
            inputValue = inputValue.slice(0, props.maxLength + _specialCharsAdded);
            filteredValue = filteredValue.slice(0, props.maxLength);
        }

        return {
            displayValue: inputValue,
            propValue: filteredValue
        }

    }

    const onInputChange = (event) => {
        let inputValue = event.target.value,
            handleResponse = {};

        if (props.type === "text") {
            handleResponse = handleTextChange(inputValue);
        }
        else if (props.type === "phone") {
            handleResponse = handleMobileChange(inputValue);
        }
        setFormState.changeValue(handleResponse.displayValue, handleResponse.propValue);
    };

    return (
        <div className={setFormState.getClass("input-wrapper--text")}>
            <input
                className="input"
                type="text"
                value={formState.value}
                onFocus={setFormState.onInputFocus}
                onBlur={setFormState.onInputBlur}
                onChange={onInputChange}
            />
            <span className="input-placeholder">
                {props.placeholder}
            </span>
        </div>
    );
}

export default MaterialTextInput;