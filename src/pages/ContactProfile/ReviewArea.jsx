import ReviewAreaElement from './ReviewAreaElement';

const ReviewArea = ({ basicInformationData }) => {
  console.log('받은값', basicInformationData);
  const reviewDataArray = [
    { name: 'Ground Station', value: basicInformationData ? basicInformationData.groundStationName : '' },
    { name: 'Location', value: basicInformationData ? basicInformationData.locationName : '' },
    { name: 'Name', value: basicInformationData ? basicInformationData.name : '' },
    {
      name: 'Minimum viable Contact duration',
      value: basicInformationData ? basicInformationData.minContactDuration : ''
    },
    {
      name: 'Minimum elevation in degrees',
      value: basicInformationData ? basicInformationData.minElevationDegrees : ''
    },
    {
      name: 'Auto Tracking Frequency Band',
      value: basicInformationData ? basicInformationData.autoTrackingFrequencyBandName : ''
    }
  ];

  return (
    <section className="grid w-full grid-cols-2 grid-rows-3 gap-2 pt-6">
      {reviewDataArray.map((reviewData) => (
        <ReviewAreaElement key={reviewData.name} {...reviewData} />
      ))}
    </section>
  );
};

export default ReviewArea;
