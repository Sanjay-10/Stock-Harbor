import Navbar from "../navbar";

function TraderDashboard() {
  return (
    <div className="trader-dashboard">
      <Navbar />
      <h2>Trader Dashboard</h2>
      <div className="widgets">
        <div className="widget">Open Interest (OI) Data</div>
        <div className="widget">VWAP Chart</div>
        <div className="widget">Order Book Analysis</div>
        <div className="widget">Tick-by-Tick Data</div>
        <div className="widget">Options Chain with Greeks</div>
        <div className="widget">Technical Indicator Library</div>
        <div className="widget">Price Action Alerts</div>
        <div className="widget">Heatmaps</div>
        <div className="widget">Multi-Timeframe Analysis</div>
        <div className="widget">Sentiment Analysis</div>
      </div>
    </div>
  );
}

export default TraderDashboard;
