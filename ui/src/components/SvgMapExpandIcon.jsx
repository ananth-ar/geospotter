import React from "react";

function SvgMapExpandIcon() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <svg height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" stroke="#000000" stroke-width="0.00512">
          <g id="SVGRepo_bgCarrier" stroke-width="0" />
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="3.072" />
          <g id="SVGRepo_iconCarrier">
            <circle style="fill:#273B7A;" cx="256" cy="256" r="256" />
            <path style="fill:#121149;" d="M512,256c0-4.918-0.153-9.799-0.426-14.648L398.222,128L162.047,283.87l18.997,18.997L113.778,384 l127.574,127.574C246.201,511.848,251.083,512,256,512C397.384,512,512,397.384,512,256z" />
            <polygon style="fill:#E09112;" points="303.407,156.444 208.593,128 113.778,156.444 113.778,384 208.593,355.556 303.407,384 398.222,355.556 398.222,128 " />
            <polygon style="fill:#FEE187;" points="208.593,355.556 113.778,384 113.778,156.444 208.593,128 " />
            <g>
              <polygon style="fill:#FFC61B;" points="303.407,384 208.593,355.556 208.593,128 303.407,156.444 " />
              <polygon style="fill:#FFC61B;" points="113.778,256 113.778,384 208.593,355.556 208.593,256 " />
            </g>
            <polygon style="fill:#EAA22F;" points="208.593,256 208.593,355.556 303.407,384 303.407,256 " />
            <polygon style="fill:#E09112;" points="398.222,355.556 303.407,384 303.407,156.444 398.222,128 " />
            <polygon style="fill:#FF5419;" points="303.407,256 303.407,384 398.222,355.556 398.222,256 " />
            <path style="fill:#386895;" d="M207.731,186.396c-24.278,0-43.96,19.682-43.96,43.96c0,30.639,43.96,87.919,43.96,87.919 s43.96-55.775,43.96-87.919C251.69,206.077,232.008,186.396,207.731,186.396z M207.731,248.57c-9.98,0-18.07-8.09-18.07-18.07 s8.09-18.07,18.07-18.07s18.07,8.09,18.07,18.07S217.71,248.57,207.731,248.57z" />
            <path style="fill:#273B7A;" d="M251.69,230.355c0-24.278-19.682-43.96-43.96-43.96c-0.048,0-0.095,0.003-0.143,0.003v26.038 c0.048,0,0.095-0.007,0.143-0.007c9.98,0,18.07,8.09,18.07,18.07c0,9.98-8.09,18.07-18.07,18.07c-0.048,0-0.095-0.007-0.143-0.007 v69.523c0.091,0.119,0.143,0.188,0.143,0.188S251.69,262.499,251.69,230.355z" />
          </g>
        </svg>
      `,
      }}
    />
  );
}

export default SvgMapExpandIcon;
