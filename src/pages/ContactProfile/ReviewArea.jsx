import ReviewAreaElement from './ReviewAreaElement';

const DUMMY_REVIEW_DATA = [
  { name: 'Spacecraft', value: 'AQUA' },
  { name: 'Ground Station', value:'Daejeon'},
  { name: 'Location', value: '36.36157, 127.3449' },
  { name: 'Name' , value: 'AQUA_GroundStaion1'},
  { name: 'Minimum viable Contact duration', value: '600 sec'},
  { name: 'Minimum elevation in degrees', value:'60º'},
];

const ReviewArea = () => {
  return (
    <section className="grid w-full grid-cols-2 grid-rows-3 gap-2 pt-6">
      {DUMMY_REVIEW_DATA.map((reviewData) => (
        <ReviewAreaElement key={reviewData.name} {...reviewData} />
      ))}
    </section>
  );
};

export default ReviewArea;
