import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { useState } from "react";

const WorkingMap = () => {
  const [hue, setHue] = useState(0);
  const color = `hsl(${hue % 360}deg 39% 70%)`;

  return (
    <div>
      <Map
        provider={osm}
        dprs={[1, 2]}
        height={556}
        defaultCenter={[22.4664867, 90.3820968]}
        defaultZoom={17}>
        <Marker
          width={50}
          anchor={[22.4664867, 90.3820968]}
          color={color}
          onClick={() => setHue(hue + 20)}
        />
      </Map>
    </div>
  );
};

export default WorkingMap;
