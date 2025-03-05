import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  const [charCount, setCharCount] = useState(0);
  const charLimit = 250;

  const handleChange = (onChange, value) => {
    if (value.length <= charLimit) {
      setCharCount(value.length);
      onChange(value);
    }
  };

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div>
            <textarea
              value={value || defaultValue}
              onChange={(e) => handleChange(onChange, e.target.value)}
              rows="10"
              maxLength={charLimit} // Prevents the user from typing more than 250 characters
              className="w-full p-2 border bg-white border-gray-300 rounded-md"
            />
            <div className="mt-2 text-sm text-gray-600">
              {charCount} / {charLimit} characters
            </div>
            {charCount > charLimit && (
              <p className="text-red-500 text-xs mt-1">
                You cannot add more than 250 characters.
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}

