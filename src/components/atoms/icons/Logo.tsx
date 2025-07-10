const Logo = ({ width = 48, height = 46 }) => {
  return (
    <svg id="logo" width={width} height={height} viewBox="0 0 48 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_165_1071)">
        <path d="M42.0875 33.3311H5.9V29.5186H4V35.2311H5.9V37.1436H42.0875V35.2311H44V29.5186H42.0875V33.3311Z" fill="var(--color-text-primary)" />
        <path d="M40.1874 25.7064H42.0874V29.5189H40.1874V25.7064ZM21.1374 29.5189H26.8499V31.4189H21.1374V29.5189ZM9.7124 2.85645H38.2874V4.75645H9.7124V2.85645Z" fill="var(--color-text-primary)" />
        <path d="M40.1874 25.7064V4.75635H38.2874V23.8063H9.7124V4.75635H7.8124V25.7064H40.1874ZM5.8999 25.7064H7.8124V29.5188H5.8999V25.7064Z" fill="var(--color-text-primary)" />
        <path d="M19.4839 18.03V17.15H18.5939V16.28H17.6939V15.41H16.8039V14.53H15.9139V13.3H16.8139V12.43H17.6939V11.55H18.5939V10.68H19.4839V9.81H20.6739V11.06H19.7739V11.92H18.8939V12.8H17.9839V13.67H17.1039V14.16H17.9839V15.04H18.8939V15.9H19.7739V16.78H20.6739V18.03H19.4839ZM21.8699 17.12L25.0499 10.69H26.1199L22.9399 17.12H21.8699ZM27.3299 18.03V16.78H28.2299V15.9H29.1199V15.04H30.0099V14.16H30.9099V13.67H30.0099V12.8H29.1199V11.92H28.2199V11.06H27.3299V9.81H28.5199V10.68H29.4099V11.55H30.2999V12.43H31.1799V13.3H32.0899V14.53H31.1899V15.41H30.2999V16.28H29.4099V17.15H28.5199V18.03H27.3299Z" fill="var(--color-text-primary)" />
      </g>
      <defs>
        <filter id="filter0_d_165_1071" x="0" y="0" width={width} height={height} filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_165_1071" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_165_1071" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}
export default Logo;  