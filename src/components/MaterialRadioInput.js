import React, { useState } from 'react';

import { useMaterialFormComponent } from './MaterialFormComponent';

const MaterialRadio = (props) => {
    const [formState, setFormState] = useMaterialFormComponent(props);

    const onInputChange = (event) => {
        let inputValue = event.target.value;
        setFormState.changeValue(inputValue, null, true);
    }
    return (
        <div className={setFormState.getClass("input-wrapper--radio")}>
            {
                props.options.map((item, index)=>{
                    return (
                        <React.Fragment key={index}>
                            <input 
                                className="input" 
                                type="radio" 
                                name="gender"
                                id={item.value}
                                value={item.value} 
                                onFocus={setFormState.onInputFocus}
                                onBlur={setFormState.onInputBlur} 
                                onChange={onInputChange}
                                key={index}
                            />
                            <label for={item.value}>{item.label}</label>
                        </React.Fragment>
                    )
                })
            }
            <span className="input-placeholder">
                {props.placeholder}
            </span>
        </div>
        );
    }
    
    export default MaterialRadio;