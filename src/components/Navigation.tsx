import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactElement } from "react";
import { useNavigate, useLocation } from "react-router-dom";


type NavButtonProps = {
  to: string;
  label: string;
  setVisible: (isVisible: boolean) => void;
  svg: ReactElement;
};

function NavButton({svg, to, label, setVisible }: NavButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname.includes(to);

  return (
    <div
      onClick={() => {navigate(to); setVisible(false)}}
      className={clsx(
        "flex items-center gap-2 p-1.5 px-4 rounded-lg md:rounded-4xl transition cursor-pointer text-blue-primary bg-white",
        isActive
          ? "md:bg-blue-primary md:text-white md:fill-white"
          : "md:bg-blue-light md:text-blue-primary md:fill-blue-primary fill-blue-primary hover:bg-blue-primary hover:text-white hover:fill-white"
      )}
    >
      {svg}
      <p>{label}</p>
    </div>
  );
}


export default function Navigation(){
    const [isVisible, setVisible] = useState(false);  

    return (
    <div className="z-30  bg-white md:min-h-[56px] md:h-[56px] min-h-[65px] h-[65px] flex items-center px-5 font-bold shadow-lg">
      <div
        onClick={() => setVisible(!isVisible)}
        className="block md:hidden z-100"
      >
        <svg className={clsx(isVisible? "fill-white" : "fill-blue-primary")} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 20 20"><path d="M16.4 9H3.6c-.552 0-.6.447-.6 1s.048 1 .6 1h12.8c.552 0 .6-.447.6-1s-.048-1-.6-1m0 4H3.6c-.552 0-.6.447-.6 1s.048 1 .6 1h12.8c.552 0 .6-.447.6-1s-.048-1-.6-1M3.6 7h12.8c.552 0 .6-.447.6-1s-.048-1-.6-1H3.6c-.552 0-.6.447-.6 1s.048 1 .6 1"/></svg>
      </div>

      {/* Menu desktop toujours visible */}
      <div className="hidden md:flex md:flex-row md:items-center md:gap-2 md:text-xl">

        {/* <NavButton svg={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 26 26"><path d="M6.707 8.707a1 1 0 0 1-1.32.083l-.094-.083l-3-3a1 1 0 0 1-.083-1.32l.083-.094l3-3a1 1 0 0 1 1.32-.083l.094.083L9.415 4h9.54l.22.005a5.045 5.045 0 0 1 0 10.08l-.22.004l-2.629-.001l-2.619 2.62a1 1 0 0 1-1.32.082l-.094-.083l-2.62-2.619H6.956l-.174.006a2.956 2.956 0 0 0 0 5.901l.174.005H19v-2c0-.852.986-1.297 1.623-.783l.084.076l3 3a1 1 0 0 1 .083 1.32l-.083.094l-3 3c-.602.603-1.614.22-1.701-.593L19 24v-2H6.956l-.215-.005a4.956 4.956 0 0 1 0-9.902l.215-.004l2.54-.001l2.797-2.795a1 1 0 0 1 1.32-.083l.094.083l2.796 2.795h2.453l.178-.004a3.045 3.045 0 0 0 0-6.079L18.956 6H9.414z"/></svg>} 
        setVisible={setVisible} to="/how" label="Comment on fait ?" /> */}
        
        <NavButton svg={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path  d="M10.95 13.35L15.9 8.4l-1.425-1.425L10.95 10.5l-1.4-1.4l-1.425 1.425zm1.05 6q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12"/></svg>}
        setVisible={setVisible} to="/where" label="Ça va où ?" />

        <NavButton svg={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M9 9H5V5h4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m-1 6h-4V5h4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m-1 6H5v-4h4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4m0 6c-1.103 0-2-.897-2-2s.897-2 2-2s2 .897 2 2s-.897 2-2 2"/></svg>}
        setVisible={setVisible} to="/ic" label="code IC ?" />

        <NavButton svg={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6.427.512A1.75 1.75 0 0 1 7.664 0H13v3h3v5.335c0 .465-.185.91-.513 1.239L9.573 15.48a1.75 1.75 0 0 1-2.473 0l-2.293-2.293l-1.293-1.293l-3-3a1.75 1.75 0 0 1 0-2.475L6.428.512ZM11.5 1.5V3h-.836a1.75 1.75 0 0 0-1.237.512L3.514 9.419q-.09.09-.165.19L1.574 7.833a.25.25 0 0 1 0-.353l5.913-5.907a.25.25 0 0 1 .177-.073zM5.866 12.126l-1.292-1.293a.25.25 0 0 1 0-.353l5.913-5.907a.25.25 0 0 1 .177-.073H14.5v3.835a.25.25 0 0 1-.073.177L8.513 14.42a.25.25 0 0 1-.353 0zM12 8a1 1 0 1 0 0-2a1 1 0 0 0 0 2" clip-rule="evenodd"/></svg>}
        setVisible={setVisible} to="/etiquettes" label="Etiquettes" />
      </div>

      {/* Menu mobile animé */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.95, transformOrigin: "top center" }}
            animate={{ opacity: 1, scaleY: 1, transformOrigin: "top center" }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-blue-primary text-center z-50 absolute top-0 left-0 h-screen w-screen flex flex-col gap-3 px-3 justify-center text-3xl"
          >
              <NavButton 
              svg={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 26 26"><path d="M6.707 8.707a1 1 0 0 1-1.32.083l-.094-.083l-3-3a1 1 0 0 1-.083-1.32l.083-.094l3-3a1 1 0 0 1 1.32-.083l.094.083L9.415 4h9.54l.22.005a5.045 5.045 0 0 1 0 10.08l-.22.004l-2.629-.001l-2.619 2.62a1 1 0 0 1-1.32.082l-.094-.083l-2.62-2.619H6.956l-.174.006a2.956 2.956 0 0 0 0 5.901l.174.005H19v-2c0-.852.986-1.297 1.623-.783l.084.076l3 3a1 1 0 0 1 .083 1.32l-.083.094l-3 3c-.602.603-1.614.22-1.701-.593L19 24v-2H6.956l-.215-.005a4.956 4.956 0 0 1 0-9.902l.215-.004l2.54-.001l2.797-2.795a1 1 0 0 1 1.32-.083l.094.083l2.796 2.795h2.453l.178-.004a3.045 3.045 0 0 0 0-6.079L18.956 6H9.414z"/></svg>}
              setVisible={setVisible} to="/how" label="Comment on fait ?" />
              <NavButton
              svg={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 28 28"><path d="M14 2.25A9.75 9.75 0 0 1 23.75 12c0 4.12-2.895 8.61-8.61 13.518a1.75 1.75 0 0 1-2.283-.002l-.378-.328C7.017 20.408 4.25 16.028 4.25 12A9.75 9.75 0 0 1 14 2.25m0 1.5A8.25 8.25 0 0 0 5.75 12c0 3.502 2.548 7.537 7.714 12.057l.373.323a.25.25 0 0 0 .326 0c5.416-4.652 8.087-8.795 8.087-12.38A8.25 8.25 0 0 0 14 3.75m0 4.5a3.75 3.75 0 1 1 0 7.5a3.75 3.75 0 0 1 0-7.5m0 1.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5"/></svg>}
              setVisible={setVisible} to="/where" label="Ça va où ?" />
              <NavButton svg={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M9 9H5V5h4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m-1 6h-4V5h4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m-1 6H5v-4h4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4m0 6c-1.103 0-2-.897-2-2s.897-2 2-2s2 .897 2 2s-.897 2-2 2"/></svg>}
              setVisible={setVisible} to="/ic" label="code IC ?" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}