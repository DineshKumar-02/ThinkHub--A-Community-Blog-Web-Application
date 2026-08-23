import { useState, useEffect, useRef } from "react";
import { decode } from "blurhash";

function BlurhashImage({ hash, src, alt, className, style }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!hash || !canvasRef.current) return;

    // Decode the blurhash string to raw pixels (32x32 size is standard and fast)
    const width = 32;
    const height = 32;
    try {
      const pixels = decode(hash, width, height);
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const imageData = ctx.createImageData(width, height);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      }
    } catch (error) {
      console.error("Failed to decode blurhash:", error);
    }
  }, [hash]);

  return (
    <div 
      className={className} 
      style={{ 
        position: "relative", 
        overflow: "hidden", 
        display: "block",
        ...style 
      }}
    >
      {/* Decoded Blurhash Canvas */}
      {!isLoaded && hash && (
        <canvas
          ref={canvasRef}
          width={32}
          height={32}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            filter: "blur(4px)",
            transform: "scale(1.1)", // prevent edge artifacts
            zIndex: 1,
            pointerEvents: "none"
          }}
        />
      )}

      {/* Main Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: isLoaded ? 1 : 0,
          position: "relative",
          zIndex: 2
        }}
      />
    </div>
  );
}

export default BlurhashImage;
