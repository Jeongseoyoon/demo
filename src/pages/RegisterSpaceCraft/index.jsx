import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BasicInformation from './BasicInformation';
import LinkForm from './LinkForm';
import ReviewArea from './ReviewArea';
import { LargeButton, InfoMessage, DescriptionBar, MenuTab, Modal } from '../../components';
import { InformationCircleOutlineIcon } from '../../assets/svgs';
import Alert from '../../components/Alert';

const MENU_INDEX = {
  BASIC_INFO: 0,
  LINK: 1,
  REVIEW: 2
};

const RegisterSpaceCraft = () => {
  const buttonMenuList = ['Basic Information', 'Link', 'Review & Create'];
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(MENU_INDEX.BASIC_INFO);
  const [messageArray, setMessageArray] = useState([]);
  const [messageArrayCount, setMessageArrayCount] = useState(0);
  const [basicInformationData, setBasicInformationData] = useState(null);
  const [linkData, setLinkData] = useState(null);
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
        // 위성정보 유효성검사
        let validFlag = true;
        if (basicInformationData) {
          const keyNameObj = {
            name: 'Name',
            noradId: 'NORAD ID',
            tleTitle: 'TLE - Title',
            tleFirst: 'TLE - Line 1',
            tleSecond: 'TLE - Line 2'
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
      } else if (selectedMenuIndex === MENU_INDEX.LINK) {
        // 링크정보 유효성검사
        console.log('링크정보');
        console.log(linkData);
        if (linkData) {
          let validFlag = true;
          const keyNameObj = {
            name: 'Link Name',
            linkDirection: 'Direction',
            centerFrequency: 'Center Frequency (MHz)',
            bandwidth: 'Bandwidth (MHz)',
            polarization: 'Polarization'
          };

          let keyName = '';
          for (const key in linkData) {
            if (!linkData[key]) {
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
      // 위성정보저장
      console.log('basicInformationData : ', basicInformationData);
      const spacecraftRes = await axios.post('/api/spacecraft/register', basicInformationData);
      console.log('spacecraftRes', spacecraftRes);
      // 링크정보저장
      console.log('linkData : ', linkData);
      const spaceId = spacecraftRes.data.id;
      const linkRes = await axios.post(`/api/link/register/${spaceId}`, linkData);
      console.log('Link 정보 저장 성공:', linkRes.data);
      navigate('/registered-spacecraft');
    }
  };

  const onClickClose = () => {
    setIsOpened(false);
  };

  // BasicInformation 컴포넌트 값
  const handleBasicInformationChange = (data) => {
    setBasicInformationData(data);
  };

  // LinkForm 컴포넌트 값
  const handleSaveLinkInfoChange = (data) => {
    setLinkData(data);
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
        <div className="w-full max-w-[660px] flex-1 px-6 py-6">
          {selectedMenuIndex === MENU_INDEX.BASIC_INFO && (
            <BasicInformation onBasicInformationChange={handleBasicInformationChange} />
          )}
          {selectedMenuIndex === MENU_INDEX.LINK && <LinkForm onSaveLinkInfo={handleSaveLinkInfoChange} />}
          {selectedMenuIndex === MENU_INDEX.REVIEW && (
            <ReviewArea basicInformationData={basicInformationData} linkData={linkData} />
          )}
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
      <InfoMessage messageArray={messageArray} onClickDelete={onClickDeleteButton} />
      {/* alert */}
      <Alert isOpened={isOpened} onClickClose={onClickClose} message={alertMessage} />
    </>
  );
};

export default RegisterSpaceCraft;
