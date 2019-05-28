import MaterialRadioInput from "./MaterialRadioInput";
import MaterialTextInput from "./MaterialTextInput";

import PropTypes from "prop-types";
import React, { useState } from 'react';

const App = () => {
    const [email, setEmail] = useState(''),
          [primaryNum, setPrimaryNum] = useState(''),
          [secondaryNum, setSecondaryNum] = useState(''),
          [gender, setGender] = useState(),
          genderOptions = [
            {
              label: 'male',
              value: 'm'
            },
            {
              label: 'female',
              value: 'f'
            }
          ];

    return (
      <div>
          <h3 className="title">
            Form Controls
          </h3>
          <MaterialTextInput
            type="text"
            placeholder="Email" 
            minLength="8"
            isMandatory="true"
            validate=".+\@.+\..+"
            onChange={setEmail}
            data={email}
          />
          <MaterialTextInput
            type="phone"
            variant="1"
            placeholder="Primary Number"
            maxLength="10"
            validate="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
            onChange={setPrimaryNum}
            data={primaryNum}
          />
          <MaterialTextInput
            type="phone"
            variant="2"
            maxLength="12"
            placeholder="Secondary Number" 
            validate="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$"
            onChange={setSecondaryNum}
            data={secondaryNum}
          />
          <MaterialRadioInput
            placeholder="Gender" 
            onChange={setGender}
            data={gender}
            options={genderOptions}
          />
      </div>
    );
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
