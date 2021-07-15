import './App.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/modules/offline-exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/annotations')(Highcharts);

var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/" 
              + currentdate.getFullYear() + " @ "  
              + currentdate.getHours() + ":"  
              + currentdate.getMinutes();

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
  credits: {
    text: `Generated by GetFeedback at ${datetime}`,
    href: "https://www.getfeedback.com/",
    position: {
      align: 'left',
      x: 20
    },
    style: {
      fontSize: '12px',
    }
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

function App() {
  return (
    <div className="App">
      <div id="container">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}

export default App;
