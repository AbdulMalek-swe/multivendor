import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate', id: 1 },
  { value: 'strawberry', label: 'Strawberry', id: 2 },
  { value: 'vanilla', label: 'Vanilla', id: 3 }
];

const options1 = [
  { value: 'chocolate', label: 'Chocolate', id: 1, ids: 3 },
  { value: 'strawberry', label: 'Strawberry', id: 2, ids: 3 },
  { value: 'vanilla', label: 'Vanilla', id: 3, ids: 2 },
  { value: 'chocolate', label: 'Chocolate', id: 4, ids: 3 },
  { value: 'strawberry', label: 'Strawberry', id: 5, ids: 3 },
  { value: 'vanilla2', label: 'Vanilla2', id: 6, ids: 2 }
];

const Test = () => {
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleMainSelectChange = (e) => {
    const filtered = options1.filter(item => item.ids === e.id);
    setCityOptions(filtered);

    // reset city if current selection is not in new filtered options
    if (!filtered.some(opt => opt.value === selectedCity?.value)) {
      setSelectedCity(null);
    }
  };

  return (
    <div className='py-60 text-black'>
      <Select options={options} onChange={handleMainSelectChange} />
      <Select 
        options={cityOptions} 
        value={selectedCity} 
        onChange={setSelectedCity} 
        placeholder="Select a city"
        isClearable 
      />
    </div>
  );
};

export default Test;
