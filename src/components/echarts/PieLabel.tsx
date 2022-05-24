import React, { useRef } from 'react';
import ReactEcharts from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';

echarts.use([PieChart, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);

const colorList = ['#83bff6', '#7cffb2', '#fddd60', '#ff6e76', '#64a1fc', '#77eafc', '#05c091', '#f78b4c', '#8d48e3'];

interface Props {
  data: { value: number; name: string; percent?: string }[];
  title?: string;
  radius?: [string, string];
  roseType?: 'radius' | 'area' | false;
  alignTo?: 'labelLine' | 'none' | 'edge';
  textColor?: string;
}

const PieLabel: React.FC<Props> = ({
  data,
  title = '',
  roseType = 'radius',
  alignTo = 'labelLine',
  textColor = '#eee',
  radius = ['25%', '60%'],
}) => {
  const echartsRef = useRef<any>(null);

  const getOption = () => {
    const echartsInstance = echartsRef.current?.getEchartsInstance();

    let total = 0;
    data.forEach((i) => {
      total += i.value;
    });

    const option = {
      color: colorList,
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      title: title
        ? {
            text: `${total}次`,
            left: 'center',
            top: '45%',
            textStyle: {
              color: textColor,
              fontSize: 12,
            },
          }
        : undefined,

      legend: {
        show: false,
        top: 'center',
        right: 0,
        orient: 'vertical',
        textStyle: { color: '#fff' },
        itemWidth: 5,
        itemHeight: 5,
      },
      series: [
        {
          name: title,
          type: 'pie',
          radius,
          center: ['50%', '50%'],
          roseType,
          data,
          label: {
            alignTo,
            formatter: '{name|{b}}\n{time|{c}辆 ({d}%)}',
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            shadowColor: 'transparent',
            rich: {
              name: {
                color: textColor,
              },
              time: {
                fontSize: 10,
                color: textColor,
              },
            },
          },
          labelLayout: (params) => {
            const isLeft = params.labelRect.x < echartsInstance?.getWidth() / 2;
            const points = params.labelLinePoints;
            // Update the end point.
            points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width;
            return {
              labelLinePoints: points,
            };
          },
        },
      ],
    };
    return option;
  };

  return (
    <ReactEcharts
      echarts={echarts}
      ref={echartsRef}
      option={getOption()}
      notMerge
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  );
};

export default PieLabel;
