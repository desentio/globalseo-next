import React from "react";
import GlobalSeoStyle from './style'

interface GlobalSeoSelectorProps {
  color?: string;
}

export default function GlobalSeoSelector({ color = "#000" }: GlobalSeoSelectorProps) {
  return (
    <>
      <GlobalSeoStyle />
      <div className="globalseo-select globalseo-lang-selector-wrapper globalseo-exclude">
        <details role="group">
          <summary role="button" className="globalseo-lang-selector-loading">
              <svg className="globalseo-lang-selector-loading-icon" width="20" height="20" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.7906 28.9982C14.131 28.9516 11.5622 28.0231 9.48748 26.3584C7.4128 24.6937 5.94973 22.3871 5.328 19.8007M16.7906 28.9982C13.4777 28.9404 10.8853 23.521 11.0009 16.8953C11.1166 10.2697 13.8966 4.94402 17.2094 5.00185M16.7906 28.9982C17.4055 29.0089 18.0021 28.8342 18.5667 28.5M16.7906 28.9982C17.4353 29.0094 17.904 28.9456 18.4338 28.8411M5.328 19.8007C8.73815 21.7699 12.6799 22.9255 16.8953 22.9991C17.5541 23.0116 18.2116 22.9969 18.8663 22.9553M5.328 19.8007C5.09283 18.8151 4.98323 17.8037 5.00182 16.7906C5.03917 14.6509 5.63417 12.6503 6.64706 10.9277M17.2094 5.00185C20.5222 5.05968 23.1147 10.4791 22.9991 17.1047C22.9878 17.7501 22.9513 18.3831 22.8914 19M17.2094 5.00185C19.3374 5.03811 21.4175 5.63986 23.2362 6.74538C25.0548 7.8509 26.5467 9.42037 27.5585 11.2928M17.2094 5.00185C15.0814 4.96382 12.9816 5.49262 11.1255 6.53399C9.26935 7.57536 7.72367 9.09181 6.64706 10.9277M27.5585 11.2928C24.612 13.7563 20.8749 15.0729 17.0349 15.0003C13.0382 14.9306 9.40832 13.4003 6.64706 10.9277M27.5585 11.2928C28.5415 13.1075 29.0375 15.146 28.9982 17.2095C28.9905 17.6459 28.9597 18.0764 28.9068 18.5" 
                    stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                <g style={{animation: 'globalseospin 2s linear infinite', transformOrigin: '26px 26px'}}>
                  <circle cx="26" cy="26" r="7.125" stroke={color} strokeWidth="1.75" strokeDasharray="31.42" strokeDashoffset="10.47"></circle>
                </g>
            </svg>
          </summary>
        </details>
      </div>
    </>
  )
}
