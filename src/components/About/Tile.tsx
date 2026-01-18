type TileProps = {
  id: string;        // me1..me9, me21..me29, bb1..bb9
  backSrc: string;   // the ONLY image (shown after flip)
  alt?: string;
};

export function Tile({ id, backSrc, alt = "" }: TileProps) {
  return (
    <div id={id} className="flip-container">
      {/* IMPORTANT: flipper must be the direct child of #me1 etc */}
      <div className="flipper">
        {/* front is intentionally empty (matches legacy "invisible until flip") */}
        <div className="front" />

        {/* back holds the actual image */}
        <div className="back">
          <img src={backSrc} alt={alt} />
        </div>
      </div>
    </div>
  );
}
