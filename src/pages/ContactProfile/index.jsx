import { useState } from "react";
import { LargeButton, RoundedButton } from "../../components/Button";
import BasicInformation from "./BasicInformation";
import ReviewArea from "./ReviewArea";



const ContactProfile = () => {
  const buttonMenuList = ['Basic Information','Review & Create'];
  const [selectedMenu, setSelectedMenu] = useState(buttonMenuList[0]);

  const onClickRoundedButton = (menu) => {
    setSelectedMenu(menu);
  };


  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-border-dimmed p-6">
        <h2 className="mb-1 text-heading3 font-semibold">Contact Profile</h2>
        <p className="text-body2 font-regular text-text-description">
          Save the contact profile and configure it using the IOPS Ground Station.
        </p>
      </div>
      <div className="flex flex-row items-center gap-2 p-6">
        {buttonMenuList.map((menu) => (
          <RoundedButton
            className="w-[208px]"
            key={menu}
            type={menu === selectedMenu ? 'primary' : 'secondary'}
            text={menu}
            onClick={() => onClickRoundedButton(menu)}
          />
        ))}
      </div>
      <div className="w-[640px] flex-1 px-6">
        {selectedMenu === buttonMenuList[0] && <BasicInformation/>}
        {selectedMenu === buttonMenuList[1] && <ReviewArea/>}
      </div>
      <div className="flex w-[640px] flex-row gap-2 px-6 py-6">
        <LargeButton className="h-10 flex-1" type="secondary" text="Previous" />
        <LargeButton
          className="h-10 flex-1"
          type="primary"
          text={selectedMenu === buttonMenuList[2] ? 'Create' : 'Next'}
        />
      </div>
    </div>
  );
};

export default ContactProfile;
