import React from 'react';
import ReactEcharts from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';

echarts.use([PieChart, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);

const defaultColorList = ['#2099ff', '#0072ff', '#51dda1', '#e7de54', '#f57554', '#069fc5'];

interface Props {
  data: { value: number | string; name: string; percent?: string }[];
  title?: string;
  roseType?: 'radius' | 'area' | false;
  showLegend?: boolean;
  radius?: [string, string];
  confine?: boolean; // 是否限制悬浮窗在图表内
  colorList?: string[];
  height?: number | string;
}

const Pie: React.FC<Props> = ({
  data,
  title = '',
  showLegend,
  radius = ['20%', '60%'],
  roseType = 'radius',
  confine = false,
  colorList = defaultColorList,
  height = '100%',
}) => {
  const getOption = () => {
    const option = {
      color: colorList,
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        confine,
      },
      legend: {
        show: false,
        top: 'center',
        right: 0,
        orient: 'vertical',
        textStyle: { color: '#fff' },
        itemWidth: 5,
        itemHeight: 5,
      },
      title: title
        ? {
            text: title,
            left: 'center',
            top: 'center',
            textStyle: {
              color: '#eee',
              fontSize: 14,
            },
          }
        : null,
      series: [
        {
          name: title,
          type: 'pie',
          radius,
          center: [showLegend ? '50%' : '50%', '50%'],
          roseType,
          label: { show: false },
          data,
        },
      ],
    };
    return option;
  };

  return (
    <>
      <ReactEcharts
        option={getOption()}
        echarts={echarts}
        style={{
          height,
          width: showLegend ? '50%' : '100%',
          display: 'inline-block',
          verticalAlign: 'top',
        }}
      />
      {showLegend && (
        <div
          style={{
            height,
            width: '50%',
            padding: '10px',
            overflowY: 'auto',
            display: 'inline-flex',
            alignContent: 'center',
            flexWrap: 'wrap',
            fontSize: '12px',
            lineHeight: '16px',
          }}
        >
          {data.map((item, index) => {
            const color = colorList[index] ? colorList[index] : colorList[index % colorList.length];
            return (
              <div key={item.name} style={{ width: '100%', opacity: 0.7, position: 'relative', overflow: 'hidden' }}>
                <div
                  style={{
                    float: 'left',
                    width: '8px',
                    height: '8px',
                    margin: '6px',
                    background: color,
                  }}
                />
                <div style={{ float: 'right' }}>{item?.percent ?? item.value}</div>
                <div style={{ overflow: 'hidden' }}>{item.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Pie;
