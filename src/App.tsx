import { MapContainer, GeoJSON, Popup } from "react-leaflet";

import vietnamJson from "./vietnam.json";
import { useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import './App.css';

const apiDataDummy: {[key: string]: {name: string; value: number}} = {
  "VN-26": { name: "Thừa Thiên-Huế", value: 1 },
  "VN-39": { name: "Đồng Nai", value: 1 },
  "VN-CT": { name: "Cần Thơ", value: 3 },
  "VN-DN": { name: "Đà Nẵng", value: 1 },
  "VN-HN": { name: "Hà Nội", value: 18 },
  "VN-SG": { name: "Hồ Chí Minh", value: 20 }
};

function App() {
  const onEachFeatureHandler = useCallback((feature, layer) => {
    if(!feature?.properties?.code) throw new Error('No code available');

    const currentArea = apiDataDummy[feature?.properties?.code];
    if (typeof currentArea !== "undefined") {
      layer.setStyle({
        fillColor: currentArea.value > 3 ? "#FFB8E4" : "#781954"
      });
      const tooltipContent = ReactDOMServer.renderToString(
        <div className="tooltip">
          <p className="title">{currentArea.name}</p>
          <p className="amount">
            <span>Số lượng bệnh viện </span>
            <span>{currentArea.value}</span>
          </p>
        </div>
      );
      layer.bindTooltip(tooltipContent);
    }
  }, []);

  return (
    <div className="app">
      <h1>Việt Nam</h1>
      <MapContainer
        style={{ width: 700, height: 700 }}
        zoom={6}
        center={[16.047079, 108.20623]}
        boxZoom={false}
        zoomControl={false}
        doubleClickZoom={false}
        closePopupOnClick={false}
        dragging={false}
        trackResize={false}
        touchZoom={false}
        scrollWheelZoom={false}
      >
        <GeoJSON
          data={(vietnamJson as any).features}
          style={{
            color: "#ebdfe6",
            weight: 1,
            fillColor: "#CBA7BD",
            fillOpacity: 1
          }}
          onEachFeature={onEachFeatureHandler}
        />
        <Popup
          key="Hoang Sa Island"
          position={[16.668011, 109.939995]}
          autoClose={false}
        >
          Hoàng Sa
        </Popup>
        <Popup
          key="Truong Sa Island"
          position={[10.487044, 113.250166]}
          autoClose={false}
        >
          Trường Sa
        </Popup>
      </MapContainer>
    </div>
  );
}

export default App;
