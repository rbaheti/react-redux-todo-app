var data            =   [7, 65, 23, 64, 98, 2, 72, 46, 8, 33, 37];


d3.select("#chart")
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .style( 'height', function( d ) {
        var height = d * 3;
        return height + 'px';
    });