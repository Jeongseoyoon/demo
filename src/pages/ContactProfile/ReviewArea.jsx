import ReviewAreaElement from './ReviewAreaElement';

const ReviewArea = ({ basicInformationData }) => {
  const reviewDataArray = [
    { name: 'Ground Station', value: basicInformationData?.groundStationName },
    { name: 'Location', value: basicInformationData?.locationName },
    { name: 'Name', value: basicInformationData?.name },
    {
      name: 'Minimum viable Contact duration',
      value: basicInformationData?.minContactDuration
    },
    {
      name: 'Minimum elevation in degrees',
      value: basicInformationData?.minElevationDegrees
    },
    {
      name: 'Auto Tracking Frequency Band',
      value: basicInformationData?.autoTrackingFrequencyBandName
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
