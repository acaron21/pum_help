import React, { useState } from 'react';
import Barcode from 'react-barcode';
import { motion, AnimatePresence } from 'framer-motion';

interface ScannableBarcodeProps {
  value: string;
}

const ScannableBarcode: React.FC<ScannableBarcodeProps> = ({ value }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleToggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            onClick={handleToggleOverlay}
            className="fixed inset-0 bg-black z-4000"
          />
        )}
      </AnimatePresence>

      <div
        className={`flex justify-center px-2 relative ${showOverlay ? 'z-5000' : ''}`}
        onClick={handleToggleOverlay}
      >
        <Barcode
          className="p-0.5 bg-white rounded-lg cursor-pointer"
          value={value}
          format="CODE128"
          displayValue={false}
          width={2}
          height={35}
        />
      </div>
    </>
  );
};

export default ScannableBarcode;
