import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import useImagePreview from "./hooks/useImagePreview";
import Form from "react-bootstrap/Form";
import TWICE from "./assets/twice_one.jpg";

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [filteredSrc, setFilteredSrc] = useState<string>("");
  const [saturation, setSaturation] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [brightness, setBrightness] = useState<number>(100);
  const [grey, setGrey] = useState<number>(0);
  const [sepia, setSepia] = useState<number>(0);
  const [red, setRed] = useState<number>(100);
  const [green, setGreen] = useState<number>(100);
  const [blue, setBlue] = useState<number>(100);
  const [hueRotate, setHueRotate] = useState<number>(0);
  const [invert, setInvert] = useState<number>(0);
  const [blur, setBlur] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(100);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;

    if (!files || !files.item(0)) return;

    setImage(files.item(0));

    // Reset filter states to default values
    resetFilter();
  };

  const resetFilter = () => {
    // Reset filter states to default values
    setSaturation(100);
    setContrast(100);
    setBrightness(100);
    setGrey(0);
    setSepia(0);
    setRed(100);
    setGreen(100);
    setBlue(100);
    setHueRotate(0);
    setInvert(0);
    setBlur(0);
    setOpacity(100);
  };

  const previewSrc = useImagePreview(image);

  const changeValue = () => {
    const style = `
      contrast(${contrast}%) 
      brightness(${brightness}%) 
      saturate(${saturation}%) 
      sepia(${sepia}%) 
      grayscale(${grey}%) 
      hue-rotate(${hueRotate}deg) 
      invert(${invert}%) 
      blur(${blur}px) 
      opacity(${opacity}%) 
      hue-rotate(${(red - 100) * 1.8}deg) 
      hue-rotate(${(green - 100) * 1.8}deg) 
      hue-rotate(${(blue - 100) * 1.8}deg)
    `;
    return style;
  };

  const applyFilter = () => {
    const canvas = canvasRef.current;
    const imageElement = new Image();

    if (!canvas) return;

    imageElement.src = previewSrc;

    imageElement.onload = () => {
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = imageElement.width;
      canvas.height = imageElement.height;

      ctx.filter = changeValue();
      ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/png");
      setFilteredSrc(dataUrl);
    };
  };

  return (
    <div
      className="App"
      style={{
        background: `url(${TWICE})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(2px)",
      }}
    >
      <Container style={{ background: "rgba(255,255,255, .5)" }}>
        <Row>
          <Col md={12}>
            <h1>TWICE FILTER APP</h1>
          </Col>
          <Col md={8}>
            <div
              style={{
                aspectRatio: "4 / 3",
                backgroundColor: "silver",
                overflow: "hidden",
              }}
            >
              <img
                src={previewSrc}
                alt="a sample preview"
                width="100%"
                height="100%"
                style={{ objectFit: "cover", filter: changeValue() }}
              />
              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </div>
          </Col>
          <Col md={4} style={{ overflowY: "auto" }}>
            <span>Upload an image</span>
            <div className="input-group mb-3">
              <div className="custom-file">
                <input
                  type="file"
                  accept="image/*"
                  aria-label="Upload image"
                  className="custom-file-input btn btn-primary"
                  onChange={handleChange}
                />
              </div>
            </div>

            <Form.Group controlId="brightness">
              <Form.Label>Brightness - {brightness}</Form.Label>
              <Form.Range
                min={0}
                max={200}
                step={1}
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="saturation">
              <Form.Label>Saturation - {saturation}</Form.Label>
              <Form.Range
                min={0}
                max={200}
                step={1}
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="contrast">
              <Form.Label>Contrast - {contrast}</Form.Label>
              <Form.Range
                min={0}
                max={200}
                step={1}
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="sepia">
              <Form.Label>Sepia - {sepia}</Form.Label>
              <Form.Range
                min={0}
                max={100}
                step={1}
                value={sepia}
                onChange={(e) => setSepia(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="grey">
              <Form.Label>Grayscale - {grey}</Form.Label>
              <Form.Range
                min={0}
                max={100}
                step={1}
                value={grey}
                onChange={(e) => setGrey(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="hueRotate">
              <Form.Label>Hue Rotate - {hueRotate}</Form.Label>
              <Form.Range
                min={0}
                max={360}
                step={1}
                value={hueRotate}
                onChange={(e) => setHueRotate(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="invert">
              <Form.Label>Invert - {invert}</Form.Label>
              <Form.Range
                min={0}
                max={100}
                step={1}
                value={invert}
                onChange={(e) => setInvert(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="blur">
              <Form.Label>Blur - {blur}</Form.Label>
              <Form.Range
                min={0}
                max={20}
                step={1}
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="opacity">
              <Form.Label>Opacity - {opacity}</Form.Label>
              <Form.Range
                min={0}
                max={100}
                step={1}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
              />
            </Form.Group>

            <hr></hr>
            <Form.Group controlId="red">
              <Form.Label>Red - {red}</Form.Label>
              <Form.Range
                min={0}
                max={200}
                step={1}
                value={red}
                onChange={(e) => setRed(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group controlId="green">
              <Form.Label>Green - {green}</Form.Label>
              <Form.Range
                min={0}
                max={200}
                step={1}
                value={green}
                onChange={(e) => setGreen(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="blue">
              <Form.Label>Blue - {blue}</Form.Label>
              <Form.Range
                min={0}
                max={200}
                step={1}
                value={blue}
                onChange={(e) => setBlue(Number(e.target.value))}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <button onClick={applyFilter} className="btn btn-success mt-2">
                Apply Filter
              </button>
              {filteredSrc && (
                <a
                  href={filteredSrc}
                  download={true}
                  className="btn btn-primary mt-2"
                >
                  Download filtered image
                </a>
              )}
              <button
                onClick={resetFilter}
                className="btn btn-danger ml-2 mt-2"
              >
                Reset filter
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
