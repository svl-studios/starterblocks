const { registerPlugin } = wp.plugins;
import Sidebar from './sidebar'

const starterblocksIcon = <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="19px" height="19px" x="0px" y="0px"
viewBox="0 0 19 19" preserveAspectRatio="xMidYMid meet">
<g id="layer101" stroke="none"><path className="st0" d="M1.48,14.2c-0.03-0.04-0.06-0.08-0.08-0.12c0-0.59,0.01-1.18,0.01-1.76c0.31-0.05,7.32,4.13,7.54,4.2
	c0.23,0.16,0.44,0.43,0.78,0.23c0.51-0.3,5.06-2.93,6.01-3.46c0.1-0.06,0.2-0.13,0.2-0.26c0-0.52,0-1.04,0-1.66
	c-2.01,1.17-3.91,2.29-5.82,3.4c-0.38,0.24-0.76,0.33-1.16,0.04c-1.53-0.95-7.38-4.2-7.44-4.21c0.01-0.09-0.03-0.15-0.1-0.2
	c0-0.45,0.03-4.24,0.01-4.63C1.37,5.14,1.46,4.65,2.1,4.39c0.63-0.41,6.11-3.47,6.88-3.94c0.34-0.21,0.64-0.29,0.99-0.06
	c0,0,6.32,3.7,7,4.04c0.51,0.21,0.69,0.61,0.63,1.14c0,0.36,0,0.73,0,1.09c-0.22,0.14-4.25,2.5-6.04,3.54
	c-0.2,0.11-0.51,0.17-0.39,0.53c-0.01,0.38-0.02,0.76-0.04,1.14c-0.01,0.25,0.06,0.35,0.31,0.2c0.75-0.45,4.69-2.7,5.72-3.32
	c0.36-0.22,0.43-0.12,0.42,0.26c-0.01,0.51-0.03,3.88,0,4.6c0.02,0.42-0.11,0.68-0.5,0.84c-0.21,0.09-7.06,4.07-7.31,4.21
	c-0.15,0.08-0.28,0.15-0.46,0.05C9.03,18.53,2.04,14.49,1.48,14.2z"/></g></svg>

registerPlugin( 'starterblocks-share', {
  icon: starterblocksIcon,
  render: Sidebar,
} );
