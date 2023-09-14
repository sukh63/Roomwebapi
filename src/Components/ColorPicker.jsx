import React from 'react'
import { SketchPicker } from 'react-color';
function ColorPicker({ selectedColor, onSelectColor }) {
    return (
      <div>
        <h2>Color Picker</h2>
        <SketchPicker
          color={selectedColor}
          onChange={(color) => onSelectColor(color.hex)}
        />
      </div>
    );
  }
  

export default ColorPicker