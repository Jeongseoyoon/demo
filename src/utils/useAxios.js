import axios from 'axios';
import { useState } from 'react';

function useAxios() {
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getGridData = async (url) => {
    const response = await axios.get(url);
    setGridData(
      response.data.scheduleList.map((item) => ({
        id: item.id,
        spacecraft: item.spacecraftName,
        groundStation: item.groundStationName,
        availableTime: `${item.availableTime} mins`,
        startTime: item.reservationStartTime,
        endTime: item.reservationStartTime,
        degree: `${item.maxElevationDegree}º`,
        price: Math.round(Math.random() * 100),
        status: item.status,
        cancelStatus: item.cancelStatus,
        isCancelStatusDisabled: item.isCancelStatusDisabled
      }))
    );
    setLoading(true);
  };
  return {
    getGridData: getGridData,
    gridData: gridData,
    loading: loading
  };
}

export default useAxios;
