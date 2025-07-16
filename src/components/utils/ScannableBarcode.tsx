import React, { useState, useRef, useEffect } from 'react';
import Barcode from 'react-barcode';
import { motion, AnimatePresence } from 'framer-motion';

interface ScannableBarcodeProps {
  value: string;
}

const ScannableBarcode: React.FC<ScannableBarcodeProps> = ({ value }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const barcodeRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const handleToggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  useEffect(() => {
    if (showOverlay && barcodeRef.current) {
      const rect = barcodeRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      });
    } else {
      setPosition(null);
    }
  }, [showOverlay]);

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={handleToggleOverlay}
            className="fixed inset-0 bg-black z-40"
          >
            {position && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: position.top - 8,
                  left: position.left - 8,
                  width: position.width + 16,
                  height: position.height + 16,
                  backgroundColor: 'white',
                  borderRadius: '0.5rem',
                }}
                className="z-50 shadow-lg"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={barcodeRef}
        className={`flex justify-center px-2 relative cursor-pointer ${showOverlay ? 'z-50' : ''}`}
        onClick={handleToggleOverlay}
      >
        <Barcode
          className="bg-white rounded-lg"
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
