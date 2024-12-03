import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

// Import pages
import Dashboard from './pages/Dashboard';
import Navbar from './utils/Navbar';
import DataVisualization from './pages/DataVisualization';
import KNNModel from './algorithms/KNNModel';
import TimeSeriesModel from './algorithms/TimeSeriesModel';
import KMeansClustering from './algorithms/Clustering';
import OutlierDetection from './algorithms/OutlierDetection';

import HomePage from "./HomePage"
function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); 

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/data_visualization" element={<DataVisualization />} />
        <Route exact path="/algorithms/knn_classification" element={<KNNModel />} />
        <Route exact path="/algorithms/kmeans_clustering" element={<KMeansClustering />} />
        <Route exact path="/algorithms/time_series_analysis" element={<TimeSeriesModel />} />
        <Route exact path="/algorithms/outlier_detection" element={<OutlierDetection />} />

      </Routes>
    </>
  );
}

export default App;
