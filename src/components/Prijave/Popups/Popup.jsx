import React, { useEffect } from 'react';

const Popup = ({ type = 'success', text = '', onClose }) => {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop blur without overlay color */}
      <div className="absolute inset-0 backdrop-blur-md bg-transparent"></div>
      <div className={`text-white px-8 py-6 rounded-2xl border-2 border-white shadow-2xl pointer-events-auto max-w-xl w-full mx-4 text-center relative`}>
        <div className="font-medium text-base md:text-lg">{text}</div>
      </div>
    </div>
  );
};

export default Popup;
