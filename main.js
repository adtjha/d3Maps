import './style.css'
import { select, json, geoPath, geoNaturalEarth1 } from 'd3';
import { feature } from 'topojson';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>d3 Maps!</h1>
    <svg width="960" height="500"></svg>
  </div>
`

const svg = select('svg');

const projection = geoNaturalEarth1();
const pathGenerator = geoPath().projection(projection);

svg.append('path')
  .attr('class', 'sphere')
  .attr('d', pathGenerator({ type: 'Sphere' }));

json('https://unpkg.com/world-atlas@1.1.4/world/110m.json')
  .then(data => {
    const countries = feature(data, data.objects.countries);
    svg.selectAll('path').data(countries.features)
      .enter().append('path')
      .attr('class', 'country')
      .attr('d', pathGenerator);
  });
