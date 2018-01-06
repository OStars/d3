import * as React from 'react';
import * as d3 from 'd3';

class BasicArea extends React.Component {
  componentDidMount() {
    const width = 960;
    const height = 500;
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const data = [];

    const t = Date.parse(new Date('2000-1-1'));
    for (let i = 0; i < 100; i++) {
      data.push({
        date: new Date(t + i * 1000 * 3600 * 24),
        price: Math.floor(Math.random() * 1000),
      })
    }

    const svg = d3.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price)])
      .range([height, 0]);
    const area = d3.area()
      .x(d => x(d.date))
      .y1(d => y(d.price))
      .y0(y(0));

    g.append('path')
      .datum(data)
      .attr('fill', 'steelblue')
      .attr('d', area);
    
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));
    
    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .attr('text-anchor', 'end')
      .text('Price ($)');
  }
  render() {
    return (
      <svg></svg>
    )
  }
}

export default BasicArea;
