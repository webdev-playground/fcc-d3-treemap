const width = 800;
const height = 800;
const margin = 200;

const svg = d3
  .select('#map')
  .append('svg')
  .attr('width', width + margin)
  .attr('height', height + margin);

d3.json(
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'
)
  .then(movies => {
    const root = d3.hierarchy(movies).sum(function(d) {
      return parseInt(d.value) || 0;
    });

    // prepare data for treemap
    d3
      .treemap()
      .size([width, height])
      .paddingTop(25)
      .paddingRight(10)
      .paddingInner(3)(root);

    // draw tree map
    svg
      .selectAll('rect')
      .data(root.leaves())
      .enter()
      .append('rect')
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
      });
  })
  .catch(() => alert('An error occurred!'));
