import ReviewAreaElement from './ReviewAreaElement';

const ReviewArea = ({ basicInformationData, linkData}) => {
    // null 체크 후 변수 초기화
    const name = basicInformationData ? basicInformationData.name : '';
    const noradId = basicInformationData ? basicInformationData.noradId : '';
    const tleTitle = basicInformationData ? basicInformationData.tleTitle : '';
    const tleFirst = basicInformationData ? basicInformationData.tleFirst : '';
    const tleSecond = basicInformationData ? basicInformationData.tleSecond : '';
    const linkName = linkData ? linkData.name : '';
    const directionValue = linkData ? linkData.directionValue : '';
    const centerFrequency = linkData ? linkData.centerFrequency : '';
    const bandwidth = linkData ? linkData.bandwidth : '';
    const polarization = linkData ? linkData.polarizeValue : '';
  
  const reviewDataArray = [
    { name: 'Name', value: basicInformationData.name },
    { name: 'NORAD ID', value:basicInformationData.noradId},
    { name: 'TLE - Title', value:basicInformationData.tleTitle},
    { name: 'TLE - Line 1' , value: basicInformationData.tleFirst},
    { name: 'TLE - Line 2', value: basicInformationData.tleSecond},
    { name: 'Name - link', value:linkData.name},
    { name: 'Direction', value:linkData.directionValue},
    { name: 'Center frequency (MHz)', value:linkData.centerFrequency},
    { name: 'Bandwidth (MHz)', value:linkData.bandwidth},
    { name: 'Polarization', value:linkData.polarizeValue},
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
