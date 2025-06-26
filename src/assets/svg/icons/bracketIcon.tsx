import React from 'react';
import Svg, { Path } from 'react-native-svg';

type IconProps = {
  color: string;
};
const FlowchartIcon = ({ color }: IconProps) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 20V18H11V13H9V15H2V9H9V11H11V6H15V4H22V10H15V8H13V16H15V14H22V20H15ZM17 18H20V16H17V18ZM4 13H7V11H4V13ZM17 8H20V6H17V8Z"
      fill={color}
    />
  </Svg>
);

export default FlowchartIcon;
