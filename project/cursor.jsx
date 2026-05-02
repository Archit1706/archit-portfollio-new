const { useEffect, useRef, useState } = React;
const { motion, useMotionValue, useSpring, animate } = window.Motion || {};

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    const onOver = (e) => {
      const el = e.target;
      if (!el || !el.closest) return;
      const interactive = el.closest('a, button, [data-hover], input, textarea, [role="button"]');
      setHover(!!interactive);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    let raf;
    const loop = () => {
      // spring physics: stiffness 150, damping 15
      const dx = posRef.current.x - ringPosRef.current.x;
      const dy = posRef.current.y - ringPosRef.current.y;
      ringPosRef.current.x += dx * 0.18;
      ringPosRef.current.y += dy * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={'cursor-ring' + (hover ? ' hover' : '')} />
    </>
  );
}

window.CustomCursor = CustomCursor;
