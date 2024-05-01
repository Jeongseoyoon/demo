import ReviewAreaElement from './ReviewAreaElement';

const ReviewArea = ({ basicInformationData, linkData }) => {
  const reviewDataArray = [
    { name: 'Name', value: basicInformationData?.name },
    { name: 'NORAD ID', value: basicInformationData?.noradId },
    { name: 'TLE - Title', value: basicInformationData?.tleTitle },
    { name: 'TLE - Line 1', value: basicInformationData?.tleFirst },
    { name: 'TLE - Line 2', value: basicInformationData?.tleSecond },
    { name: 'Name - link', value: linkData?.name },
    { name: 'Direction', value: linkData?.directionValue },
    { name: 'Center frequency (MHz)', value: linkData?.centerFrequency },
    { name: 'Bandwidth (MHz)', value: linkData?.bandwidth },
    { name: 'Polarization', value: linkData?.polarizeValue }
  ];

  return (
    <section className="grid w-full grid-cols-2 grid-rows-3 gap-2">
      {reviewDataArray.map((reviewData) => (
        <ReviewAreaElement key={reviewData.name} {...reviewData} />
      ))}
    </section>
  );
};

export default ReviewArea;
