import React, { useRef, useState,useEffect } from 'react';
import"./Compo.css";

function Canvas() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [fillColor, setFillColor] = useState('red');
  const [shapes, setShapes] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#00bbff');
  const [strokeColor, setStrokeColor] = useState('blue'); // Initial selected color
  const[colorpickershow,setcolorpickershow]=useState(false);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setcolorpickershow(true);
      };
      reader.readAsDataURL(file);
    }
  };

 
  const handleMouseDown = (e) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    drawImage(image)
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.moveTo(offsetX, offsetY);
    setPoints([...points, { x: offsetX, y: offsetY }]);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  
    setPoints([...points, { x: offsetX, y: offsetY }]);
   
  };

  const handleMouseUp = () => {
    setDrawing(false);
    const newShape = [...points];
    setShapes([...shapes, newShape]);
    setPoints([]);
  };

  const handleFillColorChange = (e) => {
    setFillColor(e.target.value);
    console.log(fillColor,"color")

  };
  const eraseCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImage(image)
    
  };

  const fillPolygon = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = fillColor;

    shapes.forEach((shape) => {
      ctx.beginPath();
      shape.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.closePath();
      ctx.fill();
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPoints([]);
    setShapes([]);
  };

  const drawImage = (imageUrl) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
  };
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setDrawing(false);
      setPoints([]);
    }
  }, [image]);
  return (
    <div>
    <section className='sectionmain'>
    <h1 className='head'>Image Upload and Polygon Drawing</h1>


   
  

      {/* Input field for image upload */}
      <div>
      <label class="file-input-container">
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <span class="file-input-label">Choose a File</span>
      </label>
      </div>
      <div class="image-container">
      {/* Display the uploaded image */}
      {image && (
        <div className='mt-5'>
          <h2>Uploaded Image:</h2>
          <img src={image} alt="Uploaded"  width={400}
           />
        </div>
      )}
    
      {image && (
        <div>
          <h2>Draw a Polygon:</h2>
          {colorpickershow ?      <div><input type="color" value="blue" onChange={handleFillColorChange} />
       
          <button onClick={fillPolygon} className="btn fillcolorbtn">Fill</button>
          <button onClick={clearCanvas} className=" btn fillcolorbtn">Clear</button>
          <button onClick={eraseCanvas} className=" btn fillcolorbtn">Erase</button>
          </div>:null} 
          <canvas
          ref={canvasRef}
            width={400}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
           
          />
  
        </div>
        
      )
    
    }
      </div>
      </section>

   
    
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}

export default Canvas;
