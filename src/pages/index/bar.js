export default function getdata () {
  return {
    legend: {},
    tooltip: {},
    dataset: {
      // provide data.
      source: [
        ['latte', ...randomize()],
        ['tea', ...randomize()],
        ['cocoa', ...randomize()],
        ['brownie', ...randomize()]
      ]
    },
    // declare x axis, which is a category axis, mapping
    // to the first column by default.
    xaxis: { type: 'category' },
    // declare y axis, which is a value axis.
    yaxis: {},
    // declare several series, each of them mapped to a
    // column of the dataset by default.
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
  }
}

function randomize () {
  return [0, 0, 0].map(v => {
    return Math.round(300 + Math.random() * 700) / 10
  })
}