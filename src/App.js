import './App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Button from '@material-ui/core/Button/Button';
import $ from 'jquery'; 

require('highcharts/modules/offline-exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/annotations')(Highcharts);

const options = {
  exporting: {
    chartOptions: {
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true
                }
            }
        }
    },
    fallbackToExportServer: false
  },
  title: {
    text: "Profit & Loss"
  },
  series: [
    {
    name: 'Profit',
    data: [100, 200, 300, 50, 250, 110, 120, 150]
    },
    {
      name: 'Loss',
      data: [40, 80, 200, 80, 200, 50, 110, 120]
    }
  ]
};

function exportImage() {
  var obj = {};
  obj.options = JSON.stringify(options);
  obj.type = 'image/png';
  obj.title = 'Chart';

  var exportUrl = 'http://export.highcharts.com/';

  let dataString = '';
  dataString = encodeURI('async=true&type=png&width=400&options=' + obj.options);

  if (window.XDomainRequest) {
    var xdr = new XMLHttpRequest();
    xdr.open('POST', exportUrl+ '?' + dataString, true);
    xdr.onload = function () {
        console.log(xdr.responseText);
        $('#container').html('<img src="' + exportUrl + xdr.responseText + '"/>');
    };
    xdr.send();
  } else {
    $.ajax({
        type: 'POST',
        data: dataString,
        url: exportUrl,
        success: function (data) {
            console.log('get the file from relative url: ', data);
            $('#container').html('<img src="' + exportUrl + data + '"/>');
        },
        error: function (err) {
            console.log('error', err.statusText)
        }
    });
  }
}

function App() {
  return (
    <div className="App">
      <Button id="downloadButton" onClick={exportImage}>Download</Button>
      <div id="container">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}

export default App;
