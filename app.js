const width = 1000;
const height = 800;
const margin = 10;

const svg = d3
  .select('#map')
  .append('svg')
  .attr('width', width + margin)
  .attr('height', height + margin);

d3.json(
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
)
  .then(movies => {
    const numCategories = movies.length;
    const categoryColors = d3.schemePastel2;

    const root = d3.hierarchy(movies).sum(function(d) {
      return parseInt(d.value) || 0;
    });

    // prepare color scale
    const colorScale = d3.scaleOrdinal(categoryColors);

    // prepare data for treemap
    d3
      .treemap()
      .size([width, height])
      .paddingInner(1)(root);

    // draw tree map
    svg
      .selectAll('rect')
      .data(root.leaves())
      .enter()
      .append('rect')
      .attr('class', 'tile')
      .attr('x', function(d) {
        return d.x0;
      })
      .attr('y', function(d) {
        return d.y0;
      })
      .attr('width', function(d) {
        return d.x1 - d.x0;
      })
      .attr('height', function(d) {
        return d.y1 - d.y0;
      })
      .attr('fill', d => colorScale(d.data.category))
      .attr('data-name', d => d.data.name)
      .attr('data-category', d => d.data.category)
      .attr('data-value', d => d.data.value);
  })
  .catch(() => alert('An error occurred!'));
