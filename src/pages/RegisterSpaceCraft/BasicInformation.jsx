import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../../components';

const BasicInformation = ({ onBasicInformationChange }) => {
  const [nameValue, setNameValue] = useState('');
  const [noradValue, setNoradValue] = useState('');
  const [tleTitleValue, setTleTitleValue] = useState('');
  const [tleLine1Value, setTleLine1Value] = useState('');
  const [tleLine2Value, setTleLine2Value] = useState('');

  useEffect(() => {
    // 변경된 정보를 부모 컴포넌트로 전달
    onBasicInformationChange({
      name: nameValue,
      noradId: noradValue,
      tleTitle: tleTitleValue,
      tleFirst: tleLine1Value,
      tleSecond: tleLine2Value
    });
  }, [nameValue, noradValue, tleTitleValue, tleLine1Value, tleLine2Value]);

  const handleKeyDown = useCallback(
    async (e) => {
      if (e.key === 'Enter') {
        try {
          console.log(noradValue);
          const res = await axios.get(`/api/spacecraft/tle/${noradValue}`);
          const data = res.data;
          setTleTitleValue(data.tleTitle);
          setTleLine1Value(data.tleFirst);
          setTleLine2Value(data.tleSecond);
        } catch (error) {
          console.log('Error', error);
          // 에러 처리
        }
      }
    },
    [noradValue, setTleTitleValue, setTleLine1Value, setTleLine2Value]
  );

  return (
    <form className="flex w-full flex-col gap-6">
      <Input label="Name" value={nameValue} setValue={setNameValue} />
      <Input label="NORAD ID" value={noradValue} setValue={setNoradValue} onKeyDown={handleKeyDown} />
      <Input label="TLE - Title" value={tleTitleValue} setValue={setTleTitleValue} />
      <Input label="TLE - Line 1" value={tleLine1Value} setValue={setTleLine1Value} />
      <Input label="TLE - Line 2" value={tleLine2Value} setValue={setTleLine2Value} />
    </form>
  );
};

export default BasicInformation;
