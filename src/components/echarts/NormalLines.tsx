import React, { CSSProperties } from 'react';
import ReactEcharts from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  MarkLineComponent,
} from 'echarts/components';

echarts.use([
  LineChart,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  MarkLineComponent,
]);

const defaultColorList = ['#16c7ff', '#ffe97e', '#4da3ff', '#81f4ff', '#81f4ff'];

interface Props {
  xData?: (number | string)[];
  yData: (number | string | null)[][];
  legend: string[];
  showLegend?: boolean;
  legendPosition?: string;
  xName?: string;
  xType?: string;
  xNameLeftPadding?: number;
  yName?: string;
  colorList?: string[];
  fontColor?: string;
  style?: CSSProperties;
  grid?: any;
  markLine?: any;
  showArea?: boolean | number;
}

const NormalLines: React.FC<Props> = ({
  xData,
  yData,
  legend,
  xName,
  xType = 'category',
  yName,
  showLegend = true,
  legendPosition = 'right',
  colorList = defaultColorList,
  style,
  grid,
  markLine,
  showArea = true,
  xNameLeftPadding = -16,
  fontColor = '#eee',
}) => {
  const getOption = () => {
    const series: any[] = [];

    // 当前数据
    legend.forEach((item, index) => {
      series.push({
        name: item,
        symbol: 'none',
        showAllSymbol: true,
        type: 'line',
        smooth: 1,
        data: yData[index] || [],
        connectNulls: true,
        areaStyle: {
          opacity: showArea ? 0.7 : 0,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: colorList[index] ? colorList[index] : colorList[index % colorList.length], // 线条处的颜色
              },
              {
                offset: 1,
                color: 'transparent', // 轴线处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        markLine: index === 0 ? markLine : undefined,
      });
    });

    const option = {
      color: colorList,
      legend: {
        show: showLegend,
        data: legend,
        top: 10,
        right: legendPosition === 'right' ? 5 : null,
        left: legendPosition === 'left' ? 5 : null,
        width: '70%',
        // height 和 backgroundColor 不能省略, 否则会出现文字显示不全的 bug
        textStyle: { color: fontColor, height: 14, backgroundColor: 'transparent' },
        pageIconColor: '#47e2f4',
        pageIconSize: 12,
        pageIconInactiveColor: '#1e737c',
        pageTextStyle: { color: fontColor },
        type: 'scroll',
        // icon: 'rect',
        // itemHeight: 2,
        // itemWidth: 20,
        selectedMode: false,
        itemHeight: 1,
        itemWidth: 20,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none',
        },
      },
      grid: {
        top: 45,
        left: 5,
        bottom: 5,
        right: 30,
        containLabel: true,
        ...grid,
      },
      xAxis: [
        {
          type: xType,
          name: xName,
          data: xData,
          nameTextStyle: {
            color: '#a5b5bd',
            lineHeight: 28,
            verticalAlign: 'top',
            padding: [0, 0, 0, xNameLeftPadding],
          },
          axisLabel: { color: '#a5b5bd' },
          axisTick: { show: false },
          axisLine: { lineStyle: { color: '#4694ff', opacity: 0.3 } },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: yName,
          nameTextStyle: { color: '#a5b5bd', padding: [0, 0, 0, -16], align: 'left' },
          axisLabel: { color: '#a5b5bd' },
          splitLine: {
            lineStyle: { color: '#4694ff', opacity: 0.1 },
          },
          // 设置坐标起点不从 0 开始
          // scale: true,
        },
      ],
      series,
      dataZoom: [{ type: 'inside', filterMode: 'none' }],
    };
    return option;
  };

  return <ReactEcharts echarts={echarts} option={getOption()} notMerge style={{ height: '100%', ...style }} />;
};

export default NormalLines;
