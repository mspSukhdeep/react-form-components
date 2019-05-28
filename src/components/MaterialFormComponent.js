import { useState } from 'react';

export const useMaterialFormComponent = (props) => {
    const [isFocused, setFocus] = useState(false),
        [value, setValue] = useState(props.data),
        [isEditing, setEdit] = useState(false),
        [validationRegex, setRegex] = useState(new RegExp(props.validate)),
        [isValid, setValidation] = useState(true);

    const onInputFocus = function () {
        setFocus(true);
    }

    const onInputBlur = function () {
        let _isValid = true;

        if (value || props.isMandatory == "true") {
            if (!validationRegex.test(value) || (props.minLength && String(value).length < props.minLength)) {
                _isValid = false;
            }
        }

        setFocus(false);
        setEdit(false);
        setValidation(_isValid);
    }

    const onInputChange = function (event) {
        let inputValue = event.target.value,
            filteredValue = inputValue;
        if (props.type === "text") {
            if (props.maxLength && String(inputValue).length > props.maxLength) {
                inputValue = inputValue.slice(0, props.maxLength);
            }
        }
        else if (props.type === "phone") {
            inputValue = inputValue.replace(/\D/g, '');
            filteredValue = inputValue;
            let _specialCharsAdded = 0;

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
        }
        setValue(inputValue);
        props.onChange(filteredValue);
        setEdit(true);
    }

    const changeValue = function (val, propVal, oneStepEdit = false) {
        propVal = propVal ? propVal : val;
        setValue(val);
        props.onChange(propVal);
        !oneStepEdit && setEdit(true);
    }

    const getClass = function (modClass = "") {
        let classNames = `input-wrapper ${modClass}`;
        if (isFocused || value) {
            classNames += ' input-wrapper--focused'
        }
        if (isEditing) {
            classNames += ' input-wrapper--editing'
        }
        if (!isValid) {
            classNames += ' input-wrapper--invalid'
        }
        return classNames;
    }

    return [
        {
            value
        },
        {
            onInputFocus,
            onInputBlur,
            onInputChange,
            changeValue,
            getClass
        }
    ]
}