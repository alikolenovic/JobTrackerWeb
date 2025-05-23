// components/Loader.js
const Loader = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
      <p className="loader-text text-6xl">Job Tracker</p>
      <div className="container"></div>

      <style>{`
        .container {
          --uib-size: 80px;
          --uib-color: black;
          --uib-speed: 1.4s;
          --uib-stroke: 5px;
          --uib-bg-opacity: 0.1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: var(--uib-stroke);
          width: var(--uib-size);
          border-radius: calc(var(--uib-stroke) / 2);
          overflow: hidden;
          transform: translate3d(0, 0, 0);
        }

        .container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: var(--uib-color);
          opacity: var(--uib-bg-opacity);
          transition: background-color 0.3s ease;
        }

        .container::after {
          content: '';
          height: 100%;
          width: 100%;
          border-radius: calc(var(--uib-stroke) / 2);
          animation: zoom var(--uib-speed) ease-in-out infinite;
          transform: translateX(-100%);
          background-color: var(--uib-color);
          transition: background-color 0.3s ease;
        }

        @keyframes zoom {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
