import React, { useEffect, useState } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import useImagePreview from "./hooks/useImagePreview";
import Form from "react-bootstrap/Form";

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [saturation, setSaturation] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [brightness, setBrightness] = useState<number>(100);
  const [grey, setGrey] = useState<number>(100);
  const [sepia, setSepia] = useState<number>(100);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files;

    if (!files || !files.item(0)) return;

    setImage(files.item(0));
  };

  const previewSrc: string = useImagePreview(image);

  return (
    <div className="App">
      <Container>
        <Row>
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
                style={{ objectFit: "cover" }}
              />
            </div>
          </Col>
          <Col md={4}>
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

            <Form.Label>Brightness</Form.Label>
            <Form.Range min={0} max={200} step={1}></Form.Range>

            <Form.Label>Saturation</Form.Label>
            <Form.Range min={0} max={200} step={1}></Form.Range>
            <a
              href={previewSrc}
              download={true}
              className="btn btn-primary mt-2"
            >
              Download image
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
