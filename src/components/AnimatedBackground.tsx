// src/components/AnimatedBackground.tsx
const AnimatedBackground = () => {
  return (
    <>
      <div className="absolute w-[1000px] h-[1000px] bg-purple-600 opacity-30 rounded-full blur-3xl animate-pulse-slow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute w-[1200px] h-[1200px] bg-purple-800 opacity-20 rounded-full blur-[150px] animate-float top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>
    </>
  );
};

export default AnimatedBackground;
