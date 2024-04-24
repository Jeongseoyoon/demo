import { useEffect, useState } from 'react';
import axios from 'axios';
import { LargeButton } from '../../components/Button';
import BasicInformation from './BasicInformation';
import ReviewArea from './ReviewArea';
import { DescriptionBar, InfoMessage, MenuTab } from '../../components';
import { InformationCircleOutlineIcon } from '../../assets/svgs';

const MENU_INDEX = {
  BASIC_INFO: 0,
  REVIEW: 1
};

const ContactProfile = () => {
  const buttonMenuList = ['Basic Information', 'Review & Create'];
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(MENU_INDEX.BASIC_INFO);
  const [messageArray, setMessageArray] = useState([]);
  const [basicInformationData, setBasicInformationData] = useState(null);
  const [messageArrayCount, setMessageArrayCount] = useState(0);

  function onClickTab(index) {
    setSelectedMenuIndex(index);
  }
  function onClickDeleteButton(index) {
    setMessageArray((prev) => prev.filter((message) => message.index !== index));
  }
  // 이전 버튼
  const onClickPreviousButton = () => {
    if (selectedMenuIndex > MENU_INDEX.BASIC_INFO) {
      setSelectedMenuIndex((prev) => prev - 1);
    }
  };
  // 다음, 생성 버튼
  const onClickNextButton = async () => {
    if (selectedMenuIndex !== MENU_INDEX.REVIEW) {
      setSelectedMenuIndex((prev) => prev + 1);
      return;
    }
    setMessageArray((prev) => [
      ...prev,
      {
        index: messageArrayCount,
        icon: <InformationCircleOutlineIcon />,
        text: `Registration has been completed ${messageArrayCount}`
      }
    ]);
    setTimeout(() => onClickDeleteButton(messageArrayCount), 2000);
    setMessageArrayCount((prev) => prev + 1);

    if (selectedMenuIndex === MENU_INDEX.REVIEW) {
      // 교신정보저장
      console.log('basicInformationData : ', basicInformationData);
      const groundStationId = basicInformationData.groundStationId;
      const contactprofileRes = await axios.post(
        `/api/contactprofile/register/${groundStationId}`,
        basicInformationData
      );
      console.log('contactprofileRes', contactprofileRes);
    }
  };

  // BasicInformation 컴포넌트 값
  const handleBasicInformationChange = (data) => {
    setBasicInformationData(data);
    console.log('dddd', data);
  };

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <DescriptionBar
          title="Register a Spacecraft"
          description="  Once the satellite is on-boarded, you can use the IOPS Ground Station to identify which satellite you need to
        communicate and schedule connections to the satellite."
        />
        <MenuTab menuList={buttonMenuList} selectedMenuIndex={selectedMenuIndex} onClickTab={onClickTab} />
        <div className="w-full max-w-[640px] flex-1 px-6 py-6">
          {selectedMenuIndex === MENU_INDEX.BASIC_INFO && (
            <BasicInformation onBasicInformationChange={handleBasicInformationChange} />
          )}
          {selectedMenuIndex === MENU_INDEX.REVIEW && <ReviewArea basicInformationData={basicInformationData} />}
        </div>
        <div className="flex w-full max-w-[640px] flex-row gap-2 px-6 py-6">
          <LargeButton className="h-10 flex-1" type="secondary" text="Previous" onClick={onClickPreviousButton} />
          <LargeButton
            className="h-10 flex-1"
            type="primary"
            text={selectedMenuIndex === MENU_INDEX.REVIEW ? 'Create' : 'Next'}
            onClick={onClickNextButton}
          />
        </div>
      </div>
      <InfoMessage messageArray={messageArray} onClickDelete={onClickDeleteButton} />
    </>
  );
};

export default ContactProfile;
