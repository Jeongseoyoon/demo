import { useEffect, useState } from 'react';
import axios from 'axios';
import { LargeButton } from '../../components/Button';
import BasicInformation from './BasicInformation';
import ReviewArea from './ReviewArea';
import { DescriptionBar, InfoMessage, MenuTab } from '../../components';
import { InformationCircleOutlineIcon } from '../../assets/svgs';
import Alert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';

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
  const [isOpened, setIsOpened] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();

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
      if (selectedMenuIndex === MENU_INDEX.BASIC_INFO) {
        // 교신 프로필 정보 유효성검사
        let validFlag = true;
        if (basicInformationData) {
          console.log(basicInformationData);
          const keyNameObj = {
            groundStationName: 'Ground Station',
            noradId: 'Location',
            name: 'Name',
            minContactDuration: 'Minimum viable Contact duration',
            minElevationDegrees: 'Minimum elevation in degrees',
            autoTrackingFrequencyBand: 'Auto Tracking Frequency Band'
          };
          let keyName = '';
          for (const key in basicInformationData) {
            if (!basicInformationData[key]) {
              if (keyNameObj[key]) {
                keyName += `${keyNameObj[key]},`;
                validFlag = false;
              }
            }
          }
          if (!validFlag) {
            const lastChar = keyName.charAt(keyName.length - 1);
            if (lastChar === ',') {
              keyName = keyName.substring(0, keyName.length - 1);
            }
            const message = `Please enter [ ${keyName} ]`;
            setAlertMessage(message);
            setIsOpened(true);
            return;
          }
        }
      }
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
    navigate('/registered-contact-profile');
  };

  const onClickClose = () => {
    setIsOpened(false);
  };

  // BasicInformation 컴포넌트 값
  const handleBasicInformationChange = (data) => {
    setBasicInformationData(data);
  };

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <DescriptionBar
          title="Contact Profile"
          description="Save the contact profile and configure it using the IOPS Ground Station."
        />
        <MenuTab menuList={buttonMenuList} selectedMenuIndex={selectedMenuIndex} onClickTab={onClickTab} />
        <div className="w-full max-w-[660px] flex-1 px-6 py-6">
          {selectedMenuIndex === MENU_INDEX.BASIC_INFO && (
            <BasicInformation onBasicInformationChange={handleBasicInformationChange} />
          )}
          {selectedMenuIndex === MENU_INDEX.REVIEW && <ReviewArea basicInformationData={basicInformationData} />}
        </div>
        <div className="flex w-full max-w-[660px] flex-row gap-2 px-6 py-6">
          <LargeButton className="h-10 flex-1" type="secondary" text="Previous" onClick={onClickPreviousButton} />
          <LargeButton
            className="h-10 flex-1"
            type="primary"
            text={selectedMenuIndex === MENU_INDEX.REVIEW ? 'Create' : 'Next'}
            onClick={onClickNextButton}
          />
        </div>
      </div>
      {/* alert */}
      <Alert isOpened={isOpened} onClickClose={onClickClose} message={alertMessage} />
      <InfoMessage messageArray={messageArray} onClickDelete={onClickDeleteButton} />
    </>
  );
};

export default ContactProfile;
