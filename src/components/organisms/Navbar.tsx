import { useEffect } from "react";
import { getLangFromUrl, useTranslations } from "../../i18n/utils";
import Education from "../atoms/icons/Education";
import Home from "../atoms/icons/Home";
import Send from "../atoms/icons/Send";
import Skill from "../atoms/icons/Skill";
import Experience from "../atoms/icons/Work";

const Navbar = ({ lang }) => {
  const t = useTranslations(lang) 
  const items = [
    { component: <Home />, section: "home", onView: false },
    { component: <Skill />, section: "skills", onView: false },
    { component: <Experience />, section: "experience", onView: false },
    { component: <Education />, section: "education", onView: false },
    { component: <Send />, section: "contact", onView: false },
  ];
  const onClick = (section: string) => {
    //console.log(`Navigating to ${section}`);

    const buttons = document.getElementsByClassName(`navbar-item`);
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      button && button.classList.remove('active');
    }
    const buttonSelected = document.getElementsByClassName(`${section} navbar-item`)[0];
    buttonSelected && buttonSelected.classList.add('active');
    window.scrollTo({
      top: document.getElementById(section)?.offsetTop || 0
    });
  }
  useEffect(() => {
    const lang = getLangFromUrl(new URL(location.href));
  }, []);
  return (<>
    <nav id="main-nav" className="navbar">
      {items.map((item, index) => (
        // TO DO tooltip for each section
        <a
          key={`${item.section}-${index}`}
          className={`${item.section} navbar-item ${index == 0 ? 'active' : ''}`}
          aria-label={item.section}
          title={t("navbar")[item.section].name}
          onClick={() => {
          onClick(item.section);
        }}>
          {item.component}
        </a>
      ))}
    </nav>
    {/* To do scroll to top button when is not in Home section */}
    {/* <div
      className="fixed bottom-4 right-4 z-50 p-2 bg-gray-800 border rounded-full cursor-pointer hover:bg-gray-700 transition-colors"
      onClick={() => onClick("home")}
    >
      <span className="material-icons">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="Arrow-Up--Streamline-Solar-Ar" height="24" width="24">
          <desc>
            Arrow Up Streamline Icon: https://streamlinehq.com
          </desc>
          <path d="m12 20 0 -16m0 0 6 6m-6 -6 -6 6" stroke="var(--color-text-primary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
        </svg>
      </span>
    </div> */}
  </>);
}
export default Navbar;

