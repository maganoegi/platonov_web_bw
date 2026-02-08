

import { Tile } from "./Tile";

export function AboutImages() {
    const meGrid = ["me1","me2","me3","me4","me5","me6","me7","me8","me9"];
    const me2Grid = ["me21","me22","me23","me24","me25","me26","me27","me28","me29"];
    const bbGrid = ["bb1","bb2","bb3","bb4","bb5","bb6","bb7","bb8","bb9"];

    const back = (id: string) => `/resources/img/${id}.jpeg`;

    return (
        <div className="aboutImages">
        <div id="megrid" className="flip-grid">
            {meGrid.map((id) => (
            <Tile key={id} id={id} backSrc={back(id)} />
            ))}
        </div>

        <div id="me2grid" className="flip-grid">
            {me2Grid.map((id) => (
                <Tile key={id} id={id} backSrc={back(id)} />
            ))}
        </div>

        <div id="bbgrid" className="flip-grid">
            {bbGrid.map((id) => (
                <Tile key={id} id={id} backSrc={back(id)} />
            ))}
        </div>
        </div>
    );
}
